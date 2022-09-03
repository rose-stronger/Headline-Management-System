<template>
  <div>
    <div class="container">
        <van-nav-bar title="登录"  left-arrow>
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>
  </div>
  <div class="main">
    <van-form @submit="onSubmit" ref="formRef">
      <van-cell-group>
       <van-field
       v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
         :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}/, message: '手机号格式错误' }
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        clearable
        name='code'
        placeholder="请输入验证码"
        :rules="[{required:true,message:'请输入验证码'}]"
      >
      <template #left-icon>
        <i class="toutiao toutiao-yanzhengma"></i>
      </template>
      <!-- @click="onValidate"
        @sendCode="onSendCode" -->
      <template #button>
        <codeBtn
        v-model="codeLoading"
         @click="onValidate"
         @sendCode="onSendCode"

        ></codeBtn>
      </template>

      </van-field>
      <div style="margin:16px">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-cell-group>
    </van-form>
  </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { findMobile } from '@/api/login'
import codeBtn from '@/code-btn/index.vue'
export default {
  components: {
    codeBtn
  },
  name: 'loginVue',
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      // codeLoading=mobile 相当于子组件的props的value
      codeLoading: false,
      pattern: /^1[3|4|5|7|8][0-9]{9}$/
    }
  },
  created () {
    // this.loginAPI()
  },
  methods: {
    async onSubmit () {
      // 刚开始加载 显示轻提示
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      console.log('登录相关操作')
      // token 会被多次使用 -放到veux中 登录的行为进行封装
      await this.$store.dispatch('login', {
        mobile: this.mobile,
        code: this.code
      })
      // 同步先执行  所以加一个 async await
      console.log('22222同步操作')
      // 加载成功了  进行显示轻提示
      Toast.success('跳转成功')
      // 跳转我的
      this.$router.push('/profile')
    },

    // 发送验证码
    onSendCode () {
      findMobile(this.mobile)
      console.log('发送验证码')
    },
    // 点击进行表单校验
    onValidate () {
      this.$refs.formRef.validate('mobile').then(() => {
        console.log('成功')
        this.codeLoading = true
      }).catch((err) => {
        console.log('验证失败' + err)
      })
    }

  }

}
</script>

<style>

</style>
