<template>
  <div class="container">
    <div class="father">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="vertical-scroll">
      <div class="rail">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    const warp = document.querySelector('.father');
    const fatherClientWeight = warp.clientWidth; // 获取父高度
    const fatherScrollWeight = warp.scrollWidth; // 获取父可滚动高度
    const present = fatherClientWeight / fatherScrollWeight; // 计算滚动条应该占多高
    const scrollWarp = document.querySelector('.rail');
    scrollWarp.style.width = present * 100 + '%'; // 用百分比计算rail的高度
    warp.addEventListener('scroll', function (e) { // 添加滚动事件
      scrollWarp.style.transform = 'translateX(' + e.target.scrollLeft * 100 / fatherClientWeight + '%)'
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  background-color: transparent;

}

.father {
  overflow-x: scroll;
  width: 100%;
  height: 81px;
  display: -webkit-box;
}

.father > div {
  width: 83px;
  margin: 0 13px;
  background-color: #19E6DB;
}

::-webkit-scrollbar {
  display: none;
  /*隐藏自带的滚动条*/
}

.vertical-scroll {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  bottom: 5px;
  transition: all .3s ease-out;
  visibility: visible;
  background-color: #F4F4F8;
  width: 40px

}

.rail {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #44A8F8;
  border-radius: 1000px;
  cursor: pointer;
  -webkit-transition: background-color .3s;
  transition: background-color .3s;
}
</style>
