<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="onClickNameLeft"
        @click-right="onClickNameRight"
      />
      <van-field
        :value="$store.state.userInfo.name"
        @input="onInputName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import { editUserFile } from '@/api/edit'
import { Toast } from 'vant'
export default {
  name: 'editNameVue',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      name: ''
    }
  },
  created () {

  },
  methods: {
    onInputName (e) {
      // 监听值的变化
      console.log(e)
      this.name = e
    },
    onClickNameLeft () {
      // this.value = false
      // 直接修改父组件的值 不可以 传值
      this.$emit('input', false)
    },

    onClickNameRight () {
      // 调接口
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const res = editUserFile({
        name: this.name
      })
      console.log(res)
      Toast.success('成功文案')
      // 保存信息
      this.$store.dispatch('profile')
      this.onClickNameLeft()
    }
  }
}
</script>

<style>
</style>
