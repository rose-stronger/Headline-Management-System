import request from '@/utils/request'
export const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    // 传递query查询参数！！！！！
    params
  })
}
// 增加文章评论
export const addArticleComment = ({ target, content, artId }) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',

    data: {
      target,
      content,
      art_id: artId
    }
  })
}
