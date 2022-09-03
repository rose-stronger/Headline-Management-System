<template>
  <div>

    <van-icon v-if="!value"  @click="onTrigger" name="good-job-o" />
    <van-icon  v-else class="icon goods"  @click="onTrigger" name="good-job" />

  </div>
</template>

<script>
import { getLiking, getCancleLiking } from '@/api/user'
export default {
  props: {
    // 是数字类型吗
    artId: {
      type: String
    },
    value: Number
  },
  data () {
    return {

    }
  },
  name: 'likingVue',
  created () { },
  methods: {

    onTrigger () {
      // 取消点赞
      if (this.value) {
        const res = getCancleLiking(this.artId)
        console.log(res)
        this.$emit('input', 0)
      } else {
        const res1 = getLiking(this.artId)
        console.log(res1)
        this.$emit('input', 1)
      }
    }

  }
}
</script>

<style>

</style>
