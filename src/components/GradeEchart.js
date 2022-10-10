import * as echarts from "echarts";

let color = ['#0070fa', '#1dbeec', '#83be00', '#f3b200', '#f25022', '#b622f2', '#f22284', '#23c879', '#d5a86d', '#a6d338', '#b1c5de']

//柱状图统计
export function gradeStatistics(id, dataValue, name) {
    let gradeE = echarts.init(document.getElementById(id));
    gradeE.setOption({
        series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              center: ['50%', '75%'],
              radius: '90%',
              min: 0,
              max: 1000,
              splitNumber: 3, // 刻度粗细
              axisLine: {
                lineStyle: {
                  width: 5,
                  color: [
                    [0.25, '#FF6E76'],
                    [0.5, '#FDDD60'],
                    [0.75, '#58D9F9'],
                    [1, '#7CFFB2']
                  ]
                }
              },
              // 仪表箭头
              pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '10%',
                width: 12,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                length: 6,
                lineStyle: {
                  color: 'auto',
                  width: 2
                }
              },
              splitLine: {
                length: 10,
                lineStyle: {
                  color: 'auto',
                  width: 5
                }
              },
              axisLabel: {
                color: '#464646',
                fontSize: 20,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value) {
                  if (value === 0.875) {
                    return '';
                  } else if (value === 0.625) {
                    return '';
                  } else if (value === 0.375) {
                    return '';
                  } else if (value === 0.125) {
                    return '';
                  }
                  return '';
                }
              },
              // name字体大小
              title: {
                offsetCenter: [0, '-4%'],
                fontSize: 14,
                color: 'red'
              },
              // 数据展示
              detail: {
                fontSize: 16,
                offsetCenter: [0, '-35%'],
                valueAnimation: true,
                // formatter: function (value) {
                //   return Math.round(value * 100);
                // },
                color: 'auto'
              },
              data: [
                {
                  value: dataValue,
                  name: name
                }
              ]
            }
          ]
    })
  window.onresize = (val) => {
    gradeE.resize(val)
  };
}
