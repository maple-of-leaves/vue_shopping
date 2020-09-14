<template>
  <div id="app">
    <router-view />
    <div class="tab" v-show="this.$route.meta.isshow">
      <van-tabbar route active-color= "red" >
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="qr" to="/category">商城</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="user">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <Tabbar :items="items" :defaultIndex="0" v-show="this.$route.meta.isshow" />
  </div>
</template>

<script>
import Tabbar from "./components/tabbar";

export default {
  component: {
    Tabbar,
  },
  data() {
    return {
      items: [
        {
          title: "首页",
          icon: require("./assets/tabbar/home.svg"),
          icon_active: require("./assets/tabbar/home_active.svg"),
          path: "/",
        },
        {
          title: "分类",
          icon: require("./assets/tabbar/category.svg"),
          icon_active: require("./assets/tabbar/category_active.svg"),
          path: "/category",
        },
        {
          title: "购物车",
          icon: require("./assets/tabbar/shopcart.svg"),
          icon_active: require("./assets/tabbar/shopcart_active.svg"),
          path: "/cart",
        },
        {
          title: "我的",
          icon: require("./assets/tabbar/profile.svg"),
          icon_active: require("./assets/tabbar/profile_active.svg"),
          path: "/user",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-size: 30px;
  list-style-type: none;
}
</style>
