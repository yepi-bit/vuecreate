<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
        class="page-login--layer page-login--layer-time"
    >
      {{ time }}
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      loading: false,
    }
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    refreshTime() {
      this.time = dayjs().format('HH:mm:ss')
    },
  }
}
</script>

<style scoped>
.page-login {
  background-color: black;
  height: 60vh;
  position: relative;
}

.page-login .page-login--layer {
  overflow: auto;
}

.page-login .page-login--layer-area {
  overflow: hidden;
}

.page-login .page-login--layer-time {
  font-size: 30px;
  font-weight: bold;
  color: palevioletred;
  overflow: hidden;
}

.page-login .page-login--layer-area .circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
}

.page-login .page-login--layer-area .circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: #FFF;
  animation: animate 25s linear infinite;
  bottom: -200px;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.page-login .page-login--layer-area .circles li:nth-child(1) {
  left: 15%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.page-login .page-login--layer-area .circles li:nth-child(2) {
  left: 5%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.page-login .page-login--layer-area .circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.page-login .page-login--layer-area .circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.page-login .page-login--layer-area .circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.page-login .page-login--layer-area .circles li:nth-child(6) {
  left: 75%;
  width: 150px;
  height: 150px;
  animation-delay: 3s;
}

.page-login .page-login--layer-area .circles li:nth-child(7) {
  left: 35%;
  width: 200px;
  height: 200px;
  animation-delay: 7s;
}

.page-login .page-login--layer-area .circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.page-login .page-login--layer-area .circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.page-login .page-login--layer-area .circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}
</style>
