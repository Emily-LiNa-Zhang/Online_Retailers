<template>
  <div style="background: #ccc; height: 50px">
    <span>小明每次花100元</span>
    <!-- 这里第二个参数其实就是把父组件传过来的props的money拿来计算，然后把这个值作为自定义事件的参数传给父组件 -->
    <button @click="$emit('update:money', money - 100)">花钱</button>
    爸爸还剩 {{ money }} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Child2",
  props: ["money"],
};
</script>
