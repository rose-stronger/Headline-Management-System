<template>
  <div>
    <!-- <van-nav-bar :title="activeTitle" fixed /> -->
  <!-- 在路由处导入组件 就相当于创建了路由 -->
      <router-view ></router-view>

    <!-- 页面在这里显示 -->

  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }

}
</script>

<style>
</style>
