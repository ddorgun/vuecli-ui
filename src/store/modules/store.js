/* eslint-disable no-console */
export default {
  namespaced: true,
  state: {

  },
  mutations: {
    login(store, payload) {
      console.log(store, payload);
    },
    logout(store) {
      const state = store;
      state.accessToken = null;
    },
  },
  actions: {
    login({ commit }) {
      commit('login', { data: 11 });
    },
    logout({ commit }) {
      commit('logout');
    },
  },
};
