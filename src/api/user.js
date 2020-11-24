import request from '@/utils/request'

export function login(data) {
  return request.post('/v1/users/login', data)
}

export function getUserInfo() {
  return request.get('/v1/users/me')
}

export function register(data) {
  return request.post('/v1/users/register', data)
}
