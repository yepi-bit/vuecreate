<template>
  <div class="process">
    <p class="name">{{ $store.state.name || '--' }}，你好</p>
    <div class="button">预申请结果查询</div>
    <div class="process-box">
      <div class="step-1 step" :class="{'select': step == 1}">
        <div class="circle">
          <span></span>
        </div>
        <p>申请信息填写</p>
        <div class="line"></div>
      </div>
      <div class="step-2 step" :class="{'select': step == 2}">
        <div class="circle">
          <span></span>
        </div>
        <p>提交材料</p>
        <div class="line"></div>
      </div>
      <div class="step-3 step" :class="{'select': step == 3}">
        <div class="circle">
          <span></span>
        </div>
        <p>活动方案</p>
        <div class="line"></div>
      </div>
      <div class="step-4 step" :class="{'select': step == 4}">
        <div class="circle">
          <span></span>
        </div>
        <p>场馆方案</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less" scoped>
html {
  font-size: 12px;
}

.process {
  background-color: #fff;
  //  height: 190px;
  padding: 15px 25px;

  .name {
    font-size: 2.3rem;
  }

  .button {
    padding: 1rem 1.5rem;
    border-radius: 4px;
    background: linear-gradient(#295B8D, #3775B3);
    font-size: 2.1rem;
    color: #fff;
    display: inline-block;
    margin-top: 18px;
  }

  .process-box {
    display: flex;
    margin-top: 2.5rem;

    .step {
      width: 25%;
      text-align: center;
      position: relative;

      .circle {
        display: inline-block;
        width: 0;
        height: 0;
        border-radius: 100%;
        border: 2px dotted #aaa;
        padding: 0.7rem;
        position: relative;

        span {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-color: #aaa;
          border-radius: 100%;
          position: absolute;
          top: 0.2rem;
          left: 0.2rem;
        }
      }

      p {
        font-size: 1.7rem;
        margin-top: 1.5rem;
      }

      .line {
        position: absolute;
        width: calc(100% - 1.8rem);
        border-top: 2px dotted #aaa;
        left: calc(50% + 0.9rem);
        top: 0.9rem;
      }
    }

    .select {
      .circle {
        border: 2px dotted #0078fe;

        span {
          background-color: #0078fe;
        }
      }

      p {
        color: #0078fe;
      }

    }
  }
}
</style>