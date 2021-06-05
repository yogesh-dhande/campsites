const functions = require('firebase-functions')
const axios = require('axios')
const cors = require('cors')({ origin: 'http://localhost:3000' })

function getDatesFromRange(start, end) {
  console.log(start, end)
  end = new Date(end)
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt))
  }
  return arr
}

function getKeyFromDate(date) {
  return new Date(date).toISOString().split('T')[0]
}

function getMonthsFromDates(dates) {
  const months = [
    ...new Set(dates.map((date) => date.toISOString().slice(0, 7))),
  ].map((month) => getKeyFromDate(month))
  return months
}

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
        const availabilities = {}
        Object.keys(site.availabilities).forEach((date) => {
          availabilities[getKeyFromDate(date)] = site.availabilities[date]
        })
        site.availabilities = availabilities
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

function isSiteAvailableOnDates(site, dates) {
  const available = dates
    .map((date) => site.availabilities[getKeyFromDate(date)] === 'Available')
    .every(Boolean)

  console.log(available)
  return available
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
      const dateRange = JSON.parse(req.query.dateRange)
      const dates = getDatesFromRange(dateRange.startDate, dateRange.endDate)
      console.log(dates)
      const months = getMonthsFromDates(dates)
      console.log(months)
      const facilities = await getFacilititesFromQuery(req.query.query)

      let arrayOfSites = await Promise.all(
        facilities.map(
          async (facility) =>
            await getSiteAvailabilityAtFacility(facility, months)
        )
      )
      const sites = arrayOfSites.flat()

      console.log(sites.length)

      const availableSites = sites.filter((site) =>
        isSiteAvailableOnDates(site, dates)
      )
      console.log(availableSites.length)
      await Promise.all(availableSites.map((site) => addCampsiteDetails(site)))

      res.send({
        campgrounds: facilities,
        campsites: availableSites,
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).end('error')
    }
  })
})
