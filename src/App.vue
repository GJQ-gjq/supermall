<template>
  <div id="app">
    <!-- 由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。
          keep-alive就是用来解决这种场景 ,exclude的用法-->
    <keep-alive exclude="Detail">
<router-view></router-view>
    </keep-alive>
    
    <main-tab-bar/>
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
    
    MainTabBar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
