import request from '@/utils/request'
// export const findSearchAdvice = (q) => {
//   return request({
//     url: '/v1_0/suggestion',
//     params: {
//       q
//     }
//   })
// }
export const findSearchAdvice = (params) => {
  return request({
    url: '/v1_0/suggestion',
    params
  })
}
export const findSearchDetail = ({ page, pageSize, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page: pageSize,
      q
    }
  })
}
