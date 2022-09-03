<template>
  <div>
 <!-- 评论区域列表 -->
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<!-- 将 commentItem 传过来的值 传给index   $event===data  从commentITem传过来的 -->
    <commentItem
    @clickReply="$emit('replyClick',$event)"
   v-for="item in list" :key="item.id"
   :data="item"
    ></commentItem>
</van-list>
  </div>
</template>

<script>
import commentItem from '@/views/detail/components/commentItem.vue'
import { getArtCommentList } from '@/api/user'
export default {
  name: 'commentVue',
  components: {
    commentItem
  },
  props: {
    artId: {
      type: String,
      required: true
    },
    newObj: Object
  },
  data () {
    return {
      query: {
        type: 'a',
        offset: '',
        limit: 10
      },
      list: [],
      loading: false,
      finished: false,
      lastId: '',
      total_count: 0

    }
  },
  created () {
    // 手动触发 会立即触发
    // this.onLoad()
  },
  methods: {
    async  onLoad () {
      // 发请求
      const res = await getArtCommentList({ ...this.query, source: this.artId })
      const totalCount = res.total_count
      this.total_count = res.total_count
      this.lastId = res.last_id
      console.log('my Commit')
      this.query.offset = this.lastId
      // list数据赋值一定不可以使用=
      // this.list = res.results
      this.loading = false
      this.list.push(...res.results)

      this.finished = this.list.length === totalCount
    }
  },
  watch: {
    // 如果list没有 comm_count 可以使用此方法
    total_count (val) {
      // this.$emit('commentCount', val)
    },
    newObj (val) {
      if (!val) return
      this.list.unshift(val)
    }
  }
}
</script>

<style>

</style>
