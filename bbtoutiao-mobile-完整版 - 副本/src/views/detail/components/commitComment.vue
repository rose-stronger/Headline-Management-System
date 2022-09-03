<template>
  <div>
    <!-- 提交评论 在这里 包括弹出层 -->
    <van-popup
    :value="value"
    @input="$emit('input',$event) "
     closeable

     position="bottom">
      <div class="container">
        <van-field
        class="commentArea"
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />

      <van-button class="comment-btn" type="primary" size="mini" :disabled="!message"
       @click="postComment" >发布</van-button
      >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { addArticleComment } from '@/api/article-list'
import { Toast } from 'vant'
export default {
  name: 'commitCommentVue',
  props: {
    // 代表的是isShowPop
    value: {
      type: Boolean,
      required: true
    },
    // 文章的id或评论的id 相当于artID
    // 相当于老师的id
    target: {
      type: String,
      required: true
    },
    // ?????没传
    artId: {
      type: String

    }

  },

  data () {
    return {
      // isPopShow: false,
      message: '',
      addObj: {}
    }
  },
  methods: {
    async postComment () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const res = await addArticleComment({

        target: this.target,
        content: this.message,
        // 回复需要请求此参数
        artId: this.artId
      })
      // console.log(res)
      this.addObj = res
      // const addObj = res
      // 添加的obj
      // console.log(this.addObj)
      this.message = ''
      this.$emit('input', false)
      this.$emit('addObjFn', this.addObj)
      Toast.success('评论成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  display: flex;
   padding: 18px;
  align-items: center;
  .commentArea{
  background-color: #f5f6fa;
  }

  .comment-btn{
    width: 40px;
    margin-left:12px
  }
}
</style>
