<template>
  <div >
      <nav-bar class="nav-bar">
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>  
        <div slot="center" class="title">
           <div v-for="(item,index) in titles" :key="index" class="title-item"
                :class="{active:index===currentIndex}" @click="titleClick(index)">
             {{item}}
           </div>
        </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: {NavBar},
   name:"DetailNavBar",
   data(){
       return {
           titles:['商品','参数','评论','推荐'],
           currentIndex:0,
       }
   },
   methods:{
     backClick(){
       this.$router.back()
     },
     titleClick(index){
       this.currentIndex=index;
      //  把信息传出去
       this.$emit('titleClick',index);
       
     }
   }
   
}
</script>

<style>
.nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: aqua;
}
.left img{
  margin-top: 12px;
}
</style>