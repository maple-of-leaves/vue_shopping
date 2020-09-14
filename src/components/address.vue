<!--  -->
<template>
  <div class>
    <van-nav-bar
      title="我的收货地址"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="addresscontent">
      <div class="product_goods" v-for="(item,index) in list" :key="index">
        <div class="tubiao">
          <img src="../assets/position.png" width="30px" />
        </div>
        <div class="rightcontent">
          <div>
            <span style="font-weight:600;font-size:20px">{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>

          <div class="place">
            <span>
              <span>{{item.city}}</span>
            </span>
            <span>
              <span>{{item.address}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { GetArea } from "../network/index";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
      onClickLeft(){
          window.history.back()
      }
  },
  created() {
    GetArea({
      params: {
        page: 1,
        pageSize: 4,
      },
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
<style  scoped>
.product_goods {
  border-top: 1px solid #eee;
  display: flex;
  padding: 30px 20px;
}
.tubiao {
  width: 80px;
  height: 80px;
  background: red;
  border-radius: 40px;
}
.tubiao img {
  display: block;
  margin: auto;
  color: #fff;
}
.rightcontent {
  margin-left: 20px;
}
</style>