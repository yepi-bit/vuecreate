<template>
  <div class="left">
    <div class="left-main">
      <div class="warn-list re">
        <img src="/favicon.ico" />
        <Circle style="z-index: 999" :value="100" :size="120" :color="'#d36'" :duration="3000" />
      </div>
    </div>
  </div>
</template>

<script>
import circle from "./Circle.vue";
export default {
  components:{
    circle
  },
  data() {
    return {
    }
  },
  created() {
    this.loopGetData()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    loopGetData() {
    }
  }
}
</script>

<style scoped>
.left {
  width: 12%;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  padding: 95px 0 40px 0;
}

.left .left-main {
  width: 100%;
  height: 100%;
  padding: 0 20px 0 40px;
  background: url(../assets/left-bg.png) no-repeat;
  background-size: 100% 100%;
}

</style>
