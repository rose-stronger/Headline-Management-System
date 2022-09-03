<template>
  <div class="box">
    <van-nav-bar fixed>
        <van-button
         round
         slot="title"
          class="search-btn"
        type="info">
        <van-icon name="search"
        size="20" color="#fff"
        @click="SearchFn(pathTarget)"
        />
        搜索</van-button>
    </van-nav-bar>
   <van-tabs id="main-container" v-model="active" >
      <van-tab   v-for="(item,index) in channel"  :key="index" :title="item.name">
        <articleList :channel="item"> </articleList>
        </van-tab>
       <div slot="nav-right" class="hamburger-btn" >
          <i class="toutiao toutiao-gengduo" @click="isChannelShow=true"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
     <!-- 弹出层 -->
     <!-- :value="isChannelShow"

      @input="isChannelShow=$event" -->
    <van-popup
       v-model="isChannelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <!-- 如果想要在组件中使用v-model props必须是value emit 必须叫做input -->
    <ChannelEdit
     @isChannelShow="isChannelShow=$event"
     @addChannelItemFn="addChannelItemFn"
     @deleteChannel="deleteChannelFn"
    :myChannel="channel"
    :active="active"
    v-model="active"
    ></ChannelEdit>
    </van-popup>

  </div>
</template>

<script>
import ChannelEdit from './components/channel-edit.vue'
import articleList from './components/article-list.vue'
import { getUserChannels } from '@/api/home'
import { PutUserEditChannel } from '@/api/user'
const MY_CHANNELS_KEY = '_MY_CHANNELS_KEY'
export default {
  name: 'home-home',
  components: {
    articleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channel: [],
      pathTarget: '/search',
      isChannelShow: false

    }
  },
  created () {
    this.getUserChannelsAPI()
  },
  methods: {
    // 增
    addChannelItemFn (chan) {
      // 用户登录
      if (this.$store.state.token) {
        console.log('用户登录添加频道')
        this.channel.push(chan)

        PutUserEditChannel(this.channel)
      } else {
        // data复杂数据类型 的某一个属性去进行修改(push,...),此时不会触发错误监听
        // eslint-disable-next-line
        this.channel.push(chan)
        window.localStorage.setItem(MY_CHANNELS_KEY, JSON.stringify(this.channel))
      }
    },
    deleteChannelFn (index) {
      if (this.$store.state.token) {
        // 已经登录

        this.channel.splice(index, 1)

        PutUserEditChannel(this.channel)
        console.log('已经登录删除频道')
      } else {
        // 未登录直接删除
        this.channel.splice(index, 1)
      }
    },
    async getUserChannelsAPI () {
      // 未登录 有数据 从local中获取
      if (window.localStorage.getItem(MY_CHANNELS_KEY)) {
        this.channel = JSON.parse(window.localStorage.getItem(MY_CHANNELS_KEY))
      } else {
        // 未登录 无数据 以及 登录都是此操作，通过接口获取

        const data = await getUserChannels()
        this.channel = data.channels
      }

      // if (this.$store.state.token) {
      //   // 已经登录
      //   const data = await getUserChannels()
      //   // this.channel = data.data.data.channels
      //   this.channel = data.channels
      //   // 用户登录 对应的token 在request header 中 获取 Authorization: Bearer 9a14
      //   // isDefineUserLoginChannel()
      // } else {
      //   // 未登录
      //   // 有数据 就获取
      //   if (window.localStorage.getItem(MY_CHANNELS_KEY)) {
      //     this.channel = JSON.parse(window.localStorage.getItem(MY_CHANNELS_KEY))
      //   } else {
      //     // 无数据 接口获取
      //     try {
      //       const data = await getUserChannels()
      //       // console.log(data);
      //       // this.channel = data.data.data.channels
      //       this.channel = data.channels
      //       // 存储数据
      //       // window.localStorage.setItem(MY_CHANNELS_KEY, JSON.stringify(this.channel))
      //     } catch (err) {
      //       this.$toast('获取我的频道失败')
      //     }
      //   }
      // }
    },
    SearchFn (pathT) {
      this.$router.push({
        // path:nameTarget
        path: pathT
      })
    }

    // isChannelShowFn (val) {
    //   val = false
    //   this.isChannelShow = val
    // }

  },
  // 计算属性 时刻监视active的变化
  computed: {
    getChannelId () {
      return this.channel[this.active].id
    }
  },
  watch: {
    // 监听channel
    channel: {
      handler () {
        window.localStorage.setItem(MY_CHANNELS_KEY, JSON.stringify(this.channel))
      }
    }
  }
}
</script>

<style lang='less' scoped>
::v-deep .van-nav-bar__content{
  background-color:#4f94f3;

}
::v-deep .search-btn{
  width:224px;
  height: 30px;
  background-color: #5babfb;
  border:none;
  font-size:16px;
  opacity: 0.9;
}
::v-deep .van-tab{
    min-width: 80px;
   border-right: 1px solid #EDEFF3;
     border-bottom: 1px solid #EDEFF3;
    height: 50px;
}

::v-deep .van-tab__text{
  font-size:16px;
  color: #777777;
}
::v-deep .van-tabs__line{
  background-color:  #4f94f3;
}

::v-deep .van-tab--active .van-tab__text{
  color: #4f94f3 !important;
}
.hamburger-btn{
    position: fixed;
    top:50px;
    right:0px;
    width: 62px;
    height: 38px;
    background-color: #fff;
    display: flex;
    align-items: center;
  .toutiao-gengduo{
    padding-left: 16px;
    font-size: 26px;
    color: rgba(10, 8, 8, 0.725);
  }

}

// .van-tabs--line
::v-deep .van-tabs__wrap {
    height: 1.17333rem;
    position: fixed;
    top: 46px;
    left:0;
    right:0;
    z-index: 1;
    // !!!!!
    // width:100%
}

#main-container{
 margin-top:45px
}
// ::v-deep .van-list{
//  padding-top:60px

// }
.box{
  // 上面两个脱离文档流了 所以设置 总的box就是给main设置
  padding-top:60px
}

</style>
