<!--  -->
<template>
  <div class>
    <div class="header">
      <van-icon name="arrow-left"></van-icon>
      <div>商品搜索</div>
      <div></div>
    </div>

    <div class="search">
      <van-search placeholder="请输入商品关键词" v-model="kw" @focus="show" show-action>
        <template #action>
          <div @click="search">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="list">
      <goodslist
        v-show="listgoods"
        v-for="(item,index) in list"
        :key="index"
        :id="item.goodsId"
        :img="item.goodsLogo"
        :title="item.goodsName"
        :price="item.goodsPrice"
        :star="item.goodsFav"
        @goto="goto"
      ></goodslist>
    </div>
    <div class="hotsearch" v-show="s1">
      <div>全网热搜</div>
      <div class="hotlist">
        <van-tag
          size="medium"
          v-for="(item,index) in hot"
          :key="index"
          plain
          text-color="#999"
          @click="clickTag(item)"
        >{{item}}</van-tag>
      </div>
    </div>

    <div class="searchlist" v-show="s2">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>

      <div class="history">
        <van-cell
          v-for="(item,index) in history"
          :key="index"
          center
          :title="item"
          @click="clickCell(item)"
        >
          <template #default>
            <van-icon name="close" @click="del(index)" />
          </template>
        </van-cell>
      </div>

      <div class="clear" @click="clearAll">清空历史记录</div>
    </div>
  </div>
</template>

<script>
// 导入封装的axios方法
import { Gethotwords, getGoods } from "../network/index";

import goodslist from "../components/list";

import { mapState } from "vuex";

import { debounce } from "../utils/utils";

export default {
  components: {
    goodslist,
  },
  data() {
    return {
      kw: "",
      hot: [],
      s1: true,
      s2: false,
      list: [],
      listgoods: false,
    };
  },
  computed: {
    ...mapState({
      history: "history",
    }),
  },
  watch: {},
  //方法集合
  methods: {
    goto(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    clickTag(item) {
      this.s2 = false;
      getGoods({ goodsName: item, page: 1, pageSize: 8, sortType: "syn" })
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {});

      this.$store.dispatch("save", name);
    },
    clickCell(item) {
      this.s1 = false;

      this.s2 = false;

      getGoods({ goodsName: item, page: 1, pageSize: 8, sortType: "syn" })
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {});

      this.$store.dispatch("save", name);
    },
    // 删除
    del(index) {
      this.$store.dispatch("del", index);
      console.log(index);
    },
    // 清空所有
    clearAll() {
      this.$dialog
        .confirm({
          message: "该操作会清空所有历史记录，请确认是否继续？",
        })
        .then(() => {
          this.$store.dispatch("clearAll");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      debounce(this.getSearchlist(), 1000);

      console.log("history", this.history);

      this.s1 = false;

      this.s2 = false;

      this.listgoods = true;

      this.$store.dispatch("save", this.kw);
    },

    getSearchlist() {
      getGoods({ goodsName: this.kw, page: 1, pageSize: 8, sortType: "syn" })
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {});
    },

    show() {
      this.s2 = true;
    },
  },
  created() {
    Gethotwords()
      .then((res) => {
        this.hot = res.data;
      })
      .catch((err) => {});
  },
  mounted() {},
};
</script>
<style  scoped>
.header {
  display: flex;
  height: 100px;
  justify-content: space-around;
  align-items: center;
}
.hotsearch {
  color: #999;
  padding: 40px 50px;
}
.hotlist {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
}
.van-tag {
  margin: 10px 20px;
}
.history {
  padding: 0 20px;
}
.clear {
  width: 70%;
  margin: 20px auto;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #1989fa;
  border: 2px solid #1989fa;
}
.list {
  justify-content: space-between;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>