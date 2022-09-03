<template>
  <div>
    <!-- 是否收藏 -->
    <!-- 已收藏 -->
    <van-icon  v-if="!value"  @click="onTrigger" name="star-o" />
    <van-icon v-else  @click="onTrigger" class="icon star" name="star" />

  </div>
</template>

<script>
import { collectByArtId, noCollectByArtId } from '@/api/user'
export default {

  name: 'collectedVue',
  props: {
    value: Boolean,
    // 文章id
    autId: String
  },
  data () {
    return {
      // isShow: false
    }
  },
  methods: {
    async onTrigger () {
      // isShow为真 表示已收藏 进行取消收藏
      if (this.value) {
        // await collectByArtId(this.autId)
        await noCollectByArtId(this.autId)
        this.$emit('input', false)
      } else {
        // 表示未收藏 进行收藏操作
        await collectByArtId(this.autId)
        // await noCollectByArtId(this.autId)
        this.$emit('input', true)
      }
    }
  }

}
</script>

<style>

</style>
