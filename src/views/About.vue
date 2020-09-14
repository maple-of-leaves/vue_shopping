<template>
  <div>
   
    <div class="details">
      <div class="left">
        <img :src="goods.img" />

        <div class="scroll" ref="par">
          <img
            :src="item"
            v-for="(item,index) in img"
            :key="index"
            ref="image"
            @mouseenter="mouseenter"
          />
        </div>
      </div>

      <div class="right">
        <div>{{goods.title}}</div>

        <div class="price">
          {{goods.originprice}}
          {{goods.price}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      goods: {},
      defaullIndex: 0,

      img: [
        "http://localhost:8080/img/nuotai02.jpg",
        "http://localhost:8080/img/nuotai01.jpg",
        "http://localhost:8080/img/nuotai03.jpg",
        "http://localhost:8080/img/nuotai04.jpg",
        "http://localhost:8080/img/bama03.jpg",
        "http://localhost:8080/img/bama03.jpg",
        "http://localhost:8080/img/bama03.jpg",
        "http://localhost:8080/img/bama03.jpg",
      ],
    };
  },
  methods: {
    mouseenter() {
      this.defaullIndex += 3;
    },
  },
  mounted() {
    let name = this.$route.params.name;
    this.goods = name;

    axios
      .get("http://localhost:8080/details.json")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.details {
  display: flex;
}

.left {
  width: 300px;
}

.left > img {
  width: 250px;
  margin: 0 auto;
}

.scroll {
  width: 300px;
  background: #eee;
  height: 100px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
}
.scroll img {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
</style>