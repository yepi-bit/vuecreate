<template>
  <div v-for="(item,index) in listData" :key="index" style="display: flex;">
    <span :id="item.feekbackNum+index" style="width: 8vw;height: 14vh;"></span>
    <span :id="item.noFeekbackNum+index" style="width: 8vw;height: 14vh;"></span>
    <span :id="item.feekbackToal+index" style="width: 8vw;height: 14vh;"></span>
  </div>
</template>

<script>
import {gradeStatistics} from '../components/GradeEchart.js'

export default {
  data() {
    return {
      listData:[
        {id:1,applyType:6,assNum:370,noFeekbackNum:800,feekbackToal:134},
        {id:2,applyType:7,feekbackNum:520,noFeekbackNum:801,feekbackToal:257},
        {id:3,applyType:7,feekbackNum:770,noFeekbackNum:551,feekbackToal:310},
      ]
    }
  },
  mounted() {
    this.listData.forEach((o,i)=> {
      gradeStatistics(`${o.feekbackNum+i}`,o.applyType==6?o.assNum:o.feekbackNum,o.applyType==6?'协查':'已反馈')
      gradeStatistics(`${o.noFeekbackNum+i}`,o.noFeekbackNum,o.applyType==7?'未反馈':'未反馈')
      gradeStatistics(`${o.feekbackToal+i}`,o.feekbackToal,o.applyType==7?'总次数':'总次数')
    })
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
