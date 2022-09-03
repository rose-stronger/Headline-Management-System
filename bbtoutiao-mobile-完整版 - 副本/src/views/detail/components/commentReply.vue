<template>
  <div>
    <!--  @input="$emit('input', $event)" isShowReply  为 false -->
    <van-popup
      :value="value"
      @input="$emit('input', $event)"

      position="bottom"
      :style="{height:'80%'}"
    >
    <!-- 回复导航栏 -->
      <div class="box">
        <van-nav-bar title="评论的回复">
          <template #left>
            <van-icon name="cross" />
          </template>
        </van-nav-bar>
      </div>
      <!-- 点击的评论4. 把当前data值传给 -->

       <commentItem class="reply-top" :data="data" :isShowBtn="false"></commentItem>

       <!-- 写评论点击按钮 -->
       <div class="article-bottom">
             <div class="commit">
        <div @click="isShowCommit=true">写评论</div>
      </div>
       </div>
<!-- 点击的 弹出的选项 -->
        <commitCommentVue
      v-model="isShowCommit"
      :target="data.com_id"
      :artId="$route.params.id"
    />
    <!-- 文章id
    $route.params.id -->
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

    </van-popup>

  </div>
</template>

<script>
import { getArtCommentList } from '@/api/user'
import { Toast } from 'vant'
import commitCommentVue from '@/views/detail/components/commitComment.vue'
import commentItem from '@/views/detail/components/commentItem.vue'
export default {
  name: 'commentReply',
  data () {
    return {
      isShowCommit: false,
      list: [],
      loading: false,
      finished: false,
      lastId: '',
      total_count: 0,
      query: {
        type: 'c',
        offset: '',
        limit: 10

      }
    }
  },
  components: {
    commentItem,
    commitCommentVue
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 3.index过来的 当前点击的文章数据 传值给上方 commentItem 点击的评论
    data: {
      type: Object

    }

  },
  created () {
    console.log(this.data)
  },
  methods: {
    showPop () {
      this.isPopShow = true
      // this.$emit('showPopup',true)
    },
    // 触发了多次onload 为什么？？闪现
    async  onLoad () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 发请求
      const res = await getArtCommentList({ ...this.query, source: this.data.com_id })
      console.log(res)
      const totalCount = res.total_count
      this.total_count = res.total_count
      this.lastId = res.last_id

      // console.log('my Commit')
      this.query.offset = this.lastId
      // list数据赋值一定不可以使用=
      this.list = res.results
      this.loading = false
      // this.list.push(...res.results)

      this.finished = this.list.length === totalCount
      Toast.success('获取成功')
    }
  },
  // 由于共用一个reply页面 所以 再点击其他回复页面的时候  会显示原来的回复页面 只是隐藏而已
  watch: {
    // 监听data
    // data: {
    //   handler () {
    //     this.list = []
    //     this.finished = false

    //     this.loading = true
    //     this.load()
    //   }
    // }

    // newObj (val) {
    //   if (!val) return
    //   this.list.unshift(val)
    // }

  }
}
</script>

<style lang="less" scoped>
.box {
  ::v-deep .van-nav-bar {
    background-color: white !important;

    .van-nav-bar__title {
      color: #333 !important;
    }
  }
}
.reply-top{
  padding: 16px ;
}
.article-bottom{
   position: fixed;
  bottom: 0;
  left: 0;
  height: 46px;
  width: 100vw;
  z-index: 10;
  background-color: white;
  border-top: 1px solid #333;
  display: flex;
  padding: 0 18px;
  align-items: center;
  justify-content: center;
  .commit {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-right: 28px;
      div {
        height: 26px;
        line-height: 26px;
        border: 1px solid #c9c9c9;
        width: 180px;
        text-align: center;
        border-radius: 50px;
      }
    }
}

</style>
