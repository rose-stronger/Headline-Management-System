<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
      <van-cell >
          <div slot="title" class="title-text">我的频道</div>
          <van-button
          type="danger"
          plain
          round
          size="small"
          class="edit-btn"
          @click="onTrigger"
          >{{isDelShow ? '完成':'编辑' }}
          </van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        class="grid-item"

        v-for="(value,index) in myChannel" :key="index"

         >
        <span class="text" :class="{active:index===active}"
         @click=onItemClick(index)

        slot="text">{{value.name}}</span>
       <template #icon>
         <van-icon v-show='isDelShow===true'
         name="close"
         class="my-close"
         @click="onDeleteItem(index)"

         />
       </template>
        </van-grid-item>

      </van-grid>
      <!-- 频道推荐 -->
      <van-cell :border="false">
          <div slot="title"  class="title-text">频道推荐</div>
       </van-cell>
      <div class="recommend">
        <div class="recommand-item"
        @click="addChannelItem(item)"
        v-for="(item,index) in getRecommendChannels" :key="index"
        >+{{item.name}}</div>
      </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/home'
export default {
  name: 'ChannelEdit',
  props: {
    myChannel:
    { Type: Array },
    active: {
      type: Number,
      required: true
    },
    isChannelShow: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      isDelShow: false,
      allGetChannels: []

    }
  },
  created () { this.getAllChannelsAPI() },

  methods: {

    onTrigger () {
      this.isDelShow = !this.isDelShow
    },
    async getAllChannelsAPI () {
      const res = await getAllChannels()
      // this.allGetChannels = res.data.data.channels
      this.allGetChannels = res.channels
      // console.log(this.allGetChannels)
    },
    onDeleteItem (index) {
      this.$emit('deleteChannel', index)
    },

    onItemClick (index) {
      //  编辑按钮存在 不可以进行跳转
      if (this.isDelShow) return
      this.$emit('isChannelShow', this.isChannelShow)
      this.$emit('input', index)
    },
    // 将点击的哪一项添加进去
    addChannelItem (channel) {
      if (this.$store.state.token) {
        console.log('1')
      } else {
        // 未登录的状态
        this.$emit('addChannelItemFn', channel)
      }
    }
  },
  computed: {
    // 大数组-小数组
    // 计算属性
    getRecommendChannels () {
      const recomChannels = []
      this.allGetChannels.forEach((allItem) => {
        let isIn = false
        this.myChannel.forEach((myItem) => {
          if (allItem.name === myItem.name) {
            isIn = true
          }
        })
        if (!isIn) {
          recomChannels.push(allItem)
        }
      })
      return recomChannels
    }

  }
}
</script>

<style lang="less" scoped>
.channel-edit{
  padding:50px 0;
}
.title-text{
  font-size: 16px;
  color:#333;

}
.edit-btn{
  width: 52px;
  height: 24px;
  font-size:16px;
  color:#fabfba;
  border:1px solid #fabfba;
}
::v-deep .grid-item {
  position: relative;
  width: 80px;
  height: 43px;
  // background-color: #f4f5f6;

}
::v-deep .text{
font-size: 14px;

}
.active{
  color:red;
}
::v-deep .van-grid-item__content{

  background-color: #f4f5f6;
  .van-grid-item__text{
    color:#222;
  font-size: 14px;
  z-index:2;
  }
}
.recommend{
  padding-left: 10px;

}
.recommand-item{
  width: 23%;
  height: 46px;
  font-size: 14px;
   background-color: #f4f5f6;
  text-align: center;
  line-height:46px;
  display: inline-block;
   margin-right:2%;
   margin-top:8px;
    color:#222;

}
.my-close{
    position: absolute;
    top: -13px;
    right: -49px;
    z-index: 3;
    color:#222;
}

</style>
