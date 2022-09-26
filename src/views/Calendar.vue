<template>
  <div class="top-box" style="width: 30%;height: 330px;padding:10px;margin: auto">
    <el-calendar v-model="calendarValue" ref="calendar" @click="calendarClick">
      <template
          slot="dateCell"
          slot-scope="{date,data}"
      >
        <div :class="calendarData.indexOf(data.day) > -1 ? 'lar-is-selected' : 'lar-no-selected'"
             @click="holidayUpdate(data,date)"></div>
      </template>
    </el-calendar>
    <el-button @click="skip('today')">今天</el-button>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      calendarValue: "",
      calendarData: [
        '2022-09-25',
        '2022-09-26',
        '2022-09-27'
      ]
    }
  },
  mounted() {
    // console.log(this.$refs.calendar)
  },
  methods: {
    calendarClick(e) {
      console.log(e)
    },
    skip(val) {
      if (val === 'today') {
        this.calendarValue = new Date()
        console.log(this.calendarValue)
      }
    },
    holidayUpdate(data,date) {
      console.log(data,date,"1111111111111111111")
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
.lar-is-selected {
  background-color: rebeccapurple !important;
}
.lar-no-selected {
  background-color: rosybrown !important;
}
</style>
