import axios from 'axios'
import { Message } from 'element-ui'
import { removeLoginStatus, getTokenKey } from '@/utils/auth'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10 * 1000
})

api.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    const token = getTokenKey()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('rest req err: ', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log('response from remote: ', res)
    if (res.code === 0) {
      return Promise.resolve(res.data)
    } else {
      Message({
        message: 'Error message from server:<br><strong>' + res.message + '</strong>',
        type: 'error',
        showClose: true,
        dangerouslyUseHTMLString: true,
        center: true,
        duration: 30 * 1000
      })
      return Promise.reject(res)
    }
  },
  (error) => {
    removeLoginStatus()
    window.location.href = '/'
    return Promise.reject(error)
  }
)

export default api
