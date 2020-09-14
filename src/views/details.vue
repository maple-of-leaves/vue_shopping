<!--  -->
<template>
  <div class>
    <div class="header">
      <div class="back">
        <van-icon name="arrow-left" size="20" @click="back"></van-icon>
      </div>

      <div class="right" v-for="(item,index) in details" :key="index">
        <van-tabs scrollspy class="goodslogo">
          <van-tab title="商品">
            <div style="width:100%">
              <img :src="item.goodsLogo" width="100%" />

              <div>{{item.goodsName}}</div>

              <div class="price">
                <span style="color:#ffa7b9;font-size:30px">￥{{item.goodsPrice}}</span>
                <span>
                  <s>{{item.goodsOldPrice}}</s>
                </span>
              </div>

              <div class="sells">
                <div v-for="(subitem,subindex) in details[2]" :key="subindex">
                  <img :src=" 'https:' + subitem.icon" width="10px" />
                  {{subitem.name}}
                </div>
              </div>
            </div>
          </van-tab>

          <van-tab title="评论">
            <div>
              <div v-html="item.goodsIntroduce" class="commend"></div>
            </div>
          </van-tab>
          <van-tab title="详情"></van-tab>
          <van-tab title="推荐"></van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="body"></div>
    <div class="footerbar">
      <div class="footer_left">
        <div>
          <span class="iconfont icon-kefu1 tubiao"></span>
          <span>客服</span>
        </div>
        <div @click="goto('/cart')">
          <span class="iconfont icon-icon-test1" style="font-size:30px"></span>
          <span>购物车</span>
        </div>
        <div>
          <span class="iconfont icon-dianpu1 tubiao"></span>
          <span>店铺</span>
        </div>
      </div>
      <div class="footer_right">
        <div class="cart" @click="addCart">加入购物车</div>
        <div class="buy">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import goodslist from "../components/list";

import { getDetails, AddCart } from "../network/index";

import { mapState } from "vuex";

import axios from "axios";
export default {
  components: {
    goodslist,
  },
  data() {
    return {
      list: [],
      goodsId: "",
      swipe: [],
      details: [],
      price: "",
    };
  },
  computed: {
    ...mapState({
      id: "goodsId",
    }),
  },
  watch: {},
  //方法集合
  methods: {
    back() {
      window.history.back();
    },
    goto(cart) {
      this.$router.push({
        path: cart,
      });
    },
    addCart() {
      AddCart({
        params: {
          product_id: this.details[0].goodsId,
          product_amount: 1,
          price: this.details[0].goodsPrice,
        },
      })
        .then((res) => {
          console.log(res);

          if (res.code == 201) {
            this.$toast.success({
              message: "已加入购物车",
            });

            this.$store.dispatch("addCart", this.details);
          }
        })
        .catch((err) => {});
    },
  },
  created() {
    this.goodsId = this.$route.query.id;

    getDetails(this.goodsId)
      .then((res) => {
        this.details = res.data;
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style  scoped>
.right {
  width: 90%;
  position: relative;
  left: 10%;
  top: -30px;
}
.van-icon {
  position: relative;
  top: 40px;

  width: 10%;
}
.footerbar {
  height: 120px;
  background: #fff;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}

.footer_left {
  width: 50%;
  display: flex;
}
.footer_left div {
  display: flex;
  flex-direction: column;
  flex-basis: 33%;
  align-items: center;

  justify-content: center;
}
.footer_left span:nth-child(2) {
  font-size: 28px;
}
.footer_right {
  width: 50%;
  display: flex;
}
.tubiao {
  font-size: 50px;
}
.cart {
  flex: 1;
  background: #ffe817;
  text-align: center;
  line-height: 120px;
}
.buy {
  flex: 1;
  color: #fff;
  text-align: center;
  background: #ff6699;
  line-height: 120px;
}

.td {
  color: #9a9a9a;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}

.itemlist {
  justify-content: space-around;
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
}
.sells {
  display: flex;
  justify-content: space-around;
}
.sells div {
  white-space: nowrap;
}
.commend {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>