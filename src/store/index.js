import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//引入小仓库到大仓库
import search from './search'
import home from './home'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块化开发存储数据
    modules: {
        search,
        home,
        detail,
        shopcart,
        user,
        trade
    }
})