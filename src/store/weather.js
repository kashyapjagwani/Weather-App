const state = {
  weatherData: []
}

const mutations = {
  loadWeather(state, payload) {
    Object.assign(state.weatherData, payload)
  }
}

const actions = {
  loadWeather({commit}, payload) {
    commit('loadWeather', payload)
  }
}

const getters = {
  getWeather: (state) => {
    return state.weatherData
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}