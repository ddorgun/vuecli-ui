/* eslint-disable no-console */
import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? process.env.BASE_URL : '/backend/api',
});

function responseSuccess(response) {
  console.log('interceptors', response);
  return response;
}

instance.interceptors.request.use(
  (c) => {
    console.log('config', c);
    const config = c;
    config['x-access-token'] = store.getters['auth/accessToken'];
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  responseSuccess,
  (error) => {
    if (error.response.satus === 401 && error.response.config) {
      store.dispatch('auth/logout');
    }
    console.log(error.response);
    Promise.reject(error);
  },
);

export default instance;
