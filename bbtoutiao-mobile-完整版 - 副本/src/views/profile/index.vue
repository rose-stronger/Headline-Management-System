<template>
  <div>
    <div class="container">
      <!-- 未登录 -->
      <div
      v-if="!$store.state.token"
      class="unlogin"
       @click="jumpLogin('/login')">
        <img src="~@/assets/images/mobile.png" alt="">
        <div >登录</div>
      </div>
      <!-- 已登录 -->
      <div v-else class="login-box" >
         <div class="left">
          <img :src="$store.state.userInfo.photo" alt="">
          <span style="margin-left:10px;color:white;font-size:18px">{{$store.state.userInfo.name}}</span>
         </div>
        <div class="right">
           <div class="edit" @click="$router.push('/edit/profile')">编辑资料</div>
        </div>
      </div>
      <!-- 退出登录按钮 -->
      <div style="margin: 16px">
     <van-button v-if="$store.state.token" @click=logOut  type="danger" size="large">
      退出登录
    </van-button>
      </div>

    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'profileVue',
  methods: {
    jumpLogin () {
      this.$router.push('/login')
    },
    logOut () {
      Dialog.confirm({
        title: '退出登录',
        message:
    '确认退出吗？'
      })
        .then(() => {
          // 确认状态下 token为空
          this.$store.commit('setToken', '')
        })
        .catch(() => {
          // on cancel
        })
    }

  }

}
</script>

<style lang="less" scoped>
.container{
  .unlogin{
    background-image: url("~@/assets/images/banner.png");
    height: 188px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    img{
      height: 58px;
      margin-bottom: 10px;
    }
  }
  .login-box{
    padding: 0 10px 0;
    background-image: url("~@/assets/images/banner.png");
    height: 188px;
    display: flex;
    justify-content: space-between;

    align-items: center;
    .left{
     display: flex;

     align-items: center;
      img{
            width: 58px;
            height: 60px;
            //  align-items: center;
            border-radius: 50%;
          }
    }
    .right{
      .edit{
        width: 60px;
        height: 24px;
        border-radius: 10%;
        background-color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;

      }
    }

}
}

</style>
