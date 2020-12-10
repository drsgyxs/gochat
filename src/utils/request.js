import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
})

service.interceptors.request.use(
  config => {
    NProgress.start()
    // const token = localStorage.getItem('Authorization')
    // if (token) config.headers.common['Authorization'] = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    let message
    if (error.response.data.error) {
      message = error.response.data.error
    } else {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求错误，未找到该资源'
          break
        case 500:
          message = '服务器出错'
          break
        default:
          message = error.response.statusText
      }
    }
    if (error.response.status !== 401) {
      Message({
        message,
        type: 'error',
        duration: 3 * 1000,
      })
    }
    return Promise.reject(error)
  }
)

export default service
