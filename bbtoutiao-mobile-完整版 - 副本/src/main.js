import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 通用组件注册
import mLibs from '@/libs'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import 'amfe-flexible'
import '@/filters/index'
// import { debounce} from 'lodash-es'

Vue.use(Vant)
Vue.use(mLibs)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
