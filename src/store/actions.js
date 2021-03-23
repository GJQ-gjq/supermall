//导入方法
import { ADD_COUNTER, ADD_TO_CART } from './mtation-types'
export default {

    // context是{state，commit},对象的结构
    // context的话就相当于state的父亲，上一级，包含着state中的所有属性
    // context:{state, rootState,commit,dispatch,getters }   
    // rootState,等同于store.$state,只存在模块中
    // state,等同于store.$state，若在模块中则为局部状态,
    // commit,等同于store.$commit
    addCart(context, payload) {
        let list = JSON.parse(localStorage.getItem("cartList")) || [];
        if (list) {
            state.cartList = list;
            // find返回的是item
            let oldProduct = state.cartList.find(item => {
                return item.id === data.id;
            });
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
            } else {
                payload.count = 1
                    // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)

            }
            //    payload新添加的商品
            // let oldProduct = null;

            // for (let item of context.state.cartList) {
            //     if (item.iid = payload.iid) {
            //         oldProduct = item;
            //     }
            // }
            // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
            // 2.判断oldProduct


            // }
            // 方法2：find方法,会把相同iid的item作为返回值给product
            //    let product = state.cartList.find(item => item.iid === payload.iid)
            //         if (product) {
            //             product.count += 1
            //         } else {
            //             payload.count = 1
            //             state.cartList.push(payload)
            //         }


        }

    }
}