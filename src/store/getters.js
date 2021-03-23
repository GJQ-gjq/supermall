export default {
    // Getter 接受 state 作为其第一个参数：
    cartLength(state, getters) {
        return state.cartList.length
    },
    cartList(state) {
        return state.cartList
    }
}