const functions = require('firebase-functions')
const axios = require('axios')
const { HttpsError } = require('firebase-functions/lib/providers/https')
const cors = require('cors')({
  origin: [
    'http://192.168.50.117:3000',
    'http://localhost:3000',
    'https://campsites-c0b4b.web.app',
    'https://finderscampers.com',
  ],
})

async function getFacilititesFromQueryParams(queryParams) {
  try {
    const response = await axios.get(
      'https://ridb.recreation.gov/api/v1/facilities',
      {
        params: {
          offset: queryParams.offset,
          limit: queryParams.limit,
          full: false,
          query: queryParams.query,
          state: queryParams.state,
          activity: 'camping',
        },
        headers: {
          apikey: functions.config().ridb.api.key,
          accept: 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getSiteAvailabilityAtFacilityForMonth(facility, month) {
  let status = 429
  let response = {
    data: {
      campsites: {},
    },
  }
  const request = async () => {
    try {
      response = await axios.get(
        `https://www.recreation.gov/api/camps/availability/campground/${facility.FacilityID}/month?start_date=${month}T00%3A00%3A00.000Z`
      )
      status = response.status
    } catch (error) {
      if (error.response) {
        status = error.response.status
        console.log(status)
      }
    }
  }

  await request()
  while (status === 429) {
    setTimeout(request, 1000)
  }

  return response
}

async function getSiteAvailabilityAtFacility(facility, months) {
  let sites = {}

  for (const month of months) {
    const response = await getSiteAvailabilityAtFacilityForMonth(
      facility,
      month
    )

    Object.values(response.data.campsites).forEach((site) => {
      site.FacilityID = facility.FacilityID
      site.FacilityName = facility.FacilityName
    })
    if (!sites.length) {
      sites = response.data.campsites
    } else {
      Object.values(response.data.campsites).forEach((site) => {
        sites[site.campsite_id].availabilities = {
          ...sites[site.campsite_id].availabilities,
          ...site.availabilities,
        }
      })
    }
  }
  return sites
}

// eslint-disable-next-line no-unused-vars
async function addCampsiteDetails(campsite) {
  try {
    const response = await axios.get(
      `https://ridb.recreation.gov/api/v1/campsites/${campsite.campsite_id}`,
      {
        headers: {
          apikey: functions.config().ridb.api.key,
          accept: 'application/json',
        },
      }
    )
    if (response.data.length > 0) {
      campsite.details = response.data[0]
    }
  } catch (error) {
    console.log(error)
  }
}

exports.findCampsites = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const facilities = await getFacilititesFromQueryParams(req.query)

      const arrayOfSites = await Promise.all(
        facilities.RECDATA.map(
          async (facility) =>
            await getSiteAvailabilityAtFacility(facility, req.query.months)
        )
      )
      const sites = arrayOfSites.reduce(function (result, current) {
        return Object.assign(result, current)
      }, {})

      await Promise.all(
        Object.values(sites).map((site) => addCampsiteDetails(site))
      )

      res.send({
        campgrounds: facilities.RECDATA.reduce(function (map, obj) {
          map[obj.FacilityID] = obj
          return map
        }, {}),
        metadata: facilities.METADATA,
        campsites: sites,
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  })
})
