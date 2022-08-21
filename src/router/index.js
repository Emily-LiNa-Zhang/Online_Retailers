//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

import routes from './routes'

//为了拿到token，引入store
import store from '@/store'

//先把VueRouter原型对象的push，先保存一份， 
let oringinPush = VueRouter.prototype.push
//先把VueRouter原型对象的replace，先保存一份， 
let oringinPlace = VueRouter.prototype.replace
//重写push|replace方法
//第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply，相同点：都可以调用函数一次，都可以篡改函数的上下文一次；不同点：call和apply传递参数时call用逗号隔开，apply执行时传递数组
        oringinPush.call(this, location, resolve, reject)  //篡改s上下文
    } else {
        oringinPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply，相同点：都可以调用函数一次，都可以篡改函数的上下文一次；不同点：call和apply传递参数时call用逗号隔开，apply执行时传递数组
        oringinReplace.call(this, location, resolve, reject)  //篡改s上下文
    } else {
        oringinReplace.call(this, location, () => { }, () => { })
    }
}


//配置路由
let router = new VueRouter({
    // export default new VueRouter({
    //配置路由
    routes,    //kv一致省略v
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})


//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到哪个路由
    //from：可以获取到你从哪个路由而来的信息
    //next：放行函数  next()放行   next(path)方形到指定路由  next(false)
    // next();
    // console.log(store);
    let token = store.state.user.token;
    //token另一种写法
    // let token = localStorage.getItem('TOKEN')
    //获取用户信息
    let name = store.state.user.userInfo.name;
    //如果用户已经登录了（有了token）
    if (token) {
        //如果用户已经登录了 还想去login或者register，不能去，留在home主页
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 登录了，但是去的不是login
            // 如果用户名已经有了
            if (name) {
                next();
            } else {
                //登陆了却没有用户信息，派发action让仓库存储用户信息再跳转（此处解决了需要在每一个组件中派发获取用户信息的action的问题）
                try {
                    // 在路由跳转之前获取用户信息
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    //token失效了，获取不到用户信息，重新登录
                    //重新登录之前需要清除token
                    store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //如果没有登陆：不能去交易相关（trade），支付相关（pay、paysuccess）、用户中心（center）相关
        //未登录如果要去上面的这些地方，只能去登录页
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            alert('请先登录');
            //把未登录时想去而没去成的信息，存储于地址栏中【路由】
            next('login?redirect=' + toPath)
        } else {
            //未登录取得不是上面的这些路由，放行
            next()
        }

    }


})

export default router