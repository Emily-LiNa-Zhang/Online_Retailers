// 入口文件
import Vue from 'vue'
import App from './App.vue'
//定义全局组件，在入口文件注册一次之后，在任何组件当中都可以使用
//三级联动组件--全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagenation from './components/Pagenation'
import { Button, MessageBox } from 'element-ui'
//注册为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)
//1、elementui注册全局组件
Vue.component(Button.name, Button)
//2、Element组件注册的时候，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入MockServer.js---mock模拟数据（执行一次，而不需整个引入）
import '@/mock/mockServe'
//引入swiper样式（引入样式不用import a from b）(因为轮播图在三个组件中都要用，就直接在入口文件中引入)
import 'swiper/css/swiper.css'

// //测试
// import { reqCategoryList } from './api'
// //调用函数
// reqCategoryList()

Vue.config.productionTip = false

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
//此时的API是一个对象，里面包含api中所有的请求方法



//引入图片
import atm from '@/assets/1.gif'
//引入图片懒加载插件vue-lazyload
import VueLazyload from 'vue-lazyload'
//注册插件（Vue.use一调用实质上就是调用了插件的install方法）
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: atm
})


//引入自定义插件（先引入再调用）
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins, { name: 'upper' })  //只要一use就会调用install方法


//引入表单校验插件(不需要对外暴露，只需要里面的程序执行就可)
import '@/plugins/validate'



new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;   //this就是大写的vm
    Vue.prototype.$API = API   //所有请求接口都挂到了原型对象身上，这样就不用在每个组件身上引入api了
  },
  //注册路由(底下的写法是kv一致，且router是小写的)
  //注册路由信息:当这里书写router的时候,组件身上拥有$route,$router属性
  router,
  //注册仓库，组件实例对象的身上就会多一个属性$store
  store
}).$mount('#app')
