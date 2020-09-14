<template>
  <div class="home">
    <div class="header">
      <el-carousel :interval="5000" height="400px">
        <el-carousel-item v-for="(item,index) in imgswiper" :key="index">
          <img :src="item" width="100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list">
      <ul>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
        <li>女装内衣</li>
      </ul>
    </div>
    <div class="commend_goods">
      <div class="goods_item" v-for="(item,index) in goods" :key="index" @click="goto(item)">
        <img :src="item.img" alt />
        <div class="title">{{item.title}}</div>
        <div class="price">
          <span>原价￥{{item.originprice}}</span>
          &nbsp;&nbsp;&nbsp;
          <span style="color:red">促销价￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  data() {
    return {
      imgswiper: [],
      goods: [],
    };
  },
  methods: {
    goto(name) {
      this.$router.push({
        name: "details",
        params: {
          name,
        },
      });
    },
  },

  mounted() {
    axios
      .get("http://localhost:8080/goods.json")
      .then((res) => {
        this.imgswiper = res.data.swiper;
        this.goods = res.data.goods;
        console.log(res);
      })
      .catch((err) => {});
  },
};
</script>
<style scoped>
.commend_goods {
  margin: 5px auto;
  background: #eee;
  width: 900px;
  display: flex;
  justify-content: center;
}
.goods_item {
  flex-basis: 25%;
  height: 260px;
  background: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.goods_item img {
  margin: 0 auto;
  width: 180px;
}

.price {
  font-size: 10px;
  color: #999;
}

.list {
  width: 200px;
  height: 400px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 10px;
  left: 100px;
  z-index: 100;
}

ul,
li {
  list-style-type: none;
  color: #fff;
}
li {
  height: 29px;
  font-size: 14px;
}
</style>