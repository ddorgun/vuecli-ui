/* eslint-disable no-console */
import commonApi from './http';

export function getUsers() {
  return commonApi.get('/users');
}

export function getUser(id) {
  return commonApi.get(`/users/${id}`);
}
