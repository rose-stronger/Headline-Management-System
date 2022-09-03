<template>

  <div>
     <van-cell>
      <div class="box1">
        <div class="left">
        <span>历史记录</span>
      </div>
      <div class="right">

          <div

          v-show="isDelShow===true">
              <span @click="delAllFn">全部删除</span>
              <span  @click="isDelShow=false">完成</span>
          </div>
          <div
          @click="isDelShow=true"
          >
              <van-icon v-show="!isDelShow" name="delete-o" />
            </div>

      </div>
      </div>
     </van-cell>
     <van-cell  >
          <div class="main"

          v-for="(item,index) in $store.state.historyArr" :key="index">
              <span>
              {{item}}
              </span>
              <span>
                <van-icon v-if="isDelShow"   @click="$store.commit('delFn', index)" name="close" />
              </span>
          </div>
     </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    historyValue: String

  },
  data () {
    return {
      isDelShow: false
    }
  },
  methods: {

    // delFn(index){
    //  this.$store.commit('delFn', index)
    // },
    delAllFn () {
      this.$store.commit('delAllFn')
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
