<template>
  <div>
      <van-pull-refresh
      v-model="isReFreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      >
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"

              @load="onLoad"
            >
            <!-- 点击 事件进行跳转 -->
            <div v-for="(item,index) in list" :key="index" @click="onDetailClick(item.art_id )">
            <articleItem1 v-if="item.cover.type===0" :data="item"></articleItem1>
            <articleItem2 v-else-if="item.cover.type === 1" :data="item"></articleItem2>
            <articleItem3 v-else :data="item"></articleItem3>
            </div>
              <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
          </van-list>
     </van-pull-refresh>
  </div>
</template>

<script>

import { getArticleList } from '@/api/article-list'
import articleItem1 from '@/components/article-item1.vue'
import articleItem2 from '@/components/article-item2.vue'
import articleItem3 from '@/components/article-item3.vue'
export default {
  components: {
    articleItem1,
    articleItem2,
    articleItem3
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // channel_id: '', // 频道 id
      timestamp: null,
      error: false,
      isFirst: true,
      isReFreshing: false,
      refreshSuccessText: '刷新成功'
    }
  },
  created () {
  // this.onLoad()
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const res2 = await getArticleList({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now()
        })
        // //  模拟？？？？
        //  if(Math.random()>0.1){
        //   JSON.parse('asdfghjj')
        //  }
        //  console.log(res2)
        // const result = res2.data.data.results // array
        const result = res2.results // array

        // 展开操作符  results[0] results[1]...
        if (this.isFirst) {
          this.list = result
          this.isFirst = false
        } else {
          this.list.push(...result)
        }

        // 阻止连续两次刷新  未铺满或者list组件初始化
        this.loading = false
        if (result.length) {
          // 更新
          // this.timestamp = res2.data.data.pre_timestamp
          this.timestamp = res2.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        // console.log(err)
      }
    },
    async onRefresh () {
      try {
        const res2 = await getArticleList({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now()
        })
        //  将数据追加到列表顶部
        // const result = res2.data.data.results
        const result = res2.results
        this.list.unshift(...result)
        //  关闭下拉刷新的loading状态
        this.isReFreshing = false

        this.refreshSuccessText = `更新成功，更新${result.length}条数据`
      } catch (err) {
        // console.log('错误',err);
        this.isReFreshing = false
        this.refreshSuccessText('刷新失败')
      }
    },
    onDetailClick (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style>

</style>
