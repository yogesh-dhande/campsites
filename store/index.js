import * as axios from 'axios'

export const state = () => ({
  campsites: null,
  campgrounds: null,
  location: {
    zip: null,
    latitude: null,
    longitude: null,
  },
})

export const actions = {
  async findCampsites({ state, commit }, payload) {
    const res = await axios.get(
      'http://localhost:9001/campsites-c0b4b/us-central1/findCampsites',
      {
        params: {
          ...payload,
        },
      }
    )
    console.log(res.data)
    commit('SET_LOCATION', res.data.location)
    commit('SET_CAMPSITES', res.data.campsites)
    commit('SET_CAMPGROUNDS', res.data.campgrounds)
  },
}

export const mutations = {
  SET_LOCATION(state, location) {
    state.location = location
  },
  SET_CAMPSITES(state, campsites) {
    state.campsites = campsites
  },
  SET_CAMPGROUNDS(state, campgrounds) {
    state.campgrounds = campgrounds
  },
}
