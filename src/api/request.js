//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
// nprogress是一个对象，start方法代表进度条开始，done方法代表进度条结束
//引入进度条样式
import 'nprogress/nprogress.css'

//在当前模块中引入store
import store from '@/store'

//1、利用aioxs对象的方法create，创建一个axios实例
//2、request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求额时候，路径当中经常会出现api
    baseURL: '/api',
    //超时时间设置5s
    timeout: 5000,
});

//请求拦截器：再发送请求之前，请求拦截器可以检测到，可以在请求发出去之前，做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象，对象里有一个属性很重要，headers请求头
    //发送请求的时候，把用户随机生成的临时身份通过请求头传递过去
    // console.log(store);
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段（）：和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
    };
    //需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    };
    nprogress.start();  //当发起请求，被请求拦截器捕获到，进度条开始动
    return config
});

//响应拦截器：
requests.interceptors.response.use((res) => {
    //成功之后的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();  //当请求完成，响应回来，被响应拦截器捕获，进度条结束
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('failed'))
})

//对外暴露
export default requests