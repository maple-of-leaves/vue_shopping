<!--  -->
<template>
  <div class>
    <div class="parent">
      <div class="left">111</div>
      <div class="right">333</div>
      <div class="middle">222</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.parent {

  
}
.left {
  width: 200px;
  height: 300px;
  top: 0;
  left: 0;
  position: absolute;
  background: yellow;
}
.middle {
  height: 300px;
  margin-left: 200px;
  margin-right: 300px;
  background: pink;
}
.right {
  width: 300px;
  height: 300px;
  top: 0;
  left: 0;
  position: absolute;
  margin-left: 200px;
  background: lawngreen;
}

.box {
  background: #eee;
  /* overflow: hidden; */
}
</style>