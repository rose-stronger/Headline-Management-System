import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    // name:'home',
    // 路由的懒加载：需要的时候才会加载并执行
    redirect: 'home',

    component: () => import('@/layout/index'),
    children: [
      {
        path: 'home',
        // name:'home',
        // 路由的懒加载：需要的时候才会加载并执行
        component: () => import('@/views/home'),
        meta: { // meta保存路由对象额外信息的
          title: 'home'
        }
        // component:homeVue
      },
      {
        path: 'profile',
        // name:'profile',
        component: () => import('@/views/profile'),
        meta: { // meta保存路由对象额外信息的
          title: 'profile'
        }
      },
      {
        path: 'question',
        // name:'question',
        component: () => import('@/views/question'),
        meta: { // meta保存路由对象额外信息的
          title: 'question'
        }
      },
      {
        path: 'video',
        // name:'video',
        component: () => import('@/views/video'),
        meta: { // meta保存路由对象额外信息的
          title: 'video'
        }
      }
    ]
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/detail/index.vue'),
    // component: () => import('@/components/article-item1')
    // 开启路由传参 props解耦
    props: true
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue')
    // name:'search'
    // component: () => import('@/components/article-item1')
  },
  {
    path: '/channel',
    component: () => import('@/views/channel/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/edit/profile',
    component: () => import('@/views/edit/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
