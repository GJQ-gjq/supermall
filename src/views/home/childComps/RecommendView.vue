<template>
  <div class="recommend">
      <div v-for="item in recommend" :key="item.index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"RecommendView",
    // 父传子用props,props写在子组件里用来接收父组件传过来的信息，然后再在子组件的模板里显示
    // 父与子步骤：1、父组件里使用子组件 2、父组件把信息传过来 3、子组件用props接收 4、在子组件的模板里显示
    props:{
       recommend:{
           type:Array,//1、类型限制，传过来的必须是数组
        
           default(){  //2、提供一些默认值
               return []
           },
        //required:true,3、要求必须传入这个，不传就报错

       }
    }

}
</script>

<style >
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    /* padding: 10px 0 20px; */
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>