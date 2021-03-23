import axios from 'axios'
export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
            baseURL: "http://152.136.185.210:7878/api/m5",
            timeout: 5000

        })
        // 2、axios的拦截器
        // 2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
            return config

        }, err => {

        })
        // 2.2响应拦截
    instance.interceptors.response.use(res => {
            return res.data
        }, err => {
            console.log(err);
        })
        // 3、发送真正的网络请求
    return instance(config)

    // return instance(config)这个函数看源码其实可以发现，它返回的其实是一个promise，就相当于return promise

}