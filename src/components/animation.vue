<template>
  <div>
    <el-button @click="changeShow(true)">展开</el-button>
    <el-button @click="changeShow(false)">关闭</el-button>
    <div class="mr_sty" :class="[{'animationWidth1':isShow === 1},{'animationWidth2':isShow === 2},{'animationWidth3':isShow === 3},{'animationWidth4':isShow === 4}]">
      <div style="width: 300px;height:100px;">
        你好你好你好
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isShow: 1,
    }
  },
  methods: {
    changeShow(type) {
      //展开
      if (type) {
        this.isShow = 2
        setTimeout(() => {
          this.isShow = 3
        }, 3000)
      } else {
        //收起
        this.isShow = 4
        setTimeout(() => {
          this.isShow = 1
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>

.mr_sty{
  overflow: hidden;
}
.animationWidth1{
  width: 0;
  height:0;
  background: linear-gradient(to right, #be99ff, #7232dd);
}
.animationWidth2{
  width: 300px;
  height:100px;
  background: linear-gradient(to right, #be99ff, #7232dd);
  position:relative;
  animation:animationWidth2 3s infinite;
  animation-iteration-count: 1;
}
@keyframes animationWidth2 {
  0%   {width:0}
  100% {width:300px}
}
.animationWidth3{
  width: 300px;
  height:100px;
  background: linear-gradient(to right, #be99ff, #7232dd);
}
.animationWidth4{
  width: 300px;
  height:100px;
  background: linear-gradient(to right, #be99ff, #7232dd);
  position:relative;
  animation:animationWidth4 3s infinite;
  animation-iteration-count: 1;
}
@keyframes animationWidth4 {
  0%   {width:300px}
  100% {width:0}
}
</style>
