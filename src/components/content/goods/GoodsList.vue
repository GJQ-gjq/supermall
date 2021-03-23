<template>
  <div class="goods">
      <!-- 这里获得从home里传入的goods数组后，再把数组里面的一个个对象传给子组件goodlistitem -->
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name:"GoodList",
  components: { GoodsListItem },
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  }
 
}
</script>

<style>
.goods {
    display: flex;
    /* 弹性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行 */
    flex-wrap: wrap;
    /* 位于各行之前、之间、之后都留有空白的容器*/
    justify-content: space-around;

    padding: 2px;
  }

</style>