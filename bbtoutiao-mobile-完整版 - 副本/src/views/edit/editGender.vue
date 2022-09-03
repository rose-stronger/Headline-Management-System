<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onGenderConfirm"
        @cancel="onGenderCancel"

      />
    </van-popup>
  </div>
</template>

<script>
import { editUserFile } from '@/api/edit'
import { Toast } from 'vant'
export default {
  name: 'editGenderVue',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
      // index: 1
    }
  },
  methods: {
    onGenderConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      // this.index = index
      // 调接口
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      console.log(index)
      const res = editUserFile({
        gender: index
      })
      console.log(res)
      Toast.success('成功文案')
      // 保存信息
      this.$store.dispatch('profile')
      this.onGenderCancel()
    },
    onGenderCancel () {
      // console.log('取消')
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
