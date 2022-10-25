<template>
  <data-year-month/>
</template>

<script>
import DataYearMonth from "../components/dataYearMonth.vue";

export default {
  name: "yearMonth",
  components: {DataYearMonth},
  data() {
    return {}
  },
  methods: {
    // 父页面添加 日期改变的方法
    dateChange(obj) {
      if (obj.year == 0) {
        return
      }
      if (obj.month == 0) {
        console.log(obj.year)
      } else {
        this.dataUptate()
        console.log(obj.year + '-' + (obj.month >= 10 ? obj.month : 0 + '' + obj.month))
      }
    },
    dataUptate(){
      console.log('dataUptate啦')
    }
  }
}
</script>

<style scoped>

</style>