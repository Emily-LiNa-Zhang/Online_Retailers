<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件委托，将“全部商品分类”和下面的三级联动一起放到一个大的div中，并且给大的div绑定鼠标离开事件 -->
      <div @mouseleave="leaveIndexShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <!-- 鼠标移到谁身上，谁的类名就是cur -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}-{{ index }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//拿到大仓库里面的数据
import { mapState } from "vuex";
//节流防抖
//引入方式：把loadash所有的功能都引入进来了
// import _ from 'lodash'
//最好的引入方式：按需加载
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标放置所在一级元素的索引值
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //index：鼠标移到某个一级分类的元素时，该元素的索引值
    //   // console.log(index);
    //   //正常情况下（用户慢慢的进入）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   //非正常情况下（用户操作很快）：本身全部的一级分类都应该触发谁奥进入事件，但是经过测试，只有部分h3触发了
    //   //就是因为用户操作的太快了，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能导致卡顿现象
    //   this.currentIndex = index;
    // },
    // //节流写法1（引入全部lodash功能）
    // changeIndex:_.throttle(function(index){
    //   //index：鼠标移到某个一级分类的元素时，该元素的索引值
    //   // console.log(index);
    //   //正常情况下（用户慢慢的进入）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   //非正常情况下（用户操作很快）：本身全部的一级分类都应该触发谁奥进入事件，但是经过测试，只有部分h3触发了
    //   //就是因为用户操作的太快了，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能导致卡顿现象
    //   this.currentIndex = index;
    // },50)
    //节流写法2（按需引入lodash功能）
    //注意：throttle回到函数别用箭头函数，可能会出现上下文this
    changeIndex: throttle(function (index) {
      //index：鼠标移到某个一级分类的元素时，该元素的索引值
      // console.log(index);
      //正常情况下（用户慢慢的进入）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况下（用户操作很快）：本身全部的一级分类都应该触发谁奥进入事件，但是经过测试，只有部分h3触发了
      //就是因为用户操作的太快了，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能导致卡顿现象
      this.currentIndex = index;
    }, 50),

    //实现：1、home页面中鼠标离开一整块区域之后再变化currentIndex的值；
    //2、search页面中鼠标一离开商品分类列表区域后，就隐藏
    leaveIndexShow() {
      // console.log(index);
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },

    //鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },

    //三级联动点击需要跳转到serch路由
    goSearch(event) {
      //最好的解决方法：编程式导航（因为声明式导航会导致卡顿）+事件委派
      //存在一些问题：事件委派是把全部的子节点【h3,dt,di,em】的事件委派给父亲节点
      //但是我们需要的是，再点击a标签的时候，会进行路由跳转【怎么能确定电机的一定是a标签】
      //存在另一个问题：即使你能确定电机的是a标签，但是如何区分一级、二级、三级分类的标签

      //第一个问题，把子节点中a标签加上自定义属性data-categoryName，其余子节点没有
      let element = event.target;
      console.log("element", element);
      //获取当前触发这个时间的节点【h3,dt,di,em,a】,需要带有data-categoryname这样的【一定是a标签】
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      console.log("element.dataset", element.dataset);
      //解构赋值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上拥有categoryname，一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //整理完参数，将query参数传进location
        // console.log(location, query);
        location.query = query;
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        //路由跳转
        this.$router.push(location);
      }
    },
  },
  //组件挂载完毕：可以向服务器发送请求
  mounted() {
    //问题，请求过多；解决：移到APP组件中
    //通知Vuex发送请求，获取数据，存储与仓库中
    // this.$store.dispatch("categoryList");

    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //把它映射成组件实例身上的一个属性
  computed: {
    //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数就会立即执行一次
    //注入一个参数state，其实即为大仓库中的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    //定义动画事件、速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>