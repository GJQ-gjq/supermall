import Vue from 'vue'
import VueRouter from 'vue-router'
// 通过懒加载的方式导入各个路由组件
const Home = () =>
    import ('../views/home/Home')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Category = () =>
    import ('../views/category/Category')
const Detail = () =>
    import ('../views/detail/Detail')
    //1.安装插件
Vue.use(VueRouter)
    //2、创建路由对象,把里面的routes提取出来
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new VueRouter({
        routes,
        mode: 'history'

    })
    // 3、导出router
export default router