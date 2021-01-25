import { request } from '@/plugins/request'

/**
 * 获取文章列表
 * @param {object} params
 */
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles',
    params
  })
}

/**
 * 获取关注的用户文章列表
 * @param {object} params
 */
export const getFeedArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles/feed',
    params
  })
}

/**
 * 添加点赞
 * @param {string} slug 
 */
export const addFavorite = slug => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * 取消点赞
 * @param {string} slug 
 */
export const delFavorite = slug => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * 获取单个文章详情
 * @param {string} slug 违章标识
 */
export const getArticle = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}`
  })
}

/**
 * 获取文章的评论
 * @param {string} slug 文章标识
 */
export const getArticleComments = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`
  })
}

/**
 * 创建文章
 * @param {object} data 文章数据
 */
export const createArticle = data => {
  return request({
    method: 'post',
    url: '/api/articles',
    data
  })
}

/**
 * 更新文章
 * @param {string} slug 文章标识
 * @param {object} data 文章数据
 */
export const updateArticle = (slug, data)=> {
  return request({
    method: 'put',
    url: `/api/articles/${slug}`,
    data
  })
}
