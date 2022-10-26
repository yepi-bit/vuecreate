<template>
  <div id="myDate">
    <el-select v-model="yearsModel" @change="dateChange(1)" placeholder="请选择" style="width:200px;">
      <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="monthsModel" @change="dateChange(2)" placeholder="请选择" style="width:200px;">
      <el-option
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearsModel: null,
      years: [],
      monthsModel: null,
      months: [],
      daysModel: null,
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var myDate = new Date;
      var year = myDate.getFullYear();//获取当前年
      var month = myDate.getMonth() + 1;//获取当前月
      var day = myDate.getDate();//获取当前日

      this.initSelectYear(year)
      this.initSelectMonth();
      this.yearsModel = year;
      this.monthsModel = month;
      this.daysModel = day;
      let obj = {year: this.yearsModel, month: this.monthsModel, day: this.daysModel}
      this.$parent.dateChange(obj);
    },
    initSelectYear(year) {
      this.years = [];
      this.years.push({value: 0, label: "请选择"});
      for (let i = 0; i < 20; i++) {
        this.years.push({value: (year - i), label: (year - i) + "年"});
      }
    },
    initSelectMonth() {
      this.months = [];
      this.months.push({value: 0, label: "本年度"});
      for (let i = 1; i <= 12; i++) {
        this.months.push({value: i, label: i + "月"});
      }
    },
    dateChange(type) {
      //操作父组件方法
      let obj = {year: this.yearsModel, month: this.monthsModel}
      this.$parent.dateChange(obj);
    },
  }
}
</script>
