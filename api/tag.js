import { request } from '@/plugins/request'

/**
 * 获取标签
 */
export const getTags = () => {
  return request({
    method: 'get',
    url: '/api/tags'
  })
}

