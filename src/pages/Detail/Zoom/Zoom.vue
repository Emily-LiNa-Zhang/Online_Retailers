<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      // 如果服务器的数据没有回来，skuImageList是个空数组，空数组.属性是undefined，至少应该是一个空数组
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  methods: {
    handler(event) {
      //获取到遮罩层
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束遮罩层的范围
      if (left <= 0) left = 0;
      if (top <= 0) top = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      //修改元素的left|top属性值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      //-2是放大和方向相反的意思
      // 大图的移动方向和遮罩层相反，又因为大图放大了2倍，所以移动的距离也放大2倍。
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  mounted() {
    //全局事件总线：获取兄弟组件传递过来的索引值
    this.$bus.$on("getIndex", (index) => {
      // console.log(index);
      this.currentIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>