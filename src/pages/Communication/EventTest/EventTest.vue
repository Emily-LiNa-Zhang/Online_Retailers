<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM绑定系统事件 -->
    <pre @click="handler" ref="pre">原生DOM绑定原生事件</pre>
    <!-- Event1组件（Event并不是原生DOM，@click就不是原生事件了而是自定义事件，加上.native就可以把自定义事件变成原生DOM事件）；原理：是给子组件的根节点绑定了点击事件，利用到了事件委派 -->
    <Event1 @click.native="handler1"></Event1>
    <hr />
    <!-- 原生DOM绑定自定义事件，没有任何意义，因为没有办法触发$emit函数 -->
    <pre @memeda="handler2">
       原生DOM绑定自定义事件
    </pre>
    <!-- 组件标签 -->
    <Event2 @click="handler3" @xxx="handler4"></Event2>
    <hr />
    <!-- 自定义事件 -->
    <el-button @click="ceshi" type="success">我是按钮</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
  name: "EventTest",

  components: {
    Event1,
    Event2,
  },

  methods: {
    //点击事件的回调
    //原生DOM，pre的点击事件回调
    handler(e) {
      this.$refs.pre.style.color = "red";
      console.log("我是原生DOM事件", e);
    },
    //Event组件的事件回调
    handler1() {
      console.log("event1事件回调测试");
    },
    // 原生DOM绑定自定义事件
    handler2() {},
    // Event2自定义事件click的回调
    handler3(params) {
      console.log(params);
    },
    // Event2自定义事件xxx的回调
    handler4(params) {
      console.log(params);
    },
    ceshi(e) {
      console.log(e);
    },
  },
};
</script>
