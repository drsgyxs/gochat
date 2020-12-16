import request from '../utils/request'

export function getRoomList(params) {
  return request.get('/rooms', {
    params,
  })
}

export function getRoomInfo(roomId, params) {
  return request.get(`/rooms/${roomId}`, {
    params,
  })
}

export function getMyRoom(userId) {
  return request.get(`/rooms/user/${userId}`)
}

export function createRoom(data) {
  return request.post('/rooms', data)
}
