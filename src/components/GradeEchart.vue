<template>
  <div v-for="(item,index) in listData" :key="index">
    <div :id="item.id" style="width: 14vw;height: 14vh"></div>
  </div>
</template>

<script>
import {gradeStatistics} from './GradeEchart.js'

export default {
  name: "GradeEchart",
  data() {
    return {
      listData:[
        {id:11,dataValue:100,name:'已反馈'},
        {id:22,dataValue:200,name:'未反馈'},
        {id:33,dataValue:300,name:'总次数'}
      ]
    }
  },
  mounted() {
    this.listData.forEach(o=> {
      gradeStatistics(`${o.id}`,o.dataValue,o.name)
    })
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
