<template>
  <div class="box">
    
    <p>{{data.title}}</p>
    <div class="second_box">
      <span>{{ data.aut_name }}</span>
      <span>{{ data.comm_count}}</span>
      <span>{{ data.pubdate | relativeDate}}</span>
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
}
.box p{

  font-size:18px;
}
.second_box{
  display:flex;
  justify-content: space-between;
  font-size: 12px;
  color:#ccc;
  padding-bottom: 10px;
  }

</style>
