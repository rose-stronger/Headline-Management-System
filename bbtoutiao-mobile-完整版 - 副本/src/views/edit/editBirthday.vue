<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-datetime-picker
      v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onBirthdayConfirm"
        @cancel="onBirthdayCancel"
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
      minDate: new Date(1840, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.$store.state.userInfo.birthday)
      // val: Number
    }
  },
  created () {},
  methods: {
    async onBirthdayConfirm (value) {
      // console.log('111')
      console.log(value)
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      const date = new Date(value)
      const time = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + (date.getDate()).toString().padStart(2, '0')
      await editUserFile({
        birthday: time
      })
      // console.log(time)
      // console.log(res)
      this.$store.dispatch('profile')
      Toast.success('获取成功')
      this.onBirthdayCancel()
    },

    onBirthdayCancel () {
      this.$emit('input', false)
    }

  },
  watch: {

  }
}
</script>

<style>
</style>
