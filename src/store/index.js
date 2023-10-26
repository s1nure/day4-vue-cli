import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins:[
    createPersistedState()
  ],
  state: {
    count: 0
  },
  getters: {
    getCount: (state) => {
      return state.count
    }
  },
  mutations: {
    setCount: (state, count) => {
      state.count = count || 0
    }
  },
  actions: {
  },
  modules: {
  }
})
