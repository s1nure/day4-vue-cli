import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins:[
    createPersistedState()
  ],
  state: {
    count: 0,
    theme: localStorage.getItem('theme') === 'true' ? true : false,
  },
  getters: {
    getCount: (state) => {
      return state.count
    },
    getTheme: (state) => {
      return state.theme
    }
  },
  mutations: {
    setCount: (state, count) => {
      state.count = count || 0
    },
    toggleTheme: (state) => {
      state.theme = !state.theme
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('toggleTheme');
    },
  },
  modules: {
  }
})
