<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
     <scroll class="scroll-height" ref="scroll" @scroll="contentScroll" :probeType="3">
       <!-- 属性：topImages  传入值：top-images -->
       <ul>
         <li v-for="(item,index) in $store.state.cartList" :key="index">
           {{item}}
         </li>
       </ul>
       <div>{{$store.state.cartList.length}}</div>
        <detail-swiper :topImages="topImages"></detail-swiper>s
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref='params' :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref='comment' :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="list" :goods="recommend"></goods-list>
     </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
import DetailSwiper from './childComps/detailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import {debounce} from '../../common/utils'
import DetailBottomBar from './childComps/DetailBottomBar.vue';
export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo ,DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo,DetailCommentInfo, GoodsList, DetailBottomBar},
  name:'Detail',
  data(){
      return{
          iid:null,
          // 详情页顶部的轮播图
          topImages:[],
          // 商品整合的信息
          goods:{},
          // 店铺整合的信息
          shop:{},
          detailInfo:{},
          paramInfo:{},
          // 评论信息
          commentInfo:{},
          // 推荐信息
          recommend:[],
          // 数组
          themeTopYs:[],
          // 定义一个新的函数
          getThemeTopY:null



      }
  },
  created(){
    // 这里一定要注意是route,不是router
    //1.保存传入的iid 
      this.iid=this.$route.params.iid
      console.log(this.$route.params);
      // 2.根据iid请求详情数据，
      getDetail(this.iid).then(res=>{
         console.log(res);
        //  1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息,面向对象编程，拿到整合的数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
         // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
         // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      }) 
      //3. 请求推荐数据
      getRecommend().then(res=>{
        // 保存推荐数据
        this.recommend=res.data.list
      })
      // 4.给getThemtopY赋值
      // 利用防抖函数，防止多次调用
       this.getThemeTopY=debounce(()=>{
           this.themeTopYs=[]
           this.themeTopYs.push(0)
           this.themeTopYs.push(this.$refs.params.$el.offsetTop)
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(this.$refs.list.$el.offsetTop)
          //  console.log(this.themeTopYs);

       },100)

      },
  methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
      },
      titleClick(index){
        //  console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
         this.getThemeTopY()
      },
      // 监听滚动区域
      contentScroll(position){
        // 获取y值
        const positionY=-position.y
        // console.log(position);
      },
     addToCart(){
        // 获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.newPrice;
        product.iid=this.iid;
        console.log(product);
       //将商品添加到购物车
      //  向vuex里提交，改变state
      //  this.$store.commit('addCart',product)
      // 封装了actions后，直接dispatch
      this.$store.dispatch("addCart",product)

      }

    },
    mounted(){
      // 1.这里拿不到值，this.$refs.params.$el压根还没渲染
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // console.log(this.$refs.params.$el);
      // console.log(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
   
      //  this.$nextTick(()=>{
      //   //  2.这里拿不到值得原因：图片没有计算在内
      //   // dom是渲染出来了，都是图片没有加载完
      //     this.themeTopYs=[]
      //     this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //  })
    },
   

    // updated(){
    //   这里是可以拿到值的
    //   console.log("updated");
    //   this.themeTopYs=[]

    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.list.$el.offsetTop)
    //   //this.$refs.params.$el拿到的是组件里的根组件
    //   console.log(this.$refs.params.$el);
    //   // this.$refs.params.$el.offsetTop拿到的是距离顶部的距离
    //   console.log(this.$refs.params.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // }
}
</script>

<style>
#detail{
  /* 添加这3个样式覆盖下面的导航栏 */
  /* position: relative;
  z-index: 1;
  
  height: 200vh; */
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.scroll-height{
  position: absolute;
  top: 53px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}

/* .content{
  height: calc(100%-44px);
  overflow: hidden;
 
} */
</style>