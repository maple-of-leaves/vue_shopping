<!--  -->
<template>
  <div class>
    <div class="header">
      <div class="back">
        <van-icon name="arrow-left" @click="back"></van-icon>
      </div>
      <div class="middle">确认订单</div>
    </div>

    <div class="usermsg">
      <div class="user" @click="gotouseraddress">
        <div class="dz">
          <span class="iconfont icon-Icon-Fixedposition-"></span>
        </div>

        <div class="user_content">
          <span>{{address.name}} {{address.phone}}</span>
          <span>{{address.city}} {{address.district}} {{address.address}}</span>
        </div>
      </div>
    </div>

    <div class="goodscard" v-for="(item,index) in list" :key="index">
      <div class="goodsshop">
        <div class="shopname" v-for="(subitem,subindex) in item" :key="subindex">
          <img :src="subitem.shopLogo" width="40px" />

          <span>{{subitem.shopName}}</span>
        </div>

        <div class="goods_pro" v-for="(goods,goodsindex) in item" :key="goodsindex">
          <van-card
            num="1"
            :price="goods.goodsPrice"
            desc="描述信息"
            :title="goods.goodsName"
            :thumb="goods.goodsLogo"
          >
            <template #tags>
              <van-tag plain type="warning">七天退换</van-tag>
            </template>
          </van-card>
          <div class="fee">
            <div style=" display: flex;justify-content: space-between;font-weight:600">
              <span>运费险</span>
              <span>￥15.00</span>
            </div>
            <div style=" display: flex;justify-content: space-between;">
              <span>确认收货前退货可理赔</span>
              <span>X1</span>
            </div>

            <div class="xj">
              <div>
                <span>商品总价</span>
                <span>￥69.00</span>
              </div>
              <div>
                <span>运费（快递）</span>
                <span>￥0.00</span>
              </div>

              <div>
                <span>运费险（卖家赠送）</span>
                <span>￥0.00</span>
              </div>

              <div class="goodsprice" style="color:#000;font-size:26px;margin:30px 0">
                <span>商品小计</span>
                <span>￥{{goods.goodsPrice}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <span>应付金额：</span>
        <span style="color:red">￥{{total}}</span>
        &nbsp;&nbsp; &nbsp;
        <span>共计：X {{list.length}} 件</span>
      </div>
      <div class="right" @click="goto">去支付</div>

    </div>
  </div>
</template>

<script>
import { GetOrderInfo, ShowOrder, GetArea } from "../network/index";

import axios from "axios";

import qs from "qs";

export default {
  components: {},
  data() {
    return {
      address: [],
      list: [],
      shopname: [],
      goods: [],

      goodsid: "",

      total: 0,
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    back() {
      window.history.back();
    },
    
    goto() {
      this.$router.push({
        name: "payorder",
        params: {
          
          price: 120,
          consignee_addr: `${
            this.address.name +
            "," +
            this.address.phone +
            "," +
            this.address.city +
            this.address.address
          }`,
          goodsId: this.goodsid,
          isFcart: true,
        },

      });
    },
    gotouseraddress() {
      this.$router.push({
        name: "addplace",
        params: {
          address: this.address,
        },
      });
    },
  },
  created() {
    
    let id = this.$route.params.goodsId;

    this.goodsid = id;

    ShowOrder(id)
      .then((res) => {
        this.list = res.data;
      })
      .catch((err) => {});

    GetArea({
      params: {
        page: 1,
        pageSize: 1,
      },
    })
      .then((res) => {
        this.address = res.data[0];
      })
      .catch((err) => {});
  },
  mounted() {

  },
};
</script>
<style  scoped>
.header {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 2px solid #eee;
  background: #fff;
}
.back {
  position: relative;
  top: 50%;
  left: 30px;
  margin-top: -10px;
}
.middle {
  position: relative;
  top: 0;
  left: 50%;
  margin-left: -25px;
}
.usermsg {
  margin-top: 100px;
}
.user {
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
  width: 80%;
  display: flex;
  flex-direction: column;
}
.shopname {
  display: flex;
  justify-content: start;
  align-items: center;
}
.fee {
  padding: 0 30px;
}
.xj div {
  display: flex;
  justify-content: space-between;
  color: #999;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 100px;
  border-top: 2px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
}
.left {
  padding-left: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 75%;
}
.right {
  height: 100%;
  width: 25%;
  color: #fff;
  background: #f21956;
  text-align: center;
  line-height: 100px;
}
</style>