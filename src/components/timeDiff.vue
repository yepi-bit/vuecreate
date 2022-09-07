<template>
  <span style="font-size: 13px">{{ content }}</span>
</template>

<script>
export default {
  data() {
    return {
      content: '',
    }
  },
  props: {
    dateTime: {
      type: String,
      default: new Date().toString()
    }
  },
  mounted() {
    this.diffTime()
  },
  methods: {
    diffTime() {
      if (new Date().getTime() - new Date(this.dateTime).getTime() < 60) {
        return '刚刚'
      }
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let halfMonth = day * 15;
      let month = day * 30;

      let now = new Date().getTime();
      let diffValue = now - new Date(this.dateTime).getTime();

      let monthC = diffValue / month;
      let halfMonthC = diffValue / halfMonth;
      let weekC = diffValue / (7 * day);
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      if (parseInt(monthC) >= 1) {
        this.content = parseInt(monthC) + '个月前'
      } else if (parseInt(halfMonthC) > 1) {
        this.content = parseInt(halfMonthC) + '半个月前'
      } else if (parseInt(dayC) > 1) {
        this.content = parseInt(dayC) + '天前'
      } else if (parseInt(dayC) === 1) {
        this.content = '昨天'
      } else if (parseInt(hourC) >= 1) {
        this.content = parseInt(hourC) + "小时前";
      } else if (parseInt(minC) >= 1) {
        this.content = parseInt(minC) + "分钟前";
      } else {
        this.content = "刚刚";
      }
    }
  }
}
</script>

<style>

</style>

