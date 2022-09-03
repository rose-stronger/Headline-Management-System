<template>
  <div class="container">
    <van-nav-bar title="黑马头条" fixed left-arrow @click-left="onClickLeft" />

    <div class="box" v-if="list.art_id">
      <!--  标题 -- -->
      <h2 class="title">{{ list.title }}</h2>
      <!-- 用户 -->
      <div class="user-box">
        <div class="info">
          <img class="avatar" :src="list.aut_photo" alt="" />
          <div class="desc">
            <p class="name">{{ list.aut_name }}</p>
            <p class="pubdate">{{ list.pubdate | relativeDate }}</p>
          </div>
        </div>
      <!-- 是否关注 -->
        <followingVue
          v-model="list.is_followed"
          :autId="list.aut_id"
        />
      </div>

      <!-- 详情 -->
      <div class="markdown-body" v-html="list.content"></div>

      <!-- end -->
      <div class="body-end">------------- 正文结束 -------------</div>

      <!-- 评论列表 @commentCount="commentCountFn"-->
      <!-- replyClick -->
      <commentVue :artId="list.art_id" :newObj="newObj" @replyClick="onReplyClick" />
      <!-- 提交评论  弹出层 -->

         <commitCommentVue v-if="list.art_id "
         v-model="isPopShow" :target="list.art_id" :artId="list.art_id"
         @addObjFn="newObj=$event"
         ></commitCommentVue>

         <!-- newObj=$event $event相当于传过来的值 -->

         <!--回复评论reply  -->
         <!-- && isPopShowReply 解决当回复弹出层为真时 重现刷新页面  -->
         <commentReply v-if="selectCommentObj && isPopShowReply " v-model="isPopShowReply" :data="selectCommentObj"></commentReply>

    </div>

    <div class="article-bottom">
      <div class="commit">
        <div @click="showPop">写评论</div>
      </div>
     <!-- 信息条数 -->
      <van-icon
      class="icon chat" name="chat-o"

       :badge="list.comm_count" />
      <!-- 收藏 -->
      <collectedVue
        v-model="list.is_collected"
      :autId="list.art_id"></collectedVue>
      <!-- 点赞 -->
      <likingVue
      v-model="list.comm_count"
      :artId="list.art_id"

      ></likingVue>
    </div>
  </div>
</template>

<script>
import commentReply from '@/views/detail/components/commentReply.vue'
import commitCommentVue from '@/views/detail/components/commitComment.vue'
import collectedVue from '@/views/detail/components/collected.vue'
import followingVue from '@/views/detail/components/following.vue'
import likingVue from '@/views/detail/components/likings.vue'
import commentVue from '@/views/detail/components/comment.vue'
import { getArticleDetail } from '@/api/detail'

export default {
  name: 'homeDetail',
  components: {
    followingVue,
    commentVue,
    likingVue,
    collectedVue,
    commitCommentVue,
    commentReply

    // commitPop
  },
  props: {
    id: {
    // 数字和字符串
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      is_liking: false,
      isPopShow: false,
      isPopShowReply: false,
      commentCount: '',
      newObj: null,
      selectCommentObj: {}
    }
  },
  created () {
    this.getArticleDetailAPI()
  },
  methods: {
    onReplyClick (data) {
      // console.log(data)
      this.isPopShowReply = true
      // 拿得到了点击的数据 有且最多有一个 传给reply selectCommentObj
      console.log(data)
      this.selectCommentObj = data
    },
    // addObjFn (newObj) {
    //   console.log(newObj)
    // },
    commentCountFn (count) {
      // console.log(count)
      this.commentCount = count
    },

    onClickLeft () {
      this.$router.back()
    },
    async getArticleDetailAPI () {
      // 或者 this.$route.params.id
      const res = await getArticleDetail(this.id)
      this.list = res
      console.log(this.list)
    },
    showPop () {
      this.isPopShow = true
      // this.$emit('showPopup',true)
    }

  },
  watch: {
    // newObj (newObj) {
    //   this.list.unshift(newObj)
    // }
  }

}
</script>

 <style lang="less">
// @import '@/styles/test/seniva.css';
</style>

<style lang="less" scoped>
.container {
  ::v-deep .van-nav-bar {
    background-color: #5095f2;

    .van-nav-bar__title {
      color: white;
    }

    .van-icon-arrow-left {
      color: white;
    }
  }

  .box {
    padding: 16px;
    height: 100vh;
    padding: 48px 12px;
    box-sizing: border-box;
    overflow: auto;

    .title {
      font-size: 22px;
    }

    .user-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        align-items: center;
        display: flex;
        font-size: 12px;
        .avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
        }

        .desc {
          margin-left: 6px;
          .name {
            margin: 0;
            color: #333;
          }
          .pubdate {
            margin: 0;
            margin-top: 6px;
            color: #969494;
          }
        }
      }

      .following {
        height: 32px;
        width: 98px;
      }
    }

    .markdown-body {
      margin-top: 20px;
    }

    .body-end {
      color: #c9c9c9;
      font-size: 16px;
      margin: 28px;
      text-align: center;
    }
  }

  .article-bottom {
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

    .icon {
      margin-right: 18px;
      display: inline-block;
      font-size: 24px;
    }
  }
}
</style>
