<template>
  <div>
    <div id="grade" style="width: 14vw;height: 14vh"></div>
  </div>
</template>

<script>
import {gradeStatistics} from './GradeEchart.js'

export default {
  name: "GradeEchart",
  data() {
    return {}
  },
  mounted() {
    gradeStatistics('grade',600,'已反馈')
    window.onresize = () => {
      gradeStatistics('grade',600,'已反馈')
    };
  },
  methods:{

  }
}
</script>

<style scoped>

</style>