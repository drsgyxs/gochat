import request from '@/utils/request'

export function login(data) {
  return request.post('/login', data)
}

export function getUserInfo() {
  return request.get('/users/me')
}

export function register(data) {
  return request.post('/users', data)
}

export function saveUser(data) {
  return request.patch(`/users/${data.userId}`, data)
}

export function uploadAvatar(userId, data) {
  return request.post(`/users/${userId}/avatar`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
