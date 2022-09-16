<template>
  <div class="praise_bubble" id="praise_bubble">
    <div class="bubble b1 bl1">111</div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  zan()
})
const addPraise = () => {
  let praiseBubble = document.getElementById("praise_bubble");
  const b = Math.floor(Math.random() * 6) + 1;
  const bl = Math.floor(Math.random() * 11) + 1; // bl1~bl11
  let d = document.createElement("div");
  d.className = `bubble b${b} bl${bl}`;
  d.dataset.t = String(Date.now());
  praiseBubble.appendChild(d);

}
const zan = () => {
  let last = 0;
  last = setInterval(() => {
    addPraise();
  }, 300)
  clearInterval(last)
}
</script>

<style scoped>
.praise_bubble {
  width: 300px;
  height: 300px;
  margin: auto;
  position: relative;
  background-color: #f4f4f4;
}

.bubble {
  position: absolute;
  left: 50%;
  bottom: 0;
}

.bl1 {
  animation: bubble_y 4s linear 1 forwards;
}

@keyframes bubble_y {
  0% {
    margin-bottom: 0;
    transform: scale(.3);
  }
  25% {
    margin-left: -8px;
  }
  50% {
    margin-left: 8px
  }
  75% {
    opacity: 1;
    margin-left: -15px
  }
  100% {
    margin-bottom: 200px;
    opacity: 0;
    transform: scale(1.2);
    margin-left: 15px
  }
}
</style>
