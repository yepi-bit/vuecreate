<template>
  <div class="left">
    <div class="left-main">
      <div class="warn-list re">
        <img src="/favicon.ico" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  width: 10%;
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
