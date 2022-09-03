<template>
  <div>
    <van-nav-bar
      title="编辑资料"

      left-arrow
      @click-left="onClickLeft"

    />
    <van-cell-group>
      <van-cell title="头像" is-link  @click="onAvatarClick" >
        <img class="avatar" :src="$store.state.userInfo.photo" alt="">

      </van-cell>
      <!-- 文件选择的表单域 隐藏 通过点击头像 获取ref 触发表单域 -->
       <input ref="fileSelectRef" type="file" v-show="false" @change="onImgChange">

      <van-cell title="昵称" is-link :value="$store.state.userInfo.name" @click="isShowNamePop=true"/>
      <van-cell title="性别" is-link :value="$store.getters.gender" @click="isShowGenderPop=true"/>
      <van-cell title="生日" is-link :value="$store.state.userInfo.birthday" @click="isShowBirthdayPop=true"/>
    </van-cell-group>
    <editNameVue v-model="isShowNamePop"></editNameVue>
    <editGenderVue v-model="isShowGenderPop " ></editGenderVue>
    <editBirthdayVue v-model="isShowBirthdayPop"></editBirthdayVue>

 <!-- 修改头像 -->
    <van-popup
      v-model="isShowAvatar"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="edit-avatar-box">
        <img
        id="image"
          v-if="isShowAvatar"
          ref="selectAvatarRef"
          :src="selectImgUrl"
          alt=""
        />

        <div>
          <span @click="onCancelAvatar">取消</span>
          <span @click="onConfirmAvatar">完成</span>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import editNameVue from './editName.vue'
import editGenderVue from './editGender.vue'
import editBirthdayVue from './editBirthday.vue'
import { editUserPhoto } from '@/api/user'

export default {

  name: 'editVue',
  components: {
    editNameVue,
    editGenderVue,
    editBirthdayVue

  },
  data () {
    return {
      isShowNamePop: false,
      isShowGenderPop: false,
      isShowBirthdayPop: false,
      isShowAvatar: false,
      selectImgUrl: '',
      cropper: null

    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onAvatarClick () {
      // console.log(this.$refs.fileSelectRef)
      // 拿到文件隐藏域 触发他的点击事件
      const fileSelectRef = this.$refs.fileSelectRef
      fileSelectRef.click()
    },
    // 展示弹层
    onImgChange () {
      // 选择文件 拿到第一个选择的图片
      const files = this.$refs.fileSelectRef.files
      const SelectFile = files[0]
      console.log(SelectFile)
      // 将获取的值赋给img src
      this.selectImgUrl = URL.createObjectURL(SelectFile)
      this.isShowAvatar = true
      this.initCropper()
    },
    initCropper () {
      this.$nextTick(() => {
        // this.$refs.selectAvatarRef
        const image = document.getElementById('image')
        this.cropper = new Cropper(image, {
          viewMode: 1, // 只能在裁剪的图片范围内移动
          dragMode: 'move', // 画布和图片都可以移动
          aspectRatio: 1, // 裁剪区默认正方形
          autoCropArea: 0.7, // 自动调整裁剪图片
          cropBoxMovable: false, // 禁止裁剪区移动
          cropBoxResizable: false, // 禁止裁剪区缩放
          background: false, // 关闭默认背景

          crop (event) {
            console.log(event.detail.x)
            console.log(event.detail.y)
            console.log(event.detail.width)
            console.log(event.detail.height)
            console.log(event.detail.rotate)
            console.log(event.detail.scaleX)
            console.log(event.detail.scaleY)
          }
        })
      })
    },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },
    onCancelAvatar () {
      this.isShowAvatar = false
    },
    async onConfirmAvatar () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      const file = await this.getCroppedCanvas()
      // 如果要求 Content-Type 是 multipart/form-data,则一定要提交FormData 数据对象，专门用于文件上传的，不能提交{}
      const fd = new FormData()
      fd.append('photo', file)
      await editUserPhoto(fd).catch(err => err)

      this.$toast.success('修改成功')
      this.$store.dispatch('profile')
      this.onCancelAvatar()
    }
  }

}
</script>

<style lang="less" scoped>
.avatar{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.edit-avatar-box{
    width: 100vw;
    // height: 100vh;
  img{
    width: 100%;
    margin-top:35%

  }
  div{
    display:flex;
    justify-content: space-between;
    width: 100%;
    margin-top:10%;
    padding-left: 20px;
   span:nth-child(2){
    padding-left:0;
padding-right:40px
   }
  }
}
</style>
