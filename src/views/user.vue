<!--  -->
<template>
  <div class>
    <div class="my">
      我的
      <div class="esc">
        <van-icon name="wap-nav" size="25" @click="esc" />
      </div>
    </div>
    <div class="message">
      <p>用户： {{username}}</p>
      <p></p>
    </div>

    <div class="user_body">
      <div class="user_core">
        <div></div>
        <div></div>
      </div>

      <div class="orderlist">
        <div
          class="toplist"
          style="display:flex; justify-content:space-between; align-items: center;"
        >
          <div style="font-weight:700;font-size:35px;">我的订单</div>
          <div>查看所有订单></div>
        </div>
      </div>

      <div class="comend">
        <div
          class="toplist"
          style="display:flex; justify-content:space-between; align-items: center;"
        >
          <div style="font-weight:700;font-size:35px;">常用功能</div>
        </div>

        <div class="address">
          <div @click="goto">收货地址</div>
          <div>我的收藏</div>
          <div>浏览记录</div>
          <div>设置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Core, Restmy } from "../network/index";

import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      username: "username",
    }),
  },
  watch: {},
  //方法集合
  methods: {
    esc() {
      this.$dialog
        .confirm({
          message: "确定要退出吗？",
        })
        .then(() => {
          sessionStorage.removeItem("username");

          localStorage.removeItem("Authtoken");

          setTimeout(() => {
            this.$router.push({
              name: "login",
            });
          }, 1500);
        })
        .catch(() => {});
    },
    goto() {
      this.$router.push({
        name: "address",
      });
    },
  },
  created() {
    console.log(this.username);
    Restmy({ params: { page: 1, pageSize: 5 } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});

    Core({ params: { page: 1, pageSize: 4 } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style scoped>
.my {
  color: #fff;
  height: 100px;
  background: #0076ff;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
}
.esc {
  position: absolute;
  right: 20px;
}
.message {
  background: #0076ff;
  height: 300px;
}
.message {
  color: #fff;
  text-align: left;
}
.user_body {
  padding: 40px 40px;
  background: #eee;
}
.orderlist {
  padding: 10px 15px;
  background: #fff;
}
.commend {
  background: #fff;
}
.address {
  display: flex;
  justify-content: space-around;
}
</style>