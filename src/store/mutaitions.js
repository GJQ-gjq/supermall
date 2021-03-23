import { ADD_COUNTER, ADD_TO_CART } from './mtation-types'
export default {
    // mutations里的每个方法尽可能完成的事情比较单一点
    // mutations唯一的目的就是修改state的状态
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    },
}