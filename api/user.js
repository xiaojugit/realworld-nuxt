import { request } from '@/plugins/request'

/**
 * 登录
 * @param {object} data
 * @param {object} data.user
 * @param {string} data.user.email 邮箱
 * @param {string} data.user.password 密码
 */
export const login = data => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

/**
 * 注册
 * @param {object} data
 * @param {object} data.user
 * @param {string} data.user.username 用户名
 * @param {string} data.user.email 邮箱
 * @param {string} data.user.password 密码
 */
export const register = data => {
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}