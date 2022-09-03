<template>
  <div>
    <!-- <van-nav-bar :title="activeTitle" fixed /> -->
  <!-- 在路由处导入组件 就相当于创建了路由 -->
      <router-view ></router-view>

    <!-- 页面在这里显示 -->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarItemData"
        :key="index"
        :class="{ 'van-tabbar-item--active': $route.path === item.path }"
        :replace="item.replace"
        :to="item.to"
        :icon="item.icon"
      >
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>

      <!-- <van-tabbar  v-model="active">
      <van-tabbar-item replace to="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace  to="question"  icon="search">问答</van-tabbar-item>
      <van-tabbar-item replace  to="video"  icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item replace  to="profile" icon="setting-o">{{this.$store.state.token?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar> -->

  </div>
</template>

<script>

export default {
  name: 'layoutVue',
  data () {
    return {
      active: 0,
      activeTitle: this.$route.meta.title,
      tabbarItemData: [
        {
          to: 'home',
          icon: 'home-o',
          replace: true,
          path: '/home',
          text: '首页'
        },
        {
          to: 'qa',
          icon: 'search',
          replace: true,
          path: '/qa',
          text: '问答'
        },
        {
          to: 'video',
          icon: 'friends-o',
          replace: true,
          path: '/video',
          text: '视频'
        },
        {
          to: 'profile',
          icon: 'setting-o',
          replace: true,
          path: '/profile',
          text: this.$store.state.token ? '我的' : '未登录'
        }
      ]
    }
  },
  watch: {
    $route: {
      deep: true,
      handler () {
        this.activeTitle = this.$route.meta.title
      }
    }
  }
}
</script>

<style>
</style>
