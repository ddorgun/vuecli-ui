/* eslint-disable no-console */
import { authentication, unAuthentication, authorizedEndpoint } from '@/api/authentication';

const ACCESS_TOKEN = 'x-access-token';

export default {
  namespaced: true,
  state: {
    auth: !!(sessionStorage.getItem(ACCESS_TOKEN)),
    accessToken: sessionStorage.getItem(ACCESS_TOKEN) || '',
  },
  getters: {
    isAuthenticated(state) {
      return state.auth;
    },
  },
  mutations: {
    login(store, payload) {
      const state = store;
      state.auth = true;
      // state.accessToken = payload;
      sessionStorage.setItem(ACCESS_TOKEN, payload);
    },
    logout(store) {
      const state = store;
      state.auth = false;
      sessionStorage.removeItem(ACCESS_TOKEN);
    },
  },
  actions: {
    async login({ commit }) {
      // return axios.get(`${BASE_URL}data/auth.json`)
      //   .then(data => commit('login', data));
      try {
        const auth = await authentication();
        // console.log(auth);
        commit('login', auth.data);
        // const user = await authentication();
        // console.log(user);
      } catch (error) {
        console.log('login error', error);
      }
    },
    async logout({ commit }) {
      try {
        commit('logout');
        await unAuthentication();
      } catch (error) {
        console.log('logout error', error);
      }
    },
    async authorizedEndpoint({ commit }, payload) {
      try {
        const endpoint = await authorizedEndpoint(payload);
        commit('', endpoint);
      } catch (error) {
        commit('', false);
      }
    },
  },
};
