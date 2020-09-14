<!--  -->
<template>
  <div class>
    <div class="header">
      <div>购物车({{cart.length}})</div>
      <div class="gl" @click="showStep">管理</div>
    </div>

    <div class="cartlist">
      <van-checkbox-group
        checked-color="red"
        v-model="result"
        @change="changeAll"
        v-for="(item,index) in cart"
        :key="index"
      >
        <div class="item">
          <!-- 给checkbox绑定数据 点击事件时触发 -->
          <van-checkbox :name="item" checked-color="red"></van-checkbox>
          <van-card
            class="itemCard"
            :price="item.goods.goodsPrice"
            :title="item.goods.goodsName"
            :thumb="item.goods.goodsLogo"
          >
            <template #num>
              <van-stepper v-model="item.buyNum" v-show="isShow" />
            </template>
          </van-card>
        </div>
      </van-checkbox-group>
    </div>

    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="red" @click="selall">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { GetCart } from "../network/index";

import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      result: [],
      goods: [],
      checked: false,
      isShow: false,
      goodsid: [],
      b: "",
      money: "",
    };
  },
  computed: {
    ...mapState({
      cart: "cart",
      goodsId: "goodsId",
    }),
    total() {
      let money = 0;
      this.result.map((Element) => {
        money += Element.goods.goodsPrice * Element.buyNum;
      });
      return money * 100;
    },
  },
  watch: {},
  //方法集合
  methods: {
    showStep() {
      if (!this.isShow) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    selall() {
      if (this.checked) {
        this.result = this.cart;
      } else {
        this.result = [];
      }
    },
    changeAll(names) {
      if (names.length < this.cart.length) {
        this.checked = false;
      } else if (names.length == this.cart.length) {
        this.checked = true;
      }
    },
    onSubmit() {
      this.$router.push({
        name: "order",
        params: {
          goodsId: this.b,
        },
      });
    },
  },
  created() {
    this.cart.map((Element) => {
      return this.goodsid.push(Element.goods.goodsId);
    });

    this.b = this.goodsid.join(" ");

    GetCart({
      params: {
        page: 1,
        pageSize: 4,
      },
    })
      .then((res) => {
        console.log(res);

        this.goods.map((Element) => {
          return this.goodsid.push(Element.product_id);
        });
        this.b = this.goodsid.join(" ");

        this.goods = res.data;
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  line-height: 88px;
  text-align: center;
  display: flex;
}
.header div {
  flex: 1;
  text-align: right;
}

.item {
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.van-card {
  margin: 0;
  width: 90%;
}
.van-submit-bar {
  position: fixed;
  bottom: 100px;
  left: 0;
}
</style>