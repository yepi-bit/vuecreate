<template>
  <div class="right">
    <div class="right-box">
      <img src="https://static001.geekbang.org/infoq/cf/cf0f1de4b55dbe5b850b8572beeaf1c7.gif" width="100" >
    </div>
    <!--   <div class="arrow-right"></div>-->
    <div class="right-border">
      <div class="icon-btn"><i :class="['el-icon-caret-right',{'on':!toggle}]" @click="animFn"/></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const toggle = ref(false)
const animFn = () => {

}
</script>

<style scoped lang="less">
.right {
  width: 100%;
  height: 90vh;
  overflow: hidden;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  .right-box {
    color: rebeccapurple;
    font-size: 32px;
  }
}

/*.arrow-right {*/
/*  width: 10px;*/
/*  height: 10px;*/
/*  background-color: transparent; !* 模块背景为透明 *!*/
/*  border-style: solid;*/
/*  border-width: 1px 1px 0 0;*/
/*  transform: rotate(45deg);  !*箭头方向可以自由切换角度*!*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  right: 215px;*/
/*}*/
/*.arrow-right:hover {*/
/*  background-color: goldenrod;*/
/*}*/

.right .right-border {
  width: 200px;
  height: 90vh;
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 5;
}

.right .right-border .icon-btn {
  width: 18px;
  height: 18px;
  font-size: 18px;
  margin-top: 80px;
  margin-right: -2px;
}

.right .right-border .icon-bt i {
  cursor: pointer;
  color: #fff;
}

.right .right-border .icon-bt i .on {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -moz-transform: rotate(180deg);
  /* Firefox */
  -webkit-transform: rotate(180deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
}


</style>
