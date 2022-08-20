<template>
  <div id="dayEchart" ref="dayEchart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "dayEchart",
  data() {
    return {}
  },
  mounted() {
    this.dayEchart = echarts.init(this.$refs.dayEchart);
    this.dayEchart.setOption(this.dayEchartOption);
    window.onresize = () => {
      this.dayEchart.resize();
    }
  },
  computed: {
    dayEchartOption() {
      return {
        title: {
          text: "开发时间趋势",
        },
        xAxis: {
          axisLabel: {
            color: "#27b4c2"
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: "value",
          name: "",
          axisLabel: {
            textStyle: {
              // color: "#fff"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#27b4c2"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              // color: "#0C325B"
            }
          }

        },
        series: [
          {
            data: [120, 160, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
    },
  }
}
</script>

<style scoped>
#dayEchart {
  margin-top: 21px;
  width: 100%;
  height: 20vh;
}
</style>
