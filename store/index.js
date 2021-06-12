import * as axios from 'axios'

function getDatesFromRange(start, end) {
  console.log(start, end)
  end = new Date(end)
  const dates = []
  let current = new Date(start)
  // eslint-disable-next-line no-unmodified-loop-condition
  while (current <= end) {
    dates.push(current)
    current = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1
    )
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
  return dates
    .map((date) => site.availabilities[getKeyFromDate(date)] === 'Available')
    .every(Boolean)
}

export const state = () => ({
  queryParams: {},
  dates: [],
  campsites: {}, // Object because sometimes the API returns duplicate sites and campgrounds
  campgrounds: {},
  error: null,
  isLoading: false,
})

export const getters = {
  availableSites(state) {
    return Object.values(state.campsites).filter(
      (site) =>
        (site.details !== undefined) & isSiteAvailableOnDates(site, state.dates)
    )
  },
  availableCampgrounds(state, getters) {
    const availableFacilityIDs = getters.availableSites.map(
      (site) => site.FacilityID
    )
    return Object.values(state.campgrounds).filter((campground) =>
      availableFacilityIDs.includes(campground.FacilityID)
    )
  },
  campgroundNames(state) {
    return Object.values(state.campgrounds).map((ground) => ground.FacilityName)
  },
}

export const actions = {
  async findCampsites({ state, commit }, payload) {
    const dates = getDatesFromRange(
      payload.dateRange.startDate,
      payload.dateRange.endDate
    )

    const cachedParams = {
      query: payload.query,
      months: getMonthsFromDates(dates),
      state: payload.state,
    }

    if (!shallowEqual(state.queryParams, cachedParams)) {
      commit('SET_CAMPSITES', {})
      commit('SET_ERROR', null)
      commit('SET_CAMPGROUNDS', {})
      let currentCount = 0
      let totalCount = 11
      const limit = 10
      let offset = 0

      try {
        while (offset + limit < totalCount) {
          const queryParams = {
            ...cachedParams,
            limit,
            offset,
          }
          const res = await axios.get(
            `${process.env.NUXT_ENV_FIREBASE_FUNCTION_BASE_URL}/findCampsites`,
            {
              params: queryParams,
            }
          )

          currentCount = res.data.metadata.RESULTS.CURRENT_COUNT
          totalCount = res.data.metadata.RESULTS.TOTAL_COUNT

          offset = offset + currentCount
          commit('SET_QUERY_PARAMS', cachedParams)

          Object.values(res.data.campsites).forEach((site) => {
            const availabilities = {}
            Object.keys(site.availabilities).forEach((date) => {
              availabilities[getKeyFromDate(date)] = site.availabilities[date]
            })
            site.availabilities = availabilities
          })

          // eslint-disable-next-line no-unreachable
          commit('ADD_CAMPGROUNDS', res.data.campgrounds)
          commit('ADD_CAMPSITES', res.data.campsites)
        }
      } catch (error) {
        console.log(error)
        commit('SET_ERROR', error.message)
      }
      commit('SET_DATES', dates)
    }
  },
}

export const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
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
  ADD_CAMPSITES(state, campsites) {
    state.campsites = Object.assign({}, state.campsites, campsites)
  },
  ADD_CAMPGROUNDS(state, campgrounds) {
    state.campgrounds = Object.assign({}, state.campgrounds, campgrounds)
  },
}
