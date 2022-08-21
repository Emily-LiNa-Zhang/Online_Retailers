<template>
  <div style="background: #ccc; height: 50px">
    <h2>input包装组件</h2>
    <!-- 此处的:value="value"是给原生DOM绑定一个响应式动态属性，值为value; @input是给原生DOM绑定原生DOM事件，当输入框中的内容发生变化后触发自定义事件“input”-->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "CustomInput",
  // 子组件接收父组件传来的数据
  props: ["value"],
};
</script>
