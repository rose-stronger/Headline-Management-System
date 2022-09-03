<template>

  <div>
    <van-cell
    v-for="(item,index) in list" :key="index"
    icon="search"
    @click="selItem(item)"
        >
         <div v-html="isBecomeBlue(item)"></div>

    </van-cell>

  </div>
</template>

<script>
import { findSearchAdvice } from '@/api/search'
import { debounce } from 'lodash-es'

export default {
  props: {
    findValue: String
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    // debugger
    this.getAdviceData()
  },

  methods: {
    async getAdviceData () {
      // const res = await findSearchAdvice(this.findValue)
      const res = await findSearchAdvice({
        q: this.findValue
      })
      // console.log(res)
      // const option = res.data.data.options
      const option = res.options

      if (option.length) {
        this.list.push(...option)
      } else {
        // 没有数据了

        this.list = []
      }

    // console.log(this.list)
    },
    isBecomeBlue (item) {
      if (!item) return ''
      return item.replaceAll(this.findValue, `<span class="active">${this.findValue}</span>`)
    },
    // ???????
    selItem (item) {
      this.$emit('selItemFn', item)
    }
  },
  // 继续触发 并且 抖动
  watch: {
    findValue: {
      handler: debounce(function () {
        this.getAdviceData()
      }, 1000),
      // handler:getAdviceData,
      // deep:true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .active{
  color:red;
}

</style>
