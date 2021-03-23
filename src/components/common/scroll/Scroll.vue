<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
   name:"Scroll",
   props:{
     probeType:{
         type:Number,
         default:0

     },
      pullUpLoad:{
         type:Boolean,
         default:true
     }
   },
   data(){
       return{
           scroll:null
       }
   },
   mounted(){
    //    1.创建BetterScroll对象
       this.scroll=new BetterScroll(this.$refs.wrapper,{
        //    这里一定要设置click为true,否则就监听不了click事件
           click:true,
           probeType:this.probeType,
            pullUpLoad:this. pullUpLoad
       })
    //    2、监听滚动区域
       this.scroll.on("scroll",(position)=>{
            //  console.log(position);
            // 这里要把position传到父组件home里，然后控制返回顶部的小图标是否显示
            this.$emit("scroll",position)
       })
    //    3、监听上拉事件，
       this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        
      })
   },
   methods:{
    //    这里封装的是backtop监听的方法，回到顶部
       scrollTo(x,y,time=300){
           this.scroll.scrollTo(x,y,time)
       },
       finishPullUp(){
           this.scroll.finishPullUp()
       }
       
   }
}
</script>

<style scoped>

</style>

