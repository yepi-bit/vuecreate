<template>
  <div id="dayEchart" ref="dayEchart"></div>
  <el-progress :percentage="average" :indeterminate="true"/>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "dayEchart",
  data() {
    return {
      h: '',
      dataList: [],
      week: '',
      days: [],
      valueTime: [],
      average: ''
    }
  },
  mounted() {
    this.getDay()
    this.timeLength()
    this.dayEchart = echarts.init(this.$refs.dayEchart);
    this.dayEchart.setOption(this.dayEchartOption);

    this.average = (this.dayEchartOption.series[0].data.reduce((a, b) => a + b) / 7).toFixed(2) //10
    window.onresize = () => {
      this.dayEchart.resize();
    }

  },
  methods: {
    getDay() {
      for (let i = 0; i <= 24 * 6; i += 24) {		//今天加上前6天
        let dateItem = new Date(new Date().getTime() - i * 60 * 60 * 1000);	//使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        let m = dateItem.getMonth() + 1;	//获取月份js月份从0开始，需要+1
        let d = dateItem.getDate();	//获取日期
        // m = addDate0(m);	//给为单数的月份补零
        // d = addDate0(d);	//给为单数的日期补零
        let valueItem = m + '.' + d;	//组合
        if (d === new Date().getDate()) {
          valueItem = "今天"
        }
        if (d === new Date().getDate() - 1) {
          valueItem = "昨天"
        }
        this.days.push(valueItem);	//添加至数组
      }
      // this.valueTime.push(Object.values(this.days))
      this.valueTime = Array.from(this.days.reverse());
    },
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
      this.week = weekArr[d] === "星期一" ? "rgb(91,161,253)" : weekArr[d] === "星期二" ?
          "rgb(1,161,13)" : weekArr[d] === "星期三" ? "rgb(100,241,10)" : weekArr[d] === "星期四" ? "rgb(100,21,11)" : "rgb(251,121,15)"
      let everyDay = localStorage.getItem('everyDay')
      this.dataList = [everyDay * 10, Math.floor(Math.random() * 500), Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)]
    }
  },
  computed: {
    dayEchartOption() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: "开发时间趋势",
        },
        xAxis: {
          axisLabel: {
            color: "#27b4c2"
          },
          data: this.valueTime
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
              // color:this.week
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // // 定制显示（按顺序）
                // color: function(params) {
                //   let colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ];
                //   return colorList[params.dataIndex]
                // }

                // color: function () { //随机颜色
                //   return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
                // }
                // 不论 X 轴有多少数据点，每一个柱子的颜色都是不一样的。
                color: function () {
                  return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
                }
              },
            },
            data: this.dataList,
            type: 'bar',
            label: {
              show: true,
              position: 'middle', // middle, bottom, top
              // formatter: 'h' // 自定义
            },
            markPoint: {
              data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
              ]
            },
            markLine: {
              data: [{
                type: 'average',
                name: 'Avg',
                // silent:true,      // 鼠标悬停
                lineStyle: {         //警戒线的样式  ，虚实  颜色
                  type: "solid",
                  color: "#7232dd"
                },
              }],
              // symbol:"none",               //去掉警戒线最后面的箭头
              label: {
                // position:"middle"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
            }
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
