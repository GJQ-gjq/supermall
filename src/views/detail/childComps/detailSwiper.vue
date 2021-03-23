<template>
  <div>
    <swiper>
          <swiper-item  class="detail-swiper" v-for="(item,index) in topImages" :key="index">
             <img :src="item" alt=""> 
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
// import {Swiper,SwiperItem} from 'components/common/index.js'
import Swiper from '../../../components/common/swiper/Swiper.vue'
import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'
export default {
  components: { Swiper,SwiperItem },
  name:'detailSwiper',
  props:{
    topImages:{
         type:Array,
         default(){
             return []
         }
    }
  }
}
</script>

<style>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>