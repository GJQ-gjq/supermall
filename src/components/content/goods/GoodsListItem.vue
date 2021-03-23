<template>
<!-- 这里封装的是一个个小的商品模板 -->
  <div class="goods-item" @click="itemClick">
    <!--这里的src用的是计算属性 -->
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
   name:"GoodListItem",
   props:{
       goodsItem:{
           type:Object,
           default(){
               return {}
           }
       }
   },
  //  计算属性
  computed:{
     showImage(){
      //  这里判断显示哪个，逻辑或，主要是为了后面组件复用时正确性更高
       return this.goodsItem.image||this.goodsItem.show.img
     }
  },
   methods:{
     imageLoad(){
      if(this.$route.path.indexOf('/home')){
         this.$bus.$emit('itemImageLoad')
      }else if(this.$route.path.indexOf('/detail')){
        this.$bus.$emit('detailImageLoad')
      }
     },
     itemClick(){
      //  console.log('taiozhuan');
      // 路由跳转到详情页，各种路由跳转方式可以多看看
      // 动态路由传递信息到另一个页面
      this.$router.push('/detail/'+this.goodsItem.iid)
     }
   }

}
</script>

<style>
 .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /* 超过的文字都会变成... */
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: red;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>