//引入发送请求的API
//登录与注册的模块

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    // 此处设置state中的初始值就直接从本地存储里拿，如果本地存储没有就是undefined，但是只要本地存储有了，再刷新也刷新不调了
    token: getToken(),
    userInfo: {}
};
const mutations = {
    //获取验证码
    GETCODE(state, code) {
        state.code = code
    },
    //获取token
    USERLOGIN(state, token) {
        state.token = token
    },
    //获取用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //退出登录，清除本地数据
    ClEAR(state) {
        //把仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储信息清空
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        console.log(result);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

    //用户登录业务【token】
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token，用户唯一标识符（uuid）
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code === 200) {
            //用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data);
            return 'ok'
        } else {
            // 注意这里没有登陆就会报错，是正常的
            return Promise.reject(new Error('fail'));
        }
    },

    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        //action里面不能操作state，提交mutation修改state
        if (result.code === 200) {
            commit('ClEAR');
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
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