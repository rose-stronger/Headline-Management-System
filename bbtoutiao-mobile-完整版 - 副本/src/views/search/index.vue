<template>
  <div>
     <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
     background="lightblue"
  />

  <searchAdvice v-if="isType===ADVICE"
  :findValue="value"
   @selItemFn="selItemFn"
  ></searchAdvice>
  <!-- 输入框内容 且回车 -->
   <!-- 输入框为空
   :historyValue="value"
     @showFn="showFn"
    -->
    <!--
    :hisArr="historyArr"
@delAllFn="delAllFn"
-->
  <searchHistory

  v-else-if="isType===HISTORY"></searchHistory>
  <!-- 按回车展示 -->
  <searchResult v-else
   :showValue="value"
  @keyup.enter="value"

></searchResult>
  </div>
</template>

<script>

import searchAdvice from '@/views/search/search-advice.vue'
// import searchHistory from '@/views/search/search-history.vue'
import searchHistory from '@/views/search/search-history1.vue'
import searchResult from '@/views/search/search-result.vue'
const HISTORY = '0'
const ADVICE = '1'
const RESULT = '2'

export default {
  components: {
    searchAdvice,
    searchHistory,
    searchResult
  },
  data () {
    return {

      value: '',
      HISTORY,
      ADVICE,
      RESULT,
      isType: HISTORY,
      historyArr: JSON.parse(localStorage.getItem('historyList')) || []
    }
  },
  methods: {
    onSearch (val) {
      const index = this.historyArr.indexOf(val)
      if (index !== -1) {
        this.historyArr.splice(index, 1)
      }
      this.historyArr.unshift(val)
      // localStorage.setItem('historyList',JSON.stringify(this.historyArr))||[]

      // 如果值为空 搜索框为空
      if (val) {
        this.isType = RESULT
      }
    },
    onCancel () {
      // Toast('取消');
      this.$router.back()
    },
    selItemFn (item) {
      // console.log(item)
      this.value = item
      setTimeout(() => {
        this.isType = RESULT
      })
    },
    showFn (value) {
      // console.log(value)
      this.historyArr.push({
        value: value,
        name: 'close'
      })
    },
    delAllFn () {
      // 不可以return return 之后结果无法立即显示
      this.historyArr = []
    }

  },
  watch: {
    value (val) {
      if (!val) {
        this.isType = HISTORY
      } else {
        this.isType = ADVICE
      }
    },
    historyArr (val) {
      localStorage.setItem('historyList', JSON.stringify(val))
    }
  }

}
</script>

<style lang="less" scoped>
.van-search__action{
  color:#fff
}
</style>
