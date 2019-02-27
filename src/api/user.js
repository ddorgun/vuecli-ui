/* eslint-disable no-console */
import commonApi from './http';

export function user() {
  return commonApi.get('/user');
}

export default {
  user,
};
