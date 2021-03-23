import { request } from "./request";
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 这里因为home/data后面必须要跟参数，所以一定要传入type和page
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page,
        }
    })
}

// return request({
//     url: '/home/multidata'
// }) 这里实际上是返回一个promise，所以在home.vue里调用这个大的函数后面可以跟then函数
// request里面所有的数据都作为参数config，直接传给request.js