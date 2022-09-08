<template>
  <span style="font-size: 13px" id="changeTime">{{ content }}</span>
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
    this.changeTime()
  },
  methods: {
    changeTime() {
      let changeTime = document.getElementById('changeTime')
      let s = new Date().getMinutes()

      let timer = null
      timer = setInterval(()=> {
        if (0 < s < 30) {
          changeTime.style.color = this.onBg()
        }
      },10000)
      clearTimeout(timer)
    },
    onBg() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      let bgColor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return bgColor;
    },
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

