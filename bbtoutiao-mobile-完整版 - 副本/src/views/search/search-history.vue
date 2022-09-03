<template>

  <div>
     <van-cell>
      <div class="box1">
        <div class="left">
        <span>历史记录</span>
      </div>
      <div class="right">

          <div

          v-if="isDelShow===true">
              <span @click="delAll">全部删除</span>
              <span  @click="isDelShow=false">完成</span>
          </div>
          <div v-else
          @click="isDelShow=true"
          >
              <van-icon name="delete-o" />
            </div>

      </div>
      </div>
     </van-cell>
     <van-cell  >
          <div class="main"

          v-for="(item,index) in hisArr" :key="index">
              <span @click="jumpFn(item)">
              {{item}}
              </span>
              <span>
                <van-icon v-if="isDelShow"   @click="delFn(index)" name="close" />
              </span>
          </div>
     </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    historyValue: String,
    hisArr: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false
    }
  },
  methods: {
    Fn (historyValue) {
      this.$emit('showFn', historyValue)
    },
    delFn (index) {
      return this.hisArr.splice(index, 1)
    },
    delAll () {
      this.$emit('delAllFn')
    },
    jumpFn (item) {

    }
  }
}
</script>

<style lang="less" scoped>
.box1{
  display:flex;
  justify-content: space-between;
  color:#ccc;
}
.right span:nth-child(1){
      margin-right: 10px;
}
.right .van-icon{
      margin-left: 20px;
}
.right .active{
  display: none;
}
.main {
  display:flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
  border-left:1px solid #ccc;
  border-right:1px solid #ccc;
}
</style>
