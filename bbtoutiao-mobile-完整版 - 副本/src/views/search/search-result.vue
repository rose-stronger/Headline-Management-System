<template>

  <div>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"

        >
          <van-cell
                  icon="search"
                  v-for="(item,index) in resultArr" :key="index"
              >
            {{item.title}}

          </van-cell>
        </van-list>

       <!-- <van-cell
            icon="search"
            v-for="(item,index) in resultArr" :key="index"
        >
       {{item.title}}

    </van-cell> -->
  </div>
</template>

<script>
import { findSearchDetail } from '@/api/search'
export default {
  props: {
    showValue: String
  },
  data () {
    return {
      showVal: '',
      resultArr: [],

      loading: false,
      finished: false,
      query: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created () {
    // 打印值
    // console.log(this.showValue)
    this.$store.commit('setSearchHistory', this.showValue)
  },
  methods: {
    async findSearchDetailAPI () {
      const res = await findSearchDetail({
        ...this.query,
        q: this.showValue
      })
      // console.log(res)
      // const result = res.data.data.results
      const result = res.results
      // const totalCount = res.data.data.total_count
      const totalCount = res.total_count
      // 总条数
      // console.log(totalCount)
      // 页数加加
      this.query.page++
      this.resultArr.push(...result)
      // console.log(this.resultArr)
      // 加载成功就停止加载
      this.loading = false

      if (this.resultArr.length === totalCount) {
        this.finished = true
      }
    },
    onLoad () {
      // 异步更新数据
      this.findSearchDetailAPI()
    }
  }
}
</script>

<style>

</style>
