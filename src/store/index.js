import Vue from "vue";
// 导入
import Vuex from 'vuex'
import mutations from './mutaitions'
import actions from "./actions"
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)
    // 2.创建Store对象
const state = {
    cartList: []
};
export default new Vuex.Store({
        // 官方建议吧这几个分别建一个文件
        state,
        mutations,
        // 异步操作和判断逻辑放到actions里
        actions,
        getters,


    })
    // 3.挂载到Vue实例上