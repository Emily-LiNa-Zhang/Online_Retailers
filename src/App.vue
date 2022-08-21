<template>
  <div>
    <!-- 测试自定义插件 -->
    <h1 v-upper="msg"></h1>
    <Header></Header>
    <router-view></router-view>
    <!-- 控制footer组件的显示和隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data() {
    return {
      msg: "abc",
    };
  },
  components: { Header, Footer },
  //把本来写在TypeNav组件中的请求数据放进App根组件中
  mounted() {
    //派发一个action，获取商品分类三级列表的数据
    //通知Vuex发送请求，获取数据，存储与仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
