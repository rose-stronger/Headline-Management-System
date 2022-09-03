<template>
  <div class="box">
    <p>{{data.title}}</p>
    <div class="middle">

       <img
        v-for="(item, index) in data.cover.images"
        :key="index"
        :src="item"
        alt=""
        srcset=""
      />
    </div>
    <div class="second_box">
       <span>{{ data.aut_name }}</span>
      <span>{{ data.comm_count}}</span>
      <span>{{ data.pubdate | relativeDate }}</span>
    </div>

  </div>
</template>

<script>
export default {
 name: 'ArticleItem1',
  props:{
  data:{
    type:Object
  }
  }
}
</script>

<style scoped>
.box{
  margin:5px 20px;
  border-bottom: 1px solid #ccc;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
}
.box p{

  font-size:18px;
}
.second_box{
  display:flex;
  justify-content: space-between;
  font-size: 12px;
  color:#ccc;
  margin-top:10px;
  padding-bottom: 10px;
  }
  .middle{
      display:flex;
    }

  .middle img{
    margin-right: 1px;
    width: 120px;
    height: 100px;
  }

</style>
