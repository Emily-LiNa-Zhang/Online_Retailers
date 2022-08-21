//引入发送请求的API
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    //删除购物车某产品数据
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    //修改购物车某一产品选中的状态
    async updateChekedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        // clg快捷键
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    //删除全部选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // deleteAllCheckedCart(context){
        //context：小仓库，commit【提交mutations修改state】、getters【计算属性】、dispatch【派发action】、state【当前仓库数据】
        // console.log(context)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            // console.log(promise);
            //将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        //只要全部的p1|p2....都成功，返回的结果即为成功，如果有一个是啊比，返回结果即为失败
        return Promise.all(PromiseAll);
    },

    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        console.log(state);
        console.log(isChecked);
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateChekedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }


};
//简化数据
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

//暴露出去
export default {
    //四个配置对象
    state,
    mutations,
    actions,
    getters,
}