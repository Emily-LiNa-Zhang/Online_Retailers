<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <hr />
    <h2>v-model底层实现原理</h2>
    <!-- :value="msg1"数据的单向绑定。
    原生DOM当中有oninput事件，他经常结合表单元素一起使用，当表单元素文本发生变化的时候就会触发一次回调（与change事件不同的是，change时间需要光标点出时发生变化才触发）
    Vue2：可以通过value与input事件实现v-model功能 -->
    <!-- <input
      type="text"
      placeholder="与v-model功能一样"
      :value="msg1"
      @input="msg1 = $event.target.value"
    /> -->
    <input
      type="text"
      placeholder="与v-model功能一样"
      :value="msg1"
      @input="handler"
    />
    <span>{{ msg1 }}</span>
    <hr />
    <!-- 深入学习v-model：实现父子组件数据同步（实现父子组件通信） -->
    <h2>父组件{{ msg2 }}</h2>
    <!-- :value是props，父子组件通信（父组件给子组件传递数据msg2） ，@input="inputHandler"是自定义事件-->
    <!-- <CustomInput :value="msg2" @input="msg2 = $event"></CustomInput> -->
    <!-- <CustomInput :value="msg2" @input="inputHandler"></CustomInput> -->
    <!-- 底下的代码与顶上的代码原理一样的（v-model可以在组件标签中使用） -->
    <CustomInput v-model="msg2"></CustomInput>

    <!-- 底下是element-UI提供组件 -->
    <h3>{{ msg3 }}</h3>
    <el-input size="mini" v-model="msg3"></el-input>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  components: {
    CustomInput,
  },
  data() {
    return {
      msg: "我是豪哥",
      msg1: "我是豪哥",
      msg2: "我爱豪哥",
      msg3: "我是element里面组件",
    };
  },
  methods: {
    handler(e) {
      this.msg1 = e.target.value;
    },
    //自定义事件input回调
    inputHandler(params) {
      this.msg2 = params;
    },
  },
};
</script>
