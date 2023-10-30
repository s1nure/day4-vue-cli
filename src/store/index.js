import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    theme: null,
    user: null,
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getTheme: (state) => {
      return state.theme;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    setCount: (state, count) => {
      state.count = count || 0;
    },
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    setUser: (state, user) => (state.user = user),
  },
  actions: {
    toggleTheme({ commit }) {
      commit("toggleTheme");
    },
  },
  modules: {},
});
