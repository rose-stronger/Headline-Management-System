<template>
  <div class="container">

 <div class="left"><img class="avatar" :src="data.aut_photo" alt=""></div>
    <div class="center">
      <div class="name">{{data.aut_name}}</div>
      <div class="content">{{data.content}}</div>
      <div class="bottom">
        <span class="time">{{data.pubdate|relativeDate}}</span>
        <!-- 将点击的data值传给commentItem 将data值传个子组件reply-->
        <!-- 回复按钮是否显示 -->
        <van-button  v-if="isShowBtn"
         class="btn-reply" @click="$emit('clickReply',data)">回复{{data.reply_count}}</van-button>
      </div>
    </div>

      <div class="right">
        <van-icon name="good-job-o" />
        <span>赞</span>
      </div>

  </div>
</template>

<script>
export default {

  name: 'commentItemVue',
  props: {
    // 这里代表的是传过来的data
    data: {
      type: Object,
      required: true
    },
    isShowBtn: {
      type: Boolean,
      // 默认是真！！！！
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.container{
  margin:14px 0;
  display:flex;
  // ！！！！
  font-size: 14px;
justify-content: space-between;
.center{
  margin-left:12px;
  flex-grow:1;

  .name{
color:#007acc;
  }
  .content{
    margin-top:4px;
    margin-bottom:4px;
    font-weight:500;
  }
  .bottom{
    display: flex;
    align-items: center;
 .btn-reply{
margin-left:10px;
    height: 24px;
    border:1px solid #ccc;
    font-size:12px;
    line-height:30px;
    text-align: center;
    padding:0px 20px
  }
  }

}
  .left{
    margin-top:4px;
    .avatar{
      width: 44px;
      height: 44px;
      border-radius: 50%;

    }
  }

}
</style>
