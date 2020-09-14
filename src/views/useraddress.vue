<!--  -->
<template>
  <div class>
    <van-nav-bar
      title="我的收货地址"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="user" @click="gotouseraddress">
      <div class="dz">
        <span class="iconfont icon-Icon-Fixedposition-"></span>
      </div>

      <div class="user_content">
        <span>{{address.name}} {{address.phone}}</span>
        <span>{{address.city}} {{address.district}} {{address.address}}</span>
      </div>

      <div style="color:red">编辑</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      address: {},
    };
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
  created() {
    this.address = this.$route.params.address;
    console.log(this.$route.params.address);
  },
  mounted() {},
  beforeCreate() {},
};
</script>
<style scoped>
.user {
  border-bottom: 2px solid #eee;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.dz {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #fd4403;
  text-align: center;
  line-height: 80px;
}
.icon-Icon-Fixedposition- {
  color: #fff;
  font-size: 55px;
}
.user_content {
  width: 70%;
  display: flex;
  flex-direction: column;
}
.shopname {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>