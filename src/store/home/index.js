//引入发送请求的API
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

//home模块的小仓库
//state：仓库存储数据的地方
const state = {
    //state中数据默认值别瞎写，服务器返回对象就写对象，服务器返回数组就写数组，根据接口返回值进行初始化。
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor的数据
    floorList: []
};
//mutaions:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
//actions：处理acion，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //通过API里面的接口函数，向服务器发送请求，获取服务器的数据
    async categoryList({ commit }) {   //{commit}是解构赋值的结果
        let result = await reqCategoryList();  //拿到成功的结果
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code === 200) {
            //提交motation
            commit('GETFLOORLIST', result.data)
        }
    }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

//暴露出去
export default {
    //四个配置对象
    state,
    mutations,
    actions,
    getters,
}