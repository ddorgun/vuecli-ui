/* eslint-disable no-console */
import commonApi from './http';

export function authentication(lgoinUser) {
  // return commonApi.post('/login', { userId: 'test', password: '1234' });
  return commonApi.post('/login', lgoinUser);
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
