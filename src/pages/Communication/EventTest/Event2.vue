<template>
  <div style="background: #ccc; height: 80px">
    <h2>Event2组件</h2>
    <!-- @click是原生DOM事件，点击事件触发自定义事件 -->
    <button @click="$emit('click', 'Event2的自定义事件click')">
      分发自定义click事件</button
    ><br />
    <button @click="$emit('xxx', 'Event2的自定义事件xxx')">
      分发自定义xxx事件</button
    ><br />
  </div>
</template>
