/**
 * 请求模块
 */

import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

request.interceptors.request.use(config => {
  config.headers.Authorization = `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM2MTI4LCJ1c2VybmFtZSI6Inp4anVAenhqdS5jb20iLCJleHAiOjE2MTYzOTY4ODJ9.7u8B4OjCdxEnaBqT47RE8FPKUQd5BriVt47xvuCrjyI`
  return config
}, err => {
  return Promise.reject(err)
})

export default request
