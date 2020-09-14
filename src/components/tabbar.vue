<!--  -->
<template>
  <div class>
    <div class="container">
      <div class="tabbar">
        <tabbaritem
          v-for="(item,index) in tabbaritems"
          :key="index"
          :item="item"
          :index="index"
          :selIndex="selIndex"
          @changeIndex="changeIndex(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import tabbaritem from "./tabbaritem";
export default {
  components: {
    tabbaritem,
  },
  props: {
    items: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.length <= 6;
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      tabbaritems: this.items,

      selIndex: this.defaultIndex,
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    changeIndex(index) {
      this.selIndex = index;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 9.6vh;
  background: #eee;
  border-top: 1px solid #eee;
}
.tabbar {
  text-align: center;
  width: 100%;
  height: 9.6vh;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
</style>