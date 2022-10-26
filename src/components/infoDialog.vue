<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      v-model="showDialog"
      :modal="false"
      @close="handleClose"
      width="600px"
    >
      <div>
        辖区布控人员 “张某某” 出现在 “XXXXX地方”，请密切关注
        <el-button type="warning">查看轨迹</el-button>
        <div>{{ time }}s后关闭</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "infoDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false,
      timer: null,
      time: 15,
    };
  },
  watch: {
    dialogVisible() {
      this.showDialog = this.dialogVisible;
      if (this.showDialog == true) {
        clearInterval(this.timer);
        this.timer = null;
        this.time = 15;
        this.setTimer();
      }
    },
  },
  created() {
    // clearInterval(this.timer);
    // this.timer = null;
    // this.setTimer();
  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
      clearInterval(this.timer);
      this.timer = null;
    },
    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.time -= 1;
          if (this.time < 1) {
            this.handleClose();
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped></style>
