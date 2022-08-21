//引入发送请求的API
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid---->生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: {},   //初始值是一个空对象
    //游客临时身份(需要带给服务器)
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的解构
        //加入购物车以后（发送请求），前台将参数带给服务器，服务器写入数据成功并返回code=200，代表这次操作成功，
        // 但是因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        //注意：async函数执行返回的结果一定是一个promise（要么成功，要么失败）
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // console.log(result)
        //代表加入购物车成功
        if (result.code === 200) {
            //成功，返回成功的标记
            return 'ok'
        } else {
            //失败，返回失败的标记
            return Promise.reject(new Error('faile'))
        }
    }
};
//简化数据
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //特殊情况：state.goodInfo初始状态是空对象，空对象的属性值categoryView是undefined，到时候在detail组件中undefined.category1Name就会报警告，所以至少传一个空对象，空对象.category1Name是undefined就不会警告
        return state.goodInfo.categoryView || {};
    },
    //产品信息简化的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性简化的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
}

//暴露出去
export default {
    //四个配置对象
    state,
    mutations,
    actions,
    getters,
}