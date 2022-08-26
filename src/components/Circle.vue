<template>
  <div class="circle-main">
    <div
        class="circle-main-box"
        :style="[{ width: size + 'px', height: size + 'px' }]"
    >
      <svg :width="size" :height="size" class="circle">
        <circle
            :r="radius"
            :cx="cx"
            :cy="cy"
            fill="transparent"
            stroke="#EEEEEE"
            :stroke-width="strokeWidth"
        />
        <circle
            :r="radius"
            :cx="cx"
            :cy="cy"
            fill="transparent"
            :stroke="color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progress"
        />
      </svg>
      <span
          class="count-num"
          :style="[{ 'font-size': size * 0.3 + 'px' }]"
      >{{ countDown }}%
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Circle',
  data() {
    return {
      now: 0,
    };
  },
  props: {
    // 进度值
    value: {
      type: [String, Number],
      default: 0,
    },
    // 尺寸
    size: {
      type: [String, Number],
      default: 120,
    },
    // 边框粗细
    strokeWidth: {
      type: [String, Number],
      default: 10,
    },
    // 进度条颜色
    color: {
      type: String,
      default: 'rgba(153,202,251,1)',
    },
    // 动画执行时间
    duration: {
      type: [String, Number],
      default: 1000,
    },
  },
  computed: {
    percentage() {
      return this.value;
    },
    countDown() {
      return this.now;
    },
    // 圆心x轴坐标
    cx() {
      return this.size / 2;
    },
    // 圆心y轴坐标
    cy() {
      return this.size / 2;
    },
    // 半径
    radius() {
      return (this.size - this.strokeWidth) / 2;
    },
    // 圆周长
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    // 进度长度
    progress() {
      return (1 - this.now / 100) * this.circumference;
    },
  },
  mounted() {
    this.run();
  },
  methods: {
    run() {
      if (this.value === 0) return;
      let t = this.duration / this.value;
      this.timer = setInterval(() => {
        if (this.now >= this.value) {
          return clearInterval(this.timer);
        }
        this.now++;
      }, t);
    },
  }
};
</script>

<style scoped>
.circle {
  transform: rotate(-90deg);
}
.circle-main-box {
  position: relative;
  display: block;
  margin: 0 auto;
}
.count-num {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: fantasy;
  font-size: 30px;
  color: #333;
  user-select: none;
}
</style>
