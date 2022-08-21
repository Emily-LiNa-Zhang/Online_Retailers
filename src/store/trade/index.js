import { reqAderessInfo, reqOrderInfo } from "@/api";


const state = {
    address: [],
    orderInfo: {}
};
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORSERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
};
const actions = {
    //获取用户地址信息
    async getUserAdress({ commit }) {
        let result = await reqAderessInfo();
        // console.log(result)
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data)
        } else {

        }
    },
    //获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code === 200) {
            commit('GETORSERINFO', result.data)
        }
    }
};
//简化数据
const getters = {
}

//暴露出去
export default {
    //四个配置对象
    state,
    mutations,
    actions,
    getters,
}