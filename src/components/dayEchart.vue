<template>
  <div id="dayEchart" ref="dayEchart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "dayEchart",
  data() {
    return {
      h: '',
      dataList: [],
      week: ''
    }
  },
  mounted() {
    this.timeLength()
    this.dayEchart = echarts.init(this.$refs.dayEchart);
    this.dayEchart.setOption(this.dayEchartOption);
    window.onresize = () => {
      this.dayEchart.resize();
    }
  },
  methods: {
    timeLength() {
      var H = new Date()
      this.h = H.getSeconds()
      var d = H.getDay()
      localStorage.setItem('everyDay', this.h)
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      this.week = weekArr[d] === "星期一" ? "rgb(91,161,253)" : weekArr[d] === "星期二" ? "rgb(1,161,13)" : weekArr[d] === "星期三" ? "rgb(100,241,10)" : weekArr[d] === "星期四" ? "rgb(100,21,11)" : "rgb(251,121,15)"
      let everyDay = localStorage.getItem('everyDay')
      this.dataList = [everyDay * 10, 160, 250, 80, 70, 20, 200]
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
            itemStyle: {
              color: this.week,
            },
            data: this.dataList,
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
  height: 24vh;
}
</style>
