<!--  -->
<template>
  <div class>
    <div class="header">
      <div class="wrapper_line">商品搜索</div>
      <van-search placeholder="请输入商品名称" v-model="kw" show-action>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>

      <van-tabs v-model="active">
        <van-tab title="综合">
          <div class="list">
            <goodslist
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
        </van-tab>
        <van-tab title="销量">内容 2</van-tab>
        <van-tab title="新品">内容 3</van-tab>
        <van-tab title="价格">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import list from "../components/list";
export default {
  components: {
    goodslist: list,
  },
  data() {
    return {
      kw: this.$route.params.goodstitle,
      list: [],
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    onSearch() {},
    goto(id) {
      console.log(id);

      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
  },
  created() {
    this.$network
      .getgoods({
        params: {
          goodsName: this.kw,
          page: 1,
          pageSize: 10,
        },
      })
      .then((res) => {
        this.list = res.data.data;
        console.log(res);
      })
      .catch((err) => {});
    console.log(this.$route.params.goodstitle);
  },
  mounted() {},
};
</script>
<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.wrapper_line {
  height: 90px;
  text-align: center;
  line-height: 100px;
}
.list {
  justify-content: space-between;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>