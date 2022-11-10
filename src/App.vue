<template>
  <div>
    <!--    左侧动画-->
    <div class="left-border" @click="animFn">
      <div v-show="!toggle">
        <el-icon size="40">
          <ArrowLeftBold/>
        </el-icon>
      </div>
      <div v-show="toggle">
        <el-icon size="40">
          <ArrowRightBold/>
        </el-icon>
      </div>
      <div class="animation">
        <leftAnimation/>
      </div>
    </div>
    <div class="rightAnimation">
      <RightAnimation/>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="3">
          <h2>Yepi-bit</h2>
        </el-col>
        <el-col :span="7">
          <div class="carousel" style="width: 80%; margin: auto;">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in 3" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="sub-tab-box">
            <div class="type-neme">开发分类</div>
            <dl :class="[{'on':ajTabIndex===1}]" @click="securityClassificationFn(1)">
              <dt><img src="./assets/goods-icon.png"/></dt>
              <dd>资料</dd>
            </dl>
            <dl :class="[{'on':ajTabIndex===2}]" @click="securityClassificationFn(2)">
              <dt><img src="./assets/human-icon.png"/></dt>
              <dd>体温</dd>
            </dl>
            <dl :class="[{'on':ajTabIndex===3}]" @click="securityClassificationFn(3)">
              <dt><img src="./assets/temperature-icon.png"/></dt>
              <dd>物品</dd>
            </dl>
            <dl :class="[{'on':ajTabIndex===4}]" @click="securityClassificationFn(4)">
              <dt><img src="./assets/vehicle-icon.png"/></dt>
              <dd>车辆</dd>
            </dl>
          </div>
          <div style="margin-top: 60px">
            <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="progressPercent"
                status="exception"
                :color="colorPercent"
                :format="formatProgress"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <DayEchart/>
        </el-col>
        <el-col :span="2">
          <p>成长值</p>
          <div class="demo-progress">
            <el-progress
                :text-inside="true"
                :stroke-width="18"
                :indeterminate="true"
                :format="format"
                :percentage="store.state.day"
                status="warning"
            />
            <div>{{ store.state.name }}最后提交于
              <timeDiff :dateTime="dateTime"/>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="margin-top: 21px; position: sticky; top: 6px;">
            <el-dropdown>
        <span class="el-dropdown-link">
          <img
              :src="modification ? store.state.img:'https://tse4-mm.cn.bing.net/th/id/OIP-C.msJ5-X_TC957GXCRltCiPAHaHa?pid=ImgDet&rs=1'"
              alt="" width="50" height="50">
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="open = true">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="modif">修改头像</el-dropdown-item>
                  <el-dropdown-item @click="outLogin">退 出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-drawer :modal="false" v-model="open" title="个人中心" :with-header="true">
            <span>Hi there!!!</span>
          </el-drawer>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        {{ nowDate }}
      </el-col>
      <el-col :span="8" id="newDiffId">
        预计 -- {{ newDiff }} <span v-if="outTime">~~ 你已经加班了</span><span v-else>~~ 开发中</span>
        <van-progress
            stroke-width="6"
            v-if="parseInt(((1 - (diffEight / eight)) * 100).toFixed(3)) < 0 ? false : true"
            :percentage="((1 - (diffEight / eight)) * 100).toFixed(3)"
            pivot-color="#7232dd"
            style="margin-top: 21px;"
            color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </el-col>
      <info-dialog :dialogVisible="dialogVisible" @changeShow="closeDialog"/>
      <el-col :span="8">
        <el-button type="primary">{{ auth_time }}</el-button>
        <el-button @click="onload" :loading="loading">重启</el-button>
        <el-button type="warning" @click="clickInfo">预警</el-button>
        <el-button @click="total" :disabled="disadbled">点击</el-button>
        ---{{ num }}
        <span>
          <el-button type="info" plain @click="cancel">取消</el-button>
        </span>
        <el-button type="warning" plain @click="addClick">+</el-button>
        <span>{{ store.state.count }}</span>
      </el-col>
    </el-row>
    <div>
      <canvas id="bg" style="position: absolute;z-index: -9999;"></canvas>
    </div>
    <div
        @mousemove="xCoordinate"
        :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
        class="movearea"
    >
      <h3>Move your mouse across the screen...</h3>
      <span>x: {{ x }}</span>
      <span>y: {{ y }}</span>
    </div>
    <!--       下拉动画   -->
    <!--    style="transform: rotate(90deg)"-->
    <div>
      <el-collapse-transition>
        <div v-show="moreCondition">
          1
        </div>
      </el-collapse-transition>
      <el-button class="mc-btn" type="text" @click="moreCondition = !moreCondition"
                 :icon="moreCondition ? ArrowUpBold : ArrowDownBold">
      </el-button>
    </div>
    <div v-show="!show">
      <Slide/>
    </div>
    <div v-show="!show">
      <Nav/>
    </div>
    <div>
      <el-row>
        <el-col :span="8">
          <el-button @click="show = !show">Click Me</el-button>

          <div style="margin-top: 20px; height: 200px">
            <el-collapse-transition>
              <div v-show="show">
                <div class="transition-box">动画渐变效果</div>
                <div class="transition-box">el-collapse-transition</div>
              </div>
            </el-collapse-transition>
          </div>
        </el-col>
        <el-col :span="8">
          <div @click="parentMethod">
            <animation ref="c1"/>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button @click="addWatermark">点我添加水印</el-button>
          <div ref="waterMarkcontent" style="width: 300px;height: 200px;border: 1px solid #7232dd;">
          </div>
        </el-col>
        <el-col :span="4">
          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in timeLine.activities"
                :key="index"
                :timestamp="activity.timestamp">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>

    <transition name="fade">
      <p id="back-top" v-if="backTopFlag" @click="scollTo(0)">
        <span>
        <el-icon>
          <Top/>
        </el-icon>
        </span>

      </p>
    </transition>
    <nav>
      <router />
      <span style="font-weight: bold;font-size: 17px;margin-left: 14px">({{ routerLength }})</span>
    </nav>
    <router-view/>
  </div>
</template>
<script setup>
import watermark from './utils/watermark.js'
import timeDiff from "./components/timeDiff.vue";
import dayjs from 'dayjs'
import $ from 'jquery'
import {onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {Top, ArrowLeftBold, ArrowRightBold, ArrowDownBold, ArrowUpBold} from '@element-plus/icons-vue'
import {useRouter, useRoute} from "vue-router";
// 使用store in vue3
import {mapActions, useStore} from 'vuex'

import leftAnimation from "./components/leftAnimation.vue";
import Slide from "./components/Slide.vue";
import Nav from "./components/Nav.vue";
import DayEchart from "./components/dayEchart.vue";
import RightAnimation from "./components/rightAnimation.vue";
import animation from "./components/animation.vue";
import Router from "./components/router.vue";
import InfoDialog from "./components/infoDialog.vue";

const store = useStore()
const router = useRouter()
const route = useRoute()
const dateTime = ref('2022-11-10 14:12:00') // 2022-09-08 17:18:00

const ajTabIndex = ref(1)
const securityClassificationFn = (i) => {
  ajTabIndex.value = i;
}
// const changeTime = () => {
//   let changeTime = document.getElementById('changeTime')
//   changeTime.style.color = onBg()
// }
// 局部水印
const waterMarkcontent = ref('')
const addWatermark = () => {
  watermark.set("泰帥啦~~~🏀", waterMarkcontent.value)
}
const moreCondition = ref(false)
const toggle = ref(false)
const routerLength = ref('')
const timeLine = reactive({
  activities: []
})
const parentMethod = () => {
  this.$refs.c1.changeShow(true);
}
const scrollTop = ref(0)
const backTopFlag = ref(false)
const loading = ref(false)
const onload = () => {
  loading.value = true
  setTimeout(() => {
    location.reload();
    loading.value = false
  }, 800)
}
const dialogVisible = ref(false)
const clickInfo = () => {
  dialogVisible.value = true
}
const closeDialog = (data) => {
  if(data === 'false'){
    dialogVisible.value = false
  }else{
    dialogVisible.value = true
  }
}
// 流星雨随机颜色
const getRandomColor = () => {
  const fontColors = [
    '#33B5E5',
    '#67C23A',
    '#E6A23C',
    '#F56C6C',
    '#909399',
    '#409EFF'
  ]
  return fontColors[Math.floor(Math.random() * fontColors.length)]
}
const getRandomChar = () => {
  const str = 'console.log("hello world")'
  return str[Math.floor(Math.random() * str.length)]
}
const canvasRain = () => {
  const cvs = document.getElementById('bg')
  // let height1 = Math.floor(Math.random() * window.innerHeight);
  const width = window.innerWidth, height = window.innerHeight
  cvs.width = width
  cvs.height = height
  const ctx = cvs.getContext('2d')
  const columnWidth = 20
  const columnCount = Math.floor(window.innerWidth / columnWidth)
  const columnNextIndex = new Array(columnCount)
  columnNextIndex.fill(1)

  ctx.fillStyle = 'rgba(240,240,240,0.1)'
  ctx.fillRect(0, 0, width, height)
  const fz = 20
  ctx.fillStyle = getRandomColor()

  ctx.font = `${fz}px "Roboto Mono"`
  for (let i = 0; i < columnCount; i++) {
    const x = i * columnWidth;
    const y = fz * columnNextIndex[i]
    ctx.fillText(getRandomChar(), x, y)
    if (y > height && Math.random() > 0.99) {
      columnNextIndex[i] = 0
    } else {
      columnNextIndex[i]++
    }
  }
}

// 监听页面点击
const arrClick = ref([])
// window.addEventListener("mousedown", e => {
//   arrClick.value.push(parseInt(e.clientX))
//   timeLine.activities.push({
//     content: '点击X轴' + Object.values(arrClick.value) + '坐标',
//     timestamp: new Date().toLocaleString()
//   })
//   if (timeLine.activities.length === 3) {
//     // timeLine.activities = timeLine.activities.substring(timeLine.activities.length, -3)
//     return;
//   }
//   console.log('点击X轴' + Object.values(arrClick.value) + '坐标')
// });

const animFn = () => {
  if (toggle.value === false) {
    $('.animation .left').animate({
      left: '-200px',
    }, 800)
    setTimeout(function () {
      toggle.value = true
    }, 800)
  } else {
    $('.animation .left').animate({
      left: '0',
    }, 800)
    setTimeout(function () {
      toggle.value = false
    }, 800)
  }
}

const modification = ref(false)
const x = ref(916);
const y = ref(0);
const nowDate = ref('');
const newDiff = ref('')
const disadbled = ref(false);
const show = ref(true);
// 退出登录
const outLogin = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("passWord");
  router.push({path: "/login"})
}
const open = ref(false)
// 修改头像
const modif = () => {
  modification.value = !modification.value
}
const xCoordinate = e => {
  x.value = e.clientX
  y.value = e.clientY
}
const total = () => {
  num.value += 1;
  if (num.value === 6 || num.value === 10) {
    ElMessage({
      type: "success",
      message: "目标以达到",
    });
    disadbled.value = true;
  }
};
// vue3 store使用
const addClick = () => {
  store.commit('increment')
}
const cancel = () => {
  disadbled.value = false;
};
const str = ref('')
const num = ref(0);
const eight = ref('')
const diffEight = ref('')
// const timer = setInterval(() => {
//   nowDate.value = new Date().toLocaleString();
// });

const auth_time = ref(2)
const timeNext = () => {
  // 倒计时
  let authTimeTimer = setInterval(() => {
    auth_time.value -= 1;
    if (auth_time.value < 0) {
      clearInterval(authTimeTimer);
      auth_time.value = 0
      ElMessage({
        type: "warning",
        message: "倒计时结束了",
      });
    } else {
      ElMessage({
        type: "warning",
        message: "倒计时开始了",
      });
    }
  }, 1000);
}
const handleScroll = () => {
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollY > 100) {
    console.log('200')
  }
}

onMounted(() => {
  // changeTime()
  watermark.set("TJian 3451")
  timeNext()
  let timers2 = null
  timers2 = setInterval(() => {
    canvasRain()
  }, 200)
  growth()
  window.addEventListener('scroll', handleScroll)

  window.addEventListener('scroll', getScroll);
  routerLength.value = router.options.routes.length
  let timers = null
  timers = setInterval(() => {
    lastTime()
    dateFormat()
  }, 1000)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', getScroll);
  if (timers) {
    clearInterval(timers);
  }
  if (timers2) {
    clearInterval(timers2);
  }
})
watch(scrollTop,
    value => {
      if (value > 50 && backTopFlag.value === false) {
        backTopFlag.value = true
      } else if (value <= 50 && backTopFlag.value === true) {
        backTopFlag.value = false
      }
    }, {deep: true, immediate: true}
)
const getScroll = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
const scollTo = (offset) => {
  window.scrollTo({top: offset, behavior: 'smooth'})
}
// 随机颜色
const bgColor = ref('')
const onBg = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  bgColor.value = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return bgColor.value;
}
// 成长值
const format = (percentage) => (percentage > 0 ? `${percentage}~~经验` : '小白')
const growth = () => {
  var dateGrowth = new Date();
  // let log = dayjs(dateGrowth).format('YYYY-MM-DD HH:mm:ss')
  let weeHours = `${dateGrowth.getFullYear()}/${dateGrowth.getMonth() + 1}/${dateGrowth.getDate()} 23:59:59`
  let weeHoursToString = Date.parse(weeHours)
  let diffGrowth = weeHoursToString - dateGrowth
  if (diffGrowth < 0) {
    store.commit('dayLength')
    store.state.day = window.localStorage.getItem('day')
  }
}

const dateFormat = () => {
  var date = new Date();

  var year = date.getFullYear();
  var month =
      date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let week = date.getDay(); // 星期
  let weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  // 拼接 时间格式处理
  return nowDate.value = (
      year +
      "年" +
      month +
      "月" +
      day +
      "日 " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      weekArr[week]
  );
};

const lastTime = () => {
  let time = new Date().getTime()
  let t = new Date()
  var y = t.getFullYear();
  var m =
      t.getMonth() + 1 < 10
          ? "0" + (t.getMonth() + 1)
          : t.getMonth() + 1;
  let preTime = `${y}/${m}/${t.getDate()} 17:30:00`
  let preTimeToString = Date.parse(preTime)
  let nine = `${y}/${m}/${t.getDate()} 09:00:00`
  let nineToString = Date.parse(nine)
  eight.value = preTimeToString - nineToString
  diffEight.value = preTimeToString - time
  let diff = preTimeToString - time
  let D = check(parseInt(diff / (1000 * 60 * 60 * 24)))
  let H = check(parseInt(diff / (1000 * 60 * 60) % 24))
  let M = check(parseInt(diff / (1000 * 60) % 60))
  let S = check(parseInt(diff / 1000 % 60))

  let newDiffId = document.getElementById('newDiffId')
  if (S) {
    newDiffId.style.color = onBg()
  }
  // var i = "123456789";
  // var patt = /^[0-9]*$/g;
  // var result = i.match(patt);
  // var results = []
  // result.forEach((item)=>{
  //   results.push(item)
  // })
  if (S === 59 || S === `${'0-' + '59'}`) {
    Time()
  }
  if (H === H && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "warning",
      message: "温馨提示: 又过一小时啦~~",
    });
  } else if (H === `${'0' + '1'}` && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "warning",
      message: "温馨提示: 剩余1小时啦~~",
    });
  } else if (H === H && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "success",
      message: "温馨提示: 已经下班啦~~",
    });
    parentMethod()
  }
  if (diff < 0) {
    outTime.value = true
  }
  return newDiff.value = H + "小时" + M + "分" + S + "秒"
}
const outTime = ref(false)
const check = (t) => {
  if (t < 10) {
    return '0' + t
  }
  return t
}
const setFifTime = ref(6)
const progressPercent = ref(100)
const formatProgress =(percentage) => (percentage > 0 ? `${percentage}s` : '开始')
const colorPercent = () => {
  return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
}
const Time = () => {
  let timeSet = setInterval(() => {
    setFifTime.value -= 1
    let setFifCount = 6
    progressPercent.value = parseInt(setFifTime.value * 100 / setFifCount);
    // ElMessage({
    //   type: "success",
    //   duration: `${setFifTime.value * 1000}`,
    //   message: `倒计时${setFifTime.value}`,
    // })
    if (setFifTime.value < 1) {
      clearInterval(timeSet)
      setFifTime.value = 6
      progressPercent.value = 100
    }
  }, 1000)
}
const showImage = () => {
  show.value = false;
};
</script>
<style lang="less">
@import "./assets/css/base.less";

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

::-webkit-scrollbar {
  background-color: transparent;
}

@media screen and (max-width: 1600px) {
  body {
    background-color: #ffffff;
  }
}

@media (min-width: 1000px) and (max-width: 1200px) {
  body {
    background-color: darkgoldenrod;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 100px;
    height: 50px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
}

@media screen and (max-width: 750px) {
  body {
    background-color: darkcyan;
  }
}

.el-drawer {
  background-color: transparent !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  /*margin-top: 60px;*/
}

.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.movearea {
  transition: 0.2s background-color ease;
}

img {
  border-radius: 50%;
  box-shadow: 2px 2px 2px 2px slategray;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

#back-top span {
  cursor: pointer;
  height: 50px;
  margin: -125px 0 0;
  overflow: hidden;
  padding: 0;
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  z-index: 11;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .16);
  border-radius: 50%;
  display: flex;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  /*background: url('../assets/about/rocket.png') no-repeat;*/
}

#back-top:hover span {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 1s;
}

.left-border {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 4;
}

.demo-progress .el-progress--line {
  width: 180px;
}

.rightAnimation {
  position: absolute;
  /*top: 0;*/
  right: 6px;
  width: 10%;
  z-index: 10;
}

.mc-btn {
  width: 100%;
  padding: 6px;
  background-color: #F2F6FC;
  color: #409EFF;
}

.mc-btn:hover {
  background-color: #409EFF;
  color: white;
}

.sub-tab-box {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;

  .type-neme {
    width: 50px;
    height: 100%;
    background-color: #054065;
    border-radius: 8px;
    font-size: 18px;
    color: #b2dbf5;
    padding: 26px 26px;
    text-align: center;
    position: relative;

    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-left: 8px solid #054065;
      border-bottom: 8px solid transparent;
      position: absolute;
      top: 50px;
      right: -8px;
    }
  }

  dl {
    width: 60px;
    height: 112px;
    background: url(./assets/top-num-bg.png)no-repeat center;
    background-size: 100% 100%;
    display: inline-block;
    //background-color: #054065;
    text-align: center;
    margin: 0;
    cursor: pointer;

    dt {
      height: 36px;
      margin-top: 16px;

      img {
        height: 28px;
      }
    }

    dd {
      margin: 0;
      color: #b2dbf5;
      line-height: 48px;
      font-size: 14px;
    }

    &.on {
      border: 1px solid #00e7eb;
      background-image: linear-gradient(to bottom, #023555, #023555, #0a778c);
    }
  }
}
</style>
