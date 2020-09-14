<!--  -->
<template>
  <div @click="change">
    <div>
      <img :src="index===selIndex?tabbaritem.icon_active:tabbaritem.icon" alt />
    </div>
    <div>
      <div :class="index===selIndex?'title_active':'title'"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    index: Number,
    selIndex: Number,
  },
  components: {},
  data() {
    return {
      tabbaritem: this.item,
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    change() {
      this.$router.push(this.tabbaritem.path);

      this.$emit("changeIndex", this.index);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style  scoped>
.title {
  color: #000;
}
.title_active {
  color: red;
}
</style>