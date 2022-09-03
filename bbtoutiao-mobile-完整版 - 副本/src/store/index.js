import Vue from 'vue'
import Vuex from 'vuex'
import { Userlogin } from '@/api/login'
import { findUserInfo } from '@/api/user'

Vue.use(Vuex)
const TOU_TIAO = '_TOU_TIAO_HISTORY'
const MY_TOKEN_KEY = '_MY_TOKEN_KEY'
const MY_USER_INFO = '_MY_USER_INFO'
export default new Vuex.Store({
  state: {
    isChannelShow: false,
    // historyArr: JSON.parse(localStorage.getItem(TOU_TIAO))||[]
    // set存储 get 获取
    historyArr: JSON.parse(window.localStorage.getItem(TOU_TIAO)) || [],
    // 获取用户身份令牌
    token: (window.localStorage.getItem(MY_TOKEN_KEY)) || '',
    // 获取用户信息
    userInfo: JSON.parse(window.localStorage.getItem(MY_USER_INFO)) || {}

  },
  getters: {
    gender (state) {
      console.log(state)
      return state.userInfo.gender === 1 ? '女' : '男'
    }
  },
  // 只能是同步
  mutations: {

    setSearchHistory (state, payload) {
      // state.historyArr.reduce()
      if (state.historyArr.includes(payload)) {
        const index = state.historyArr.findIndex(item => item === payload)
        if (index !== -1) {
          state.historyArr.splice(index, 1)
        }
      }
      state.historyArr.unshift(payload)
      window.localStorage.setItem(TOU_TIAO, JSON.stringify(state.historyArr))
      // console.log(state.historyArr)
    },
    delFn (state, payload) {
      state.historyArr.splice(payload, 1)
      window.localStorage.setItem(TOU_TIAO, JSON.stringify(state.historyArr))
    },
    delAllFn (state) {
      state.historyArr = []
      window.localStorage.setItem(TOU_TIAO, JSON.stringify(state.historyArr))
    },
    // 存储taken
    setToken (state, newToken) {
      state.token = newToken
      // 持久化
      // console.log(newToken)
      window.localStorage.setItem(MY_TOKEN_KEY, newToken)
    },
    // 存储用户信息
    setUserInfo (state, newUserinfo) {
      state.userInfo = newUserinfo
      // 持久化
      window.localStorage.setItem(MY_USER_INFO, JSON.stringify(state.userInfo))
    }

  },
  actions: {
    /**
     * 登录操作
     */
    async login (context, { mobile, code }) {
      // console.log(context)
      const res = await Userlogin(mobile, code)
      const token = res.token
      // console.log('taken')
      // console.log(res)
      console.log('1111111异步操作')
      // 把token保存到vuex的status中
      context.commit('setToken', token)
      // 触发获取用户信息的函数
      context.dispatch('profile')
    },
    // 获取用户资料
    async profile (context) {
      const res = await findUserInfo()
      // const res = re.data.data
      console.log(res)
      context.commit('setUserInfo', res)
    }

  },
  modules: {
  }
})
