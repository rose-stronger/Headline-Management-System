import request from '@/utils/request'
export const getArticleDetail = (article_id) => {
  return request({

    url: `/v1_0/articles/${article_id}`
    // 传递query查询参数！！！！！
    // params: {
    //   article_id
    // }
  })
}
