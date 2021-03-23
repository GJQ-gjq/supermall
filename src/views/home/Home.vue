<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 这里home是父组件，向其子组件里分别传信息，把banner和recommend传过去 -->
    
     
     <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
       <home-swiper :banner="banner"></home-swiper>
       <recommend-view :recommend="recommend"></recommend-view>
     <feature-view></feature-view>
     <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
     <goods-list :goods="showGoods"></goods-list>
     <!-- <goods-list :goods="goods['pop'].list></goods-list> -->
     </scroll>
     <!-- native-监听组件根元素的原生事件 -->
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>  

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import FeatureView from './childComps/FeatureView.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
// 只有是default导出才能把大括号删掉
import {getHomeMultidata,getHomeGoods} from '../../network/home'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'
import {debounce} from 'common/utils'


// import Swiper from '../../components/common/swiper/Swiper.vue'
// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'

export default {
  name:'Home',
  components:{
    NavBar,
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
   return{
      // result:null,
      banner:[],
      recommend:[],
      //goods本身是一个对象，里面有三个key,然后三个key也是三个对象，分别存储对应的数据
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      } ,

      currentType:'pop',
      isShowBackTop:false,
   }
  },
  computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
  },
  // 组件创建好之后就可以发送网络请求了,可以用生命周期函数created
  created(){
    //1.请求多个数据,一定要加this，指明用的是methods里面的方法，否则用的是上面大括号里面传入的方法

    this.getHomeMultidata()
    // 2.请求商品数据，封装函数，可以多次利用
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  },
  // 这里把方法都封装到methods里，然后在created里用
  methods:{
    //事件监听相关的方法
    tabClick(index){
      // console.log(index); 
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
    },
    // 下面是网络请求相关的 方法
     getHomeMultidata(){
        //1.请求多个数据
     getHomeMultidata().then(res=>{
      //  console.log(res);
      // 在函数结束之前把结果给这个组件的result，在函数结束之后res这个变量就会被回收，但是result依然指向请求回来的数据
      //  this.result=res;这里可以把res具体打印出来，然后再看要取什么数据
       
      this.banner=res.data.banner.list;
      this.recommend=res.data.recommend.list;
     })
     },
     // 2.请求商品数据
     getHomeGoods(type){
      //这里注意不要把页码写死
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          // 获取到一页数据，push到空数组里
          // ...是一种语法，把获取到的数组里面的数据依次解析加入新的数组
          this.goods[type].list.push(...res.data.list);
          // 上一次的数据加入之后，要把页码加一，确保下次传入的是新的下一页
          this.goods[type].page+=1;
      
      // console.log(res);
          this.$refs.scroll.finishPullUp()

    })
     },
     backClick(){
      //  this.$refs.scroll拿到了上面设置ref="scroll"的scroll组件，然后直接使用组件里的方法scrollTo
       this.$refs.scroll.scrollTo(0,0)
      //  console.log(this.$refs.scroll);
     },
     contentScroll(position){
        this.isShowBackTop=(-position.y)>1000;
     },
     loadMore(){
      //  console.log("上拉加载更多");
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
     }

  }
    
  
}
</script>

<style scoped>
.wrapper{
  height: 100%;
  bottom: 50px;
}
#home{
  padding-top: 0px;
  height: 130vh;
  position:relative;
}
.home-nav{
  background-color: #ff8097;
  color:white;
  position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

}
.tab-control {
  position:sticky;
  /* 往下拉的时候，保持与顶部的距离为44px ,就是到达固定位置就粘住*/
  top:44px;
  /* 往上拉的时候不会出现流行、新款、精选被覆盖 ，这里可以具体查一下怎么用*/
  z-index:1;
}
.content{
  position: absolute;
  /* overflow: hidden; */
  /* height: 1000px; */
  top:85px;
  bottom:80px;
  left: 0;
  right: 0;

}
</style>