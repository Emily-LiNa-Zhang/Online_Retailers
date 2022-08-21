//Vue插件一定暴露一个对象

import Vue from "vue";

// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
let myPlugins = {}

myPlugins.install = function (vue, options) {
    //Vue.prototype.$bus：任何组件都可以使用
    //Vue.directive：全局指令
    //Vue.componengt：全局组件
    //Vue.filter：过滤器 
    // 第一个参数输出:
    // ƒ Vue(options) {
    //     if ( true && !(this instanceof Vue)) {
    //       warn('Vue is a constructor and should be called with the `new` keyword');
    //     }

    //     this._init(options);
    //   }
    // 第二个参数输出：{name: 'option'}
    Vue.directive(options.name, (element, params) => {
        // console.log(element);  //输出的是被执行的元素
        // console.log(params);  //输出的是一个对象
        //{name: 'upper', rawName: 'v-upper', value: 'abc', expression: 'msg', modifiers: {…}, …}
        // def: {bind: ƒ, update: ƒ}
        // expression: "msg"
        // modifiers: {}
        // name: "upper"
        // oldArg: undefined
        // oldValue: "abc"
        // rawName: "v-upper"
        // value: "abc"
        // [[Prototype]]: Object
        element.innerHTML = params.value.toUpperCase()
    })

}

export default myPlugins;