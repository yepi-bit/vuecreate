<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3">
        <h2>Yepi-bit</h2>
      </el-col>
      <el-col :span="19">
        <div style="width: 60%; margin: auto">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="margin-top: 21px; position: sticky; top: 6px">
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
        <el-drawer v-model="open" title="个人中心" :with-header="true">
          <span>Hi there!</span>
        </el-drawer>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        {{ nowDate }}
      </el-col>
      <el-col :span="8" id="newDiffId">
        预计 -- {{ newDiff }}
        <van-progress
            stroke-width="6"
            v-if="parseInt(((1 - (diffEight / eight)) * 100).toFixed(3)) < 0 ? false : true"
            :percentage="((1 - (diffEight / eight)) * 100).toFixed(3)"
            pivot-color="#7232dd"
            style="margin-top: 21px;"
            color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </el-col>
      <el-col :span="8">
        <el-button @click="total" :disabled="disadbled">点击</el-button>
        ---{{ num }}
        <span>
          <el-button type="info" plain @click="cancel">取消</el-button>
        </span>
        <el-button type="warning" plain @click="addClick">+</el-button>
        <span>{{ store.state.count }}</span>
      </el-col
      >
    </el-row>
    <div
        @mousemove="xCoordinate"
        :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
        class="movearea"
    >
      <h3>Move your mouse across the screen...</h3>
      <span>x: {{ x }}</span>
      <span>y: {{ y }}</span>
    </div>
    <div>
      <el-row>
        <el-col :span="20">
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
    <nav>
      <router-link to="/login">login</router-link>
      |
      <router-link to="/">Home</router-link>
      |
      <router-link to="/rank/:id">About</router-link>
      |
      <router-link to="/result">Result</router-link>
      |
      <router-link to="/terminal">Terminal</router-link>
      |
      <router-link to="/canvas">Canvas</router-link>
      |
      <router-link to="/tableClick">TableClick</router-link>
      |
      <router-link to="/storeTest">StoreTest</router-link>
      |
    </nav>
    <router-view/>
  </div>
</template>
<script setup>
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {ArrowDown} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
// 使用store in vue3
import {mapActions, useStore} from 'vuex'

const store = useStore()
const router = useRouter()

const timeLine = reactive({
  activities: [{
    content: '活动按期开始',
    timestamp: new Date().toLocaleString()
  }, {
    content: '通过审核',
    timestamp: new Date().toLocaleString()
  }, {
    content: '创建成功',
    timestamp: new Date().toLocaleString()
  }]
})
// 监听页面点击
const listenerArr = ref('')
window.addEventListener("click", e => {
  console.log(parseInt(e.timeStamp / 1000))
  const arr = []
  listenerArr.value = arr.push(parseInt(e.timeStamp / 1000))
  console.log(arr)
});
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
  console.log(store.state.count)
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


onMounted(() => {

  let timers = null
  timers = setInterval(() => {
    lastTime()
    dateFormat()
  }, 1000)
})
onBeforeUnmount(() => {
  if (timers) {
    clearInterval(timers);
  }
})
// 随机颜色
const bgColor = ref('')
const onBg = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  bgColor.value = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return bgColor.value;
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
  if (H === H && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "warning",
      message: "温馨提示: 又过一小时啦~~",
    });
  } else if (H === `${'0' + '1'}` && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "warning",
      message: "温馨提示: 剩余小时啦~~",
    });
  } else if (H === `${'0' + '0'}` && M === `${'0' + '0'}` && S === `${'0' + '0'}`) {
    ElMessage({
      type: "success",
      message: "温馨提示: 已经下班啦~~",
    });
  }
  return newDiff.value = H + "小时" + M + "分" + S + "秒"
}

const check = (t) => {
  if (t < 10) {
    return '0' + t
  }
  return t
}

const showImage = () => {
  show.value = false;
};
</script>
<style>
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

</style>
