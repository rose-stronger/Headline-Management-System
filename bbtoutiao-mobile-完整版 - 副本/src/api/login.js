/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// restful api：接口需要有语义
// get： 表示获取数据
// post：表示提交数据
// put： 修改数据
// delete：删除数据

/**
 * 发送短信验证码
 */
export const findMobile = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
  * 用户登录 restful api 接口需要有语义
  * get 获取
  * post 提交
  * put 修改
  * delete 删除
  */
export const Userlogin = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    // 为什么一定要用data？？？？？？因为是post请求
    data: {
      mobile,
      code
    }
  })
}
