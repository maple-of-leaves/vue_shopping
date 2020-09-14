<!--  -->
<template>
  <div class>
    
    <div class="goodscard">
      <van-image :src="imgs" width="100%" @click="goto" lazy-load>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>

      <div class="title">
        <p>{{gtitle}}</p>
        <p>
          <span style="color:red">{{gprice}}</span>
          <span style="margin-left:10px">
            <van-icon name="star-o" />
            {{like}}
          </span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    title: String,
    price: Number,
    star: Number,
    id: Number,
  },
  components: {},
  data() {
    return {
      imgs: this.img,
      gtitle: this.title,
      gprice: this.price,
      like: this.star,
      sid: this.id,
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    goto() {
      this.$emit("goto",this. sid);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.goodscard {
  width: 360px;
}
.goodscard img {
  margin: 0 auto;
  border-radius: 10px;
}
.title p:nth-child(1) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 28px;
}
.title p:nth-child(2) {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>