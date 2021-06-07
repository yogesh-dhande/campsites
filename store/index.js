import * as axios from 'axios'

function getDatesFromRange(start, end) {
  console.log(start, end)
  end = new Date(end)
  const dates = []
  const current = new Date(start)
  // eslint-disable-next-line no-unmodified-loop-condition
  while (current <= end) {
    dates.push(current)
    current.setDate(current.getDate() + 1)
  }
  return dates
}

function getMonthsFromDates(dates) {
  const months = [
    ...new Set(dates.map((date) => date.toISOString().slice(0, 7))),
  ].map((month) => getKeyFromDate(month))
  return months
}

function getKeyFromDate(date) {
  return new Date(date).toISOString().split('T')[0]
}

// eslint-disable-next-line no-unused-vars
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}

function isSiteAvailableOnDates(site, dates) {
  const available = dates
    .map((date) => site.availabilities[getKeyFromDate(date)] === 'Available')
    .every(Boolean)

  console.log(available)
  return available
}

export const state = () => ({
  queryParams: {},
  dates: [],
  campsites: [],
  campgrounds: [],
})

export const getters = {
  availableSites(state) {
    return state.campsites.filter((site) =>
      isSiteAvailableOnDates(site, state.dates)
    )
  },
  availableCampgrounds(state, getters) {
    const availableFacilityIDs = getters.availableSites.map(
      (site) => site.FacilityID
    )
    return state.campgrounds.filter((campground) =>
      availableFacilityIDs.includes(campground.FacilityID)
    )
  },
}

export const actions = {
  async findCampsites({ commit }, payload) {
    const dates = getDatesFromRange(
      payload.dateRange.startDate,
      payload.dateRange.endDate
    )
    commit('SET_DATES', dates)

    const queryParams = {
      query: payload.query,
      months: getMonthsFromDates(dates),
    }

    const res = await axios.get(
      'http://localhost:9001/campsites-c0b4b/us-central1/findCampsites',
      {
        params: queryParams,
      }
    )
    console.log(res.data)

    commit('SET_QUERY_PARAMS', queryParams)

    Object.values(res.data.campsites).forEach((site) => {
      const availabilities = {}
      Object.keys(site.availabilities).forEach((date) => {
        availabilities[getKeyFromDate(date)] = site.availabilities[date]
      })
      site.availabilities = availabilities
    })

    commit('SET_CAMPSITES', res.data.campsites)
    commit('SET_CAMPGROUNDS', res.data.campgrounds)
  },
}

export const mutations = {
  SET_QUERY_PARAMS(state, query) {
    state.queryParams = query
  },
  SET_DATES(state, dates) {
    state.dates = dates
  },
  SET_CAMPSITES(state, campsites) {
    state.campsites = campsites
  },
  SET_CAMPGROUNDS(state, campgrounds) {
    state.campgrounds = campgrounds
  },
}
