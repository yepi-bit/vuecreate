<template>
  <div v-for="(item,index) in listData" :key="index" style="display: flex;">
    <span :id="item.dataValue+index" style="width: 14vw;height: 14vh;"></span>
    <span :id="item.feekbackNum+index" style="width: 14vw;height: 14vh;"></span>
    <span :id="item.noFeekbackNum+index" style="width: 14vw;height: 14vh;"></span>
  </div>
</template>

<script>
import {gradeStatistics} from '../components/GradeEchart.js'

export default {
  data() {
    return {
      listData:[
        {id:1,dataValue:100,feekbackNum:300,noFeekbackNum:800,name:'已反馈'},
        {id:2,dataValue:200,feekbackNum:500,noFeekbackNum:800,name:'未反馈'},
        {id:3,dataValue:300,feekbackNum:700,noFeekbackNum:500,name:'总次数'}
      ]
    }
  },
  mounted() {
    this.listData.forEach((o,i)=> {
      gradeStatistics(`${o.dataValue+i}`,o.dataValue,o.name)
      gradeStatistics(`${o.feekbackNum+i}`,o.feekbackNum,o.name)
      gradeStatistics(`${o.noFeekbackNum+i}`,o.noFeekbackNum,o.name)
    })
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
