<template>
  <div class="top-box" style="width: 30%;height: 330px;padding:10px;margin: auto">
    <el-calendar v-model="calendarValue"></el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      calendarValue:""
    }
  }
}
</script>

<style scoped>
::v-deep .el-calendar {
  background-color: #132a46;
  color: #fff;
}
::v-deep .el-calendar .el-calendar__title {
  color: #fff;
}
::v-deep .el-calendar .el-button {
  background: transparent;
  color: #fff;
}
::v-deep .el-calendar .el-calendar-table thead th {
  color: #fff;
}
::v-deep .el-calendar .el-calendar-table td {
  border: 1px solid #42556b;
}
::v-deep .el-calendar .el-calendar__header {
  border-bottom: 1px solid #42556b;
}

::v-deep .el-calendar-table .el-calendar-day {
  padding: 0;
  height: 33px;
  text-align: center;
  line-height: 33px;
  background: #1d436a;
  color: #4bf3f9;
}

::v-deep .el-calendar-table thead th {
  padding: 5px 0;
}
</style>
