<template>
  <div>
    <div id="echartsGauge" style="width: 14vw;height: 14vh"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"

export default {
  data() {
    return {
      chart: null
    }
  },
  methods: {
    echartsGaugeInit(){
      // 初始化echarts实例
      this.chart = echarts.init(document.getElementById('echartsGauge'));
      this.chart.setOption({// 通过setOption来生成仪表盘
        series: [
          {
            name: 'A',//系列名称,用于tooltip的显示
            type: 'gauge',//仪表盘
            max: 200,//最大的数据值
            radius: '99%',//仪表盘半径,可以是百分比,也可以是绝对的数值
            splitNumber: 5,//仪表盘刻度的分割段数
            animationDuration: 3000,//初始动画的时长
            axisLine: {//仪表盘轴线
              lineStyle: {
                //轴线不同的颜色段
                color: [[0.2,'#00FFFF'],[0.8,'#3a80fa'],[1,'#ff0000']],
                width: 10,//轴线宽度
              }
            },
            splitLine: {//分割线
              length: 20,//分割线线长
              lineStyle: {
                color: 'auto'//分割线颜色
              }
            },
            axisTick: {//刻度样式
              length: 15,//刻度线长
              lineStyle: {
                color: 'auto'
              }
            },
            detail: {//仪表盘详情
              formatter:'{value}',
              color: '#ffd805',
              fontSize: 50,
              fontWeight: 'bold',
              fontFamily: 'FZLTHJW--GB1-0',
              //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移
              offsetCenter: [0, '75%']
            },
            data: [{value: 57}]
          }
        ]
      })
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.echartsGaugeInit()
    })
  }
}
</script>

<style scoped>

</style>
