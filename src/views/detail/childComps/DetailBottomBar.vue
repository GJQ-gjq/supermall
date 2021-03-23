<template>
  <div class="bottom-bar">
     <div class="bar-tiem bar-left">
         <div>
             <i class="icon service"></i>
             <span class="text">客服</span>
         </div>
          <div>
             <i class="icon shop"></i>
             <span class="text">店铺</span>
         </div>
          <div>
             <i class="icon select"></i>
             <span class="text">收藏</span>
         </div>
     </div>
      <div class="bar-item bar-right">
             <div class="cart" @click="addToCart">加入购物车</div>
             <div class="buy">购买</div>
         </div>
  </div>
</template>

<script>
export default {
  name:"DetailBottomBar",

  methods:{
      addToCart(){
         
        //   向外部发送消息
          this.$emit("addToCart")
      }
  }

}
</script>

<style>
.bottom-bar{
    height: 49px;
    background-color:burlywood;
    position: relative;
    bottom: -415px;
    z-index: 1; 
    display: flex;
    text-align: center;
    /* line-height: 49px; */

}
.bar-tiem{
    display: flex;
    flex: 1;
}
.bar-tiem>div{
    flex: 1;
}
.bar-left{
    line-height: 49px;
}
.buy{
    padding-bottom: 0px;
}


</style>