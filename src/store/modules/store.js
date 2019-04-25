/* eslint-disable no-console */
export default {
  namespaced: true,
  state: {
    routerLoader: false,
  },
  getters: {
    getRouterLoader: state => state.routerLoader,
  },
  mutations: {
    routerLoader(store, payload) {
      console.log('store routerLoader', payload);
      const state = store;
      state.routerLoader = payload;
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
