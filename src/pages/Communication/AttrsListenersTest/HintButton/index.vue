<template>
  <!-- 可以巧妙地利用a标签实现按钮带有提示功能 -->
  <a :title="title">
    <!-- 为了避免属性较多时，要一个一个写，就直接写v-bind="$attrs"获取到父组件那边传来的所有属性，注意用v-bind的简写形式：是无效的 -->
    <!-- 用v-on="$listeners"贼子组件绑定父组件那边传过来的事件，注意这里的v-on不能用@替换 -->
    <el-button v-bind="$attrs" v-on="$listeners">主要按钮</el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: ["title"],
  mounted() {
    // $attrs是组件的一个属性，可以获取到父组件传递过来的props数据
    // 对于子组件而言，父组件给的数据可以利用props接收，但是需要注意，子组件通过props接收的属性在$attrs属性当中是获取不到的
    console.log(this.$attrs); //输出组件从父组件那边传来的实例自身的属性
    //  $listeners，它是组件实例自身的一个属性，可以获取到父组件给子组件穿的的自定义事件
    console.log(this.$listeners); //输出的是从父组件那边传来的事件
  },
};
</script>

<style>
</style>