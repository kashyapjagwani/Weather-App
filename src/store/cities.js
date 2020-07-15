const state = {
  cities: [
    {
      name: 'lol'
    }
  ]
}

const mutations = {
  loadCities(state, payload) {
    payload = Object.values(payload)[0].slice(0,20)
    Object.assign(state.cities, payload)
  }
}

const actions = {
  loadCities({commit}, payload) {
    commit('loadCities', payload)
  }
}

const getters = {
  getCities: (state) => {
    return state.cities
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}