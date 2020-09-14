<!--  -->
<template>
  <div class>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="logo">
      <img src="../assets/zhifuchenggong.png" alt width="120px" />
    </div>

    <div style="font-size:30px;text-align:center">支付成功!</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      window.history.back();
    },
    onClickRight() {},
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style  scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>