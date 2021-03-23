<template>
  <div class="tab-control">
      <!-- key="item.index"一定要加 -->
     <div class="tab-control-item" v-for="(item,index) in titles" :key="item.index"
      :class="{active:index===currentIndex}" @click="itemClick(index)">
        <span>{{item}}</span>
     </div>
  </div>
</template>

<script>
export default {
   name:"TabControl",
   props:{
       titles:{
           type:Array,
           default(){
               return []
           }
       }
   },
   data(){
       return {
           currentIndex:0
       }
   },
   methods:{
    //    需要注意的是上面点击事件一定要传入index，这里一定娿接收index
       itemClick(index){
        //当我点击哪一个的时候就把index复制给currentindex，从而动态给class，点击哪个哪个就变为红色
           this.currentIndex=index;
          //  这里是子向父传信息，内部传向外，告诉home点击了哪一个tab
           this.$emit('tabClick',index)
       }
   }
}
</script>

<style>
 /* .tab-control {
     display: flex;
     text-align: center;
     font-size:15px;

 }
 .tab-control-item {
     flex:1;
     height: 40px;
     line-height: 40px;
 }
 .tab-control-item span {
    padding: 10px;
  }
  .active {
     color:pink 
  } */
   .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: pink;
  }

  .tab-control-item.active span {
    border-bottom: 2px solid pink;
  }
</style>