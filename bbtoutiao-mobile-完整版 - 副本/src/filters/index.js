import Vue from 'vue'
// 1. 导入 dayjs
import dayjs from 'dayjs'
// 2.1. 国际化：导入简体中文语言包
import 'dayjs/locale/zh-cn'
// 3.1. 想要使用相对时间，需要导入插件：RelativeTime
import relativeTime from 'dayjs/plugin/relativeTime'

// 2.2. 国际化：全局使用简体中文
dayjs.locale('zh-cn')
// 3.2. 使用 RelativeTime 插件
dayjs.extend(relativeTime)

/**
 * 注册 相对时间
 */
Vue.filter('relativeDate', (value) => {
  // dayjs() 当前时间
  // to 相对
  // to(相对于之前的一个时间)
  return dayjs().to(dayjs(value))
})
