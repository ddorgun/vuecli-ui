/* eslint-disable no-console */

import { getUser } from '@/api/user';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    accessUser(store, payload) {
      const state = store;
      state.user = payload;
    },
  },
  actions: {
    async accessUser({ commit }, userId) {
      const user = await getUser(userId);
      console.log(user);
      commit('accessUser', user);
    },
  },
};
