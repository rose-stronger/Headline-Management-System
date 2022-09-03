<template>
   <van-button
    v-if="!value"
    class="following"
    icon="plus"
    type="info"
    round
    :loading="loading"
    @click="onTrigger"

  >
    关注
  </van-button>
  <van-button
    v-else
    :loading="loading"
    class="following"
    type="default"
    round
     @click="onTrigger"

  >
    已关注
  </van-button>
</template>

<script>
import { postFollowUser, deleteFollowUser } from '@/api/user'
export default {
  name: 'followVue',
  props: {
    //  v-if="!value" 进行双向数据绑定  绑定的是is_followed
    value: {
      type: Boolean,
      required: true
    },
    autId: String
  },
  data () {
    return {
      // loading是按钮自带的 可以进行设值
      loading: false
    }
  },
  methods: {
    async  onTrigger () {
      this.loading = true
      // postFollowUser(autId)
      if (this.value) {
        // 已关注 调用删除接口
        await deleteFollowUser(this.autId)
        // await postFollowUser(this.autId)
        // 改变value 来显示是否关注 的字样 但是子组件不可以改变父组件传过来的值 所以广播
        this.$emit('input', false)
      } else {
        await postFollowUser(this.autId)
        // await deleteFollowUser(this.autId)
        this.$emit('input', true)
      }
      this.loading = false
    }

  }
}
</script>

<style>

</style>
