<template>
  <div class="box">
   <div class="left">
     <p>{{data.title}}</p>
    <div class="second_box">
      <span>{{ data.aut_name }}</span>
      <span>{{ data.comm_count}}</span>
      <span>{{ data.pubdate| relativeDate}}</span>
    </div>

   </div>
    <div class="right">
      <img :src="data.cover.images[0]" alt="">
    </div>

  </div>
</template>

<script>
export default {
props: {
  data:{
    type:Object
  }
}
}
</script>

<style lang="less" scoped>
.box{
  margin:5px 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  /* flex:50%; */
  justify-content: space-between;
  /* flex-direction:row; */


}
.box p{

  font-size:18px;
}
.left{
  display: flex;
  flex-direction: column;

  justify-content: space-between;
}
.second_box{
  display:flex;

  /* flex-direction: row; */
  justify-content: space-between;
  font-size: 12px;
  color:#ccc;
  padding-bottom: 10px;
  padding-right: 10px;
   span {
      margin-right: 16px;
    }


  }


  .right img{
    width: 120px;
    height: 100px;
  }

</style>
