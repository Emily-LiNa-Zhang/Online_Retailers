<template>
  <div>
    <!-- TypeNav是三级联动全局组件，因为已经注册为全局组件，所以不需要再import引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件：自己在组件内部是没有发送请求的，数据时父组件给的 -->
    <!-- 用props方式把floor数据给变量list -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "./ListConainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
//向仓库要floor的数据
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  //在floor的父组件中派发action：通过Vuex发起ajax请求，将数据存储在仓库中
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // //获取用户信息在首页展示
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList, //大仓库home的home组件中的floorList数据
    }),
  },
};
</script>

<style>
</style>


