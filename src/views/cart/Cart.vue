<template>
  <div class="cart">
    <!-- 购物车 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车（
        <span>{{cartLength}}</span>
        ）
      </div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部的汇总 -->
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { mapGetters } from "vuex";
import CartList from './childComps/CartList.vue';

export default {
  components: { NavBar, CartList },
  name:'Cart',
  //计算属性
  computed:{
    // ...mapGetters(['cartLength'])
    // 对象写法可以自己命名
      ...mapGetters({
          cartLength: "cartLength",
          // cartList
          
      })
     
      // console.log("---------");
      // console.log(this.$store);
      // console.log(this.$store.state);
      // return this.$store.state.cartList.length
    
  }
}
</script>

<style>
.nav-bar{
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
</style>