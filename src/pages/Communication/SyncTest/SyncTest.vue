<template>
  <div>
    小明的爸爸现在有{{ money }}元
    <h2>不使用sync修改符</h2>
    <!-- :money 父组件给子组件传递props
    @update:money：给子组件绑定一个自定义事件:update:money，相当于update_money，只不过这里用的是:做分隔
    现在这种操作，和v-model很想，可以实现父子组件的数据同步 -->
    <!-- 给父组件的money重新赋值，赋的值是子组件自定义事件传回来的数组  -->
    <!-- <Child :money="money"  @update:money="money=$event"></Child> -->
    <Child :money="money" @update:money="handler"></Child>
    <h2>使用sync修改符</h2>
    <!-- :money.sync：第一，父组件给子组件传递props（money），第二，给当前组组件绑定了一个自定义事件，而且事件名称即为update:money -->
    <Child2 :money.sync="money"></Child2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  components: {
    Child,
    Child2,
  },
  data() {
    return {
      money: 10000,
    };
  },
  methods: {
    handler(money) {
      this.money = money;
    },
  },
};
</script>
