import axios from 'axios'
import store from '@/store'
// 生成 axios 实例
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
/**
 * axios 内部存在两个拦截器：
 * 1. 请求拦截器：会在 《请求真正被发送出去之前》调用
 * 2. 响应拦截器：会在《请求真正被接收之前》调用
 */

/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
  // config 表示：这次请求的详细信息
  // console.log('进入了请求拦截器')
  // 判断用户是否已经登陆了
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }

  console.log(config)
  // 我们必须要在这里返回一个配置对象，这个返回的配置对象表示了当前这次请求的详细信息
  return config
})

/**
 * 响应拦截器
 */
instance.interceptors.response.use((result) => {
  // console.log('进入了响应拦截器')
  // console.log(result)
  return result.data.data
})

export default instance
