<!--  -->
<template>
  <div class>
    <div class="header">商品分类</div>

    <van-search aria-placeholder="请输入要搜索的商品"></van-search>

    <div class="body">
      <div class="category_line">
        <ul class="cate">
          <li
            v-for="(item,index) in cate"
            :key="index"
            @click="changeIndex(index,item.cat_id)"
            :class="{'listyle':index===tip}"
          >{{ item.cat_name}}</li>
        </ul>
      </div>

      <div class="showcategory">
        <div class="navline">
          <div
            v-for="(item,index) in tabline"
            :key="index"
            :class="{word_style:index===cindex}"
            @click="change(item,index)"
          >{{item}}</div>
        </div>
        <div class="goodslist">
          <div v-for="(item,index) in list" :key="index" class="goodsCate">
            <img :src="item.goodsLogo" width="100%" />
            <div class="title">{{item.goodsName}}</div>
            <div style="text-align:center">
              <span style="color:red">￥{{item.goodsPrice}}</span>
              &nbsp;&nbsp;
              <span>{{item.goodsFav}}</span>
            </div>
            <div style="color:#999">
              <s>{{item.goodsOldPrice}}</s>
            </div>
            <div style="height:15px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getList } from "../network/index";

export default {
  components: {},
  data() {
    return {
      cate: [],
      tabline: ["综合", "销量", "新品"],
      cindex: 0,
      tip: 0,
      list: [],
    };
  },
  computed: {
    gettoken() {
      return this.$store.state.token;
    },
  },
  watch: {},
  //方法集合
  methods: {
    change(item, index) {
      this.cindex = index;
    },
    changeIndex(index, id) {
      console.log(id);

      // 分类商品
      getList({
        cat_id: id,
        page: 1,
        pageSize: 20,
        sortType: "syn",
      })
        .then((res) => {
          this.list = res.data;
          console.log(res);
        })
        .catch((err) => {});

      this.tip = index;
    },
  },
  created() {
    // 分类导航
    getCategory()
      .then((res) => {
        this.cate = res.data;
      })
      .catch((err) => {});

    getList({
      cat_id: 85,
      page: 1,
      pageSize: 20,
      sortType: "syn",
    })
      .then((res) => {
        this.list = res.data;
        console.log(res);
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style scoped>
.header {
  height: 1.35rem;
  text-align: center;
  line-height: 1.35rem;
}
.body {
  height: 78vh;
  display: flex;
}
.category_line {
  background: #eee;
  width: 23%;
  height: 100%;
  overflow: scroll;
}
.cate li {
  padding: 20px;
  line-height: 80px;
  text-align: center;
}

.showcategory {
  width: 77%;
  height: 100%;

  overflow: scroll;
}
.navline {
  border-top: 2px solid #eee;
  height: 88px;
  align-items: center;
  background: #fff;
  display: flex;
  justify-content: space-around;
}
.word_style {
  color: red;
  border-bottom: 6px solid #ff758f;
}
.listyle {
  background: #fff;
  border-left: 8px solid red;
}
.goodslist {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  justify-content: space-around;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 28px;
}
.goodsCate {
  width: 48%;
}
.goodsCate img {
  display: block;
  margin: 0 auto;
}
</style>