<template>
  <div style="background: #ccc; height: 50px">
    <h3>儿子小明: 有存款: {{ money }}</h3>
    <button @click="giveMoney">给BABA钱: 50</button>
  </div>
</template>

<script>
import myMixin from "../myMixin/myMixin";
export default {
  name: "Son",
  data() {
    return {
      money: 30000,
    };
  },
  mixins: [myMixin],
  // 和daughter重复的js部分，直接写到mixin里面
  // methods: {
  //   giveMoney() {
  //     this.money -= 50;
  //     //$parent,组件实例VC的一个属性,可以操作父组件的数据和方法(属性|方法)
  //     this.$parent.money += 50;
  //   },
  // },
};
</script>
