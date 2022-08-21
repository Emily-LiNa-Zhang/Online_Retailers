//search模块的小仓库
import { reqGetSearchInfo } from '@/api'


//state：仓库存储数据的地方
const state = {
    //数据的初始类型时空数组还是空对象是由服务器的数据类型决定的
    searchList: {}
};
//mutaions:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
//actions：处理acion，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当前这个reqGetSearchInfo函数在调用的获取服务器数据的时候，至少传递一个空对象参数
        //prams形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//可以把我们竟来在组件中需要用到的数据简化一下（竟来在组件中使用就方便了）
const getters = {
    //当前形参state，当前仓库中的state并非大仓库中的那个state
    goodsList(state) {
        //如果服务器的数据回来了，没问题返回的是一个数组，但是加入网络不给力或者没有网络，应该返回的是undefined
        //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
};


//暴露出去
export default {
    //四个配置对象
    state,
    mutations,
    actions,
    getters,
}