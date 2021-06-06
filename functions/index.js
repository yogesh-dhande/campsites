const functions = require('firebase-functions')
const axios = require('axios')
const cors = require('cors')({ origin: 'http://localhost:3000' })

async function getFacilititesFromQuery(query) {
  try {
    const response = await axios.get(
      'https://ridb.recreation.gov/api/v1/facilities',
      {
        params: {
          offset: 0,
          full: false,
          query: query,
          activity: 'camping',
        },
        headers: {
          apikey: functions.config().ridb.api.key,
          accept: 'application/json',
        },
      }
    )
    const facilities = response.data.RECDATA
    console.log(facilities.length)
    return facilities
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getSiteAvailabilityAtFacility(facility, months) {
  let sites = {}
  try {
    for (const month of months) {
      const response = await axios.get(
        `https://www.recreation.gov/api/camps/availability/campground/${facility.FacilityID}/month?start_date=${month}T00%3A00%3A00.000Z`
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
    return Object.values(sites)
  } catch (error) {
    console.log(error)
  }
}

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
  } finally {
    return null
  }
}

exports.findCampsites = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const facilities = await getFacilititesFromQuery(req.query.query)

      let arrayOfSites = await Promise.all(
        facilities.map(
          async (facility) =>
            await getSiteAvailabilityAtFacility(facility, req.query.months)
        )
      )
      const sites = arrayOfSites.flat()

      console.log(sites.length)

      //   await Promise.all(sites.map((site) => addCampsiteDetails(site)))

      res.send({
        campgrounds: facilities,
        campsites: sites,
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).end('error')
    }
  })
})
