<!--  -->
<template>
  <div class>
    <div class="header">
      <img src="../assets/LE_logo_2.png" width="100%" height="100%" />
      <div>
        <van-search placeholder="请输入需要搜索的商品" @click="search('search')"></van-search>
      </div>
    </div>

    <div class="body">
      <!-- 刷新 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <template #pulling="props">
          <img
            class="dog"
            src="../assets/jerry.jpg"
            width="120px"
            :style="{ transform: scale(`${props.distance / 80}`) }"
          />
        </template>
        <template #loosing>
          <img class="doge" width="120px" src="../assets/jerry.jpg" />
        </template>
        <template #loading>
          <img class="dog" src="../assets/tom.jpg" />
        </template>
        <van-list
          v-model="loading"
          offset="30"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,index) in banner" :key="index">
                <img :src="item.slide_show_imgUrl" width="100%" />
              </van-swipe-item>
            </van-swipe>
          </div>

          <div class="commendlist">
            <div class="navlist">
              <div v-for="(item,index) in commend" :key="index">
                <img :src="item.sp_home_ico" width="64px" @click="goCategoods(item.sp_home_title)" />
                <span>{{item.sp_home_title}}</span>
              </div>
            </div>
          </div>

          <div class="goodslist">
            <div class="tabline" id="showDays" :class="headerFixed?'issFixed':''">
              <div
                v-for="(item,index) in tabline"
                :key="index"
                :class="{word_style:index===cindex}"
                @click="change(item,index)"
              >{{item}}</div>
            </div>
            <!-- 列表组件-->
            <div class="list">
              <goodslist
                v-show="isShow"
                v-for="(item,index) in list"
                :key="index"
                :id="item.goodsId"
                :img="item.goodsLogo"
                :title="item.goodsName"
                :price="item.goodsPrice"
                :star="item.goodsFav"
                @goto="goto"
              ></goodslist>

              <goodslist
                v-show="!isShow"
                v-for="(item,index) in showlist"
                :key="index"
                :id="item.goodsId"
                :img="item.goodsLogo"
                :title="item.goodsName"
                :price="item.goodsPrice"
                :star="item.goodsFav"
                @goto="goto"
              ></goodslist>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import list from "../components/list";

import { homeRec, homeList } from "../network/index";

// 引入防抖函数

import { debounce } from "../utils/utils";
export default {
  components: {
    goodslist: list,
  },
  data() {
    return {
      banner: [],
      commend: [],
      list: [],
      tabline: ["流行", "新款", "精选"],
      cindex: 0,
      showlist: [],
      isShow: true,
      headerFixed: 0, //是否吸顶 条件
      offsetTop: 0, //元素的offsetTop
      refreshing: false,
      loading: false,
      finished: false,
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    search(name) {
      this.$router.push(name);
    },

    // 上啦加载
    onLoad() {
      this.loading = false;
      // 此处利用防抖思想  用户多次上拉只取最后一次得结果
      debounce(this.getlist(), 1000);
    },

    // 下拉刷新
    onRefresh() {
      this.list = [];
      // 同上
      debounce(this.getdata(), 1000);
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.headerFixed = scrollTop > this.offsetTop ? 1 : 0;
    },

    change(sortname, index) {
      this.isShow = false;
    },
    getdata() {
      homeList({
        params: {
          page: 3,
          pageSize: 8,
        },
      })
        .then((res) => {
          this.list = res.data;
          this.refreshing = false;
          this.loading = false;
          this.finished = false;
          console.log(res);
        })
        .catch((err) => {});
    },

    getlist() {
      const params = { page: 2, pageSize: 2 };

      homeList(params)
        .then((res) => {
          this.list = [...this.list, ...res.data];

          this.loading = false;

          if (this.list.length >= 20) {
            this.finished = true;
          }
        })
        .catch((err) => {});
    },
    goCategoods(goodstitle) {
      this.$router.push({
        name: "homelist",
        params: {
          goodstitle,
        },
      });
    },
    goto(id) {
      console.log(id);

      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
  },

  created() {
    homeRec()
      .then((res) => {
        this.commend = res.data[0];

        this.banner = res.data[1];
      })
      .catch((err) => {});

    homeList({
      params: {
        page: 1,
        pageSize: 8,
      },
    })
      .then((res) => {
        this.list = res.data;
      })
      .catch((err) => {});
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.$nextTick(function () {
      // 这里fixedHeaderRoot是吸顶元素的ID
      let header = document.getElementById("showDays");
      // 这里要得到top的距离和元素自身的高度
      this.offsetTop = header.offsetTop;
    });
    // handleScroll为页面滚动的监听回调
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
<style  scoped>
.dog {
  width: 280px;
  height: 144px;
  margin-top: 16px;
  border-radius: 8px;
}
.issFixed {
  position: fixed;
  top: 260px;
  left: 0px;
  right: 0px;
  z-index: 4;
}
.header {
  z-index: 10;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  background: #fff;
}
.body {
  background: #eee;
}
.banner {
  margin-top: 260px;
}
.navlist {
  padding: 10px 0;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}
.navlist div {
  margin: 10px 0;
  flex-basis: 20%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navlist span {
  font-size: 35px;
}

.goodslist {
  background: #fff;
  /* margin-bottom: 50px; */
}

.tabline {
  border-top: 2px solid #eee;
  height: 88px;
  align-items: center;
  background: #fff;
  display: flex;
  justify-content: space-around;
}
.tabline div {
  line-height: 60px;
}
.word_style {
  border-bottom: 4px solid #ff758f;
}
.list {
  justify-content: space-between;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>