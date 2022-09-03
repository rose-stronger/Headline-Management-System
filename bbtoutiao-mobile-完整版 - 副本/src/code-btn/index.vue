<template>
 <van-button
 v-if="!value"
 native-type="button"
  size="small"
 type="primary"
 @click="onSendCodeClick"
 >发送验证码</van-button>
 <div v-else>{{s}}s</div>
</template>

<script>
const MAX_S = 6
export default {
  // 双向数据绑定 v-model  props要用value @input
  props: {
    value: {
      // false表示不在加载中 可以进行操作 加载中不可以进行操作
      type: Boolean,
      required: true
    }
  },
  name: 'codeBtn',
  data () {
    return {

      // loading: false,
      interval: null,
      s: MAX_S
    }
  },
  methods: {
    onSendCodeClick () {
      // 手机号不可以为空
      this.$emit('click')
      //
    },
    // 通知父组件 倒计时
    sendCode () {
      this.$emit('sendCode')
    },
    // 定时器开始
    start () {
      // 事先清理一下 正在进行的 全部终止
      this.end()
      // 触发发送验证码函数
      this.sendCode()
      this.interval = setInterval(() => {
        this.s--
        if (this.s === 0) {
          this.end()
        }
      }, 1000)
    },
    end () {
      // 如果 interval 不为null  就clear 否则
      if (this.interval) {
        clearInterval(this.interval)
        // 再次变为null
        this.interval = null
        this.s = MAX_S
        this.$emit('input', false)
      }
    }
  },
  // 监听codeLoading值的变化 如果值为真 codeloading处于发送中的状态 此时调用时间函数
  watch: {
    value: {
      handler (value) {
        if (value) {
          this.start()
        }
      }
    }
  }
}
</script>

<style>

</style>
