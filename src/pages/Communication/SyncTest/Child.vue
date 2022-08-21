<template>
  <div style="background: #ccc; height: 50px">
    <span>小明每次花100元</span>
    <!-- 在原生DOM身上绑定原生DOM事件，触发自定义函数，第一个参数是自定义事件的名字，第二个参数是传回父组件的数据 -->
    <button @click="$emit('update:money', money - 100)">花钱</button>
    爸爸还剩{{ money }}元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Child",
  props: ["money"],
};
</script>
