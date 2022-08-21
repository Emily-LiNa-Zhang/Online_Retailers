<template>
  <div>
    <h1>作用域插槽</h1>
    <h2>效果一：显示TODO列表时，已完成的TODO为绿色，带序号</h2>
    <!-- 通过props给子组件传递了一个数组数据 -->
    <List :todos="todos">
      <!-- 子组件决定不了结构与外观，需要父组件传递结构与外观 -->
      <!-- { todo, $index }此处为解构 -->
      <template v-slot="{ todo, $index }">
        <h1 :style="{ color: todo.isComplete ? 'red' : 'cyan' }">
          {{ todo.text }}----{{ $index }}
        </h1>
      </template>
    </List>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import List from "./List";
export default {
  name: "ScopeSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },

  components: {
    List,
  },
};
</script>
