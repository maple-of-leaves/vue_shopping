<!--  -->
<template>
  <div class>

      支付宝

      <div v-html="list" style="background:pink"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
        list:""
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {},
  created() {
      this.list=this.$route.params.formlist
    console.log(this.$route.params.formlist);
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style  scoped>
</style>