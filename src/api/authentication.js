/* eslint-disable no-console */
import commonApi from './http';

export function authentication() {
  return commonApi.get('/login');
}

export function unAuthentication() {
  return commonApi.post('/logout');
}

export function authorizedEndpoint(endpoint) {
  return commonApi.get('authorizedEndpoint', endpoint);
}

export default {
  authentication,
  unAuthentication,
  authorizedEndpoint,
};
