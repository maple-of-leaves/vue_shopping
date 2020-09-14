<!--  -->
<template>
  <div class>
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="total" style="font-size:30px">￥749171</div>

    <van-radio-group v-model="radio" @change="change">
      <van-cell-group>
        <van-cell clickable @click="sel">
          <template #title>
            <img src="../assets/zfb.d05898d6.jpg" width="60px" />
            <span>支付宝支付</span>
          </template>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell clickable @click="sel">
          <template #title>
            <img src="../assets/icon-pitch.6a0c5811.png" width="60px" />
            <span>微信支付</span>
          </template>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell clickable @click="sel">
          <template #title>
            <img src="../assets/yue.png" width="60px" />
            <span>余额支付</span>
          </template>
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="pay_icon"></div>
    <van-button type="info" block class="pay" @click="buyonce">立即支付</van-button>
    <!-- <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />-->

    <van-number-keyboard
      v-model="value"
      :show="show"
      @blur="payorder"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Payorder, CreateOrder, VerifyPsd, zfb } from "../network/index";

import md5 from "js-md5";

import qs from "qs";

import axios from "axios";

export default {
  components: {},
  data() {
    return {
      show: false,
      value: "",
      orderNumber: [],
      goods: {},
      bh: "",
      list: [],
      radio: 1,
      changestatus: true,
      html: "",
    };
  },
  computed: {},
  watch: {
    value(newval) {
      if (newval.length >= 6) {
        this.$notify({
          type: "primary",
          message: "支付密码为6位数字",
        });
      }

      this.value = newval;
    },
  },
  //方法集合
  methods: {
    onDelete() {},
    payorder() {},
    onClickLeft() {
      window.history.back();
    },
    showkeyboard() {
      this.show = true;
    },
    sel() {},
    change(val) {
      this.radio = val;
    },
    buyonce() {
      this.changestatus = false;

      this.show = true;

      if (this.radio == "") {
        this.$notify({
          type: "primary",
          message: "请选择支付方式",
        });
      } else {
      }
    },

    onInput(val) {
      this.value = (this.value + val).slice(0, 6);
      console.log(this.value);

      if (this.value.length == 6) {
        if (this.radio == "3") {
          VerifyPsd(
            qs.stringify({
              paypwd: md5(this.value),
            })
          )
            .then((res) => {
              if (res.code == 200) {
                Payorder(
                  qs.stringify({
                    orderNum: this.bh,
                  })
                )
                  .then((res) => {
                    setTimeout(() => {
                      this.$router.push("confirm");
                    }, 2000);
                    console.log(res);
                  })
                  .catch((err) => {});
              }
              console.log(res);
            })
            .catch((err) => {});
        } else if (this.radio == "2") {
        } else if (this.radio == "1") {
          zfb(
            qs.stringify({
              OutTradeNo: this.bh,
              Subject: "支付宝",
              ProductCode: "QUICK_WAP_WAY",
              TotalAmount: "200",
            })
          )
            .then((res) => {
              this.html = res.data;
              var form = res.data;
              const div = document.createElement("div");
              div.innerHTML = form; //此处form就是后台返回接收到的数据
              document.body.appendChild(div);
              document.forms[0].submit();

              console.log(res);
            })
            .catch((err) => {});
          console.log("支付  支付宝");
        }
      }
    },
  },
  created() {
    this.goods = this.$route.params;

    CreateOrder(
      qs.stringify({
        price: 120,
        consignee_addr: this.goods.consignee_addr,
        goodsId: this.goods.goodsId,
        isFcart: true,
        num: 0,
      })
    )
      .then((res) => {
        this.list = res.data;

        this.list.map((Element) => {
          return this.orderNumber.push(Element.orderNumber);
        });

        this.bh = this.orderNumber.join(" ");

        console.log(res);

        console.log(this.bh);
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style scoped>
.pay {
}
img {
  vertical-align: middle;
}
</style>