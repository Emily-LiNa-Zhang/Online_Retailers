<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <!-- 轮播图的图片 -->
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //立即监听
      //为社么watch监听不到list：因为这个数据从来没有发生过变化，数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        var mySwiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项(true为循环式播放，false为非循环式播放)
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true, //点击小球是否可以切换页面
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      },
    },
  },
};
</script>

<style>
</style>