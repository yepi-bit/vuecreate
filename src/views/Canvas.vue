<template>
  <!--截图区域-->
  <div id="clip-img-w" class="img_box">
    <canvas id="drawcanvas"></canvas>
    <canvas id="clipcanvas"></canvas>
    <img id="img_big" :src="imgSrc" width="200" height="200">
  </div>
  <!--回显区域-->
  <div class="img_group_item" v-if="cutImgSrc">
    <img id="img" :src="cutImgSrc" width="200" height="200">
  </div>
  <!--操作按钮-->
  <div class="btn_box" align="center">
    <el-button class="btn_cut" @click="cut()">点击截屏</el-button>
    <el-button v-if="draw" class="btn_cut_cancel" @click="cancelCut()">取消</el-button>
  </div>

</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      // 储存截图区域的图片,自己传
      imgSrc: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wE95?ver=bbc4',
      // 储存截图后的生成的base64图片
      cutImgSrc: '',
      // 判断当前是否处于截图状态
      draw: false
    };
  },
  methods: {
    /**
     * 取消截图
     */
    cancelCut() {
      this.draw = false;
      this.init();
    },
    /**
     * 打开弹窗的时候初始化
     */
    init() {
      // canvas清空画布
      var wrap = document.getElementById("clip-img-w");
      var width = wrap.offsetWidth;
      var height = wrap.offsetHeight;
      var clipcanvas = document.getElementById("clipcanvas");
      var drawcanvas = document.getElementById("drawcanvas");
      clipcanvas.width = width;
      clipcanvas.height = height;
      drawcanvas.width = width;
      drawcanvas.height = height;
      var clipCtx = drawcanvas.getContext("2d");
      var ctx = clipcanvas.getContext("2d");
      clipCtx.clearRect(0, 0, drawcanvas.width, drawcanvas.height);
      ctx.clearRect(0, 0, clipcanvas.width, clipcanvas.height);

      //移除鼠标事件
      clipcanvas.onmousedown = null;
      clipcanvas.onmousemove = null;
      document.removeEventListener("mouseup", fn(), false);

      function fn() {
      }

      // 移除创建的img节点,避免重复创建
      if ($('.img_anonymous').length > 0) {
        $('.img_anonymous').remove();
      }

      //避免同一张图没有更新
      this.cutImgSrc = this.imgSrc;
    },

    cut() {
      var thiz = this;
      thiz.draw = true; //显示“取消截图”的按钮
      var img = document.getElementById("img");

      var wrap = document.getElementById("clip-img-w");
      var width = wrap.offsetWidth;
      var height = wrap.offsetHeight;

      var clipcanvas = document.getElementById("clipcanvas");
      var drawcanvas = document.getElementById("drawcanvas");
      clipcanvas.width = width;
      clipcanvas.height = height;
      drawcanvas.width = width;
      drawcanvas.height = height;

      var clipCtx = drawcanvas.getContext("2d");
      var clipImg = document.createElement("img");
      clipImg.classList.add('img_anonymous');
      clipImg.crossOrigin = "anonymous";
      clipImg.src = thiz.imgSrc;
      var timg = clipImg.cloneNode();
      wrap.appendChild(clipImg);
      clipImg.onload = function () {
        var x = Math.floor((width - this.width) / 2);
        var y = Math.floor((height - this.height) / 2);
        clipCtx.drawImage(this, 0, 0, timg.width, timg.height, x, y, this.width, this.height);
      };

      var ctx = clipcanvas.getContext("2d");
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.strokeStyle = "rgba(0,143,255,1)";
      var start = null;
      var clipArea = {};//裁剪范围

      clipcanvas.onmousedown = function (e) {
        start = {
          x: e.offsetX,
          y: e.offsetY
        };
      };
      clipcanvas.onmousemove = function (e) {
        if (start) {
          fill(start.x, start.y, e.offsetX - start.x, e.offsetY - start.y)
        }
      };
      document.addEventListener("mouseup", function () {
        if (start) {
          start = null;
          var url = startClip(clipArea);
          img.src = url;
          //生成base64格式的图
          thiz.cutImgSrc = url;
        }
      });

      function fill(x, y, w, h) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        //遮罩层
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(0, 0, width, height);
        //画框
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillRect(x, y, w, h);
        //描边
        ctx.globalCompositeOperation = "source-over";
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        clipArea = {
          x,
          y,
          w,
          h
        };
      }

      function startClip(area) {
        var canvas = document.createElement("canvas");
        canvas.width = area.w;
        canvas.height = area.h;

        var data = clipCtx.getImageData(area.x, area.y, area.w, area.h);

        var context = canvas.getContext("2d");
        context.putImageData(data, 0, 0);
        return canvas.toDataURL("image/png", 1);
      }
    },

  }

}
</script>

<style scoped>

.img_box {
  width: 700px;
  height: 450px;
  position: relative;
}

.img_box canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.img_box canvas #clipcanvas {
  z-index: 2;
}

.img_box canvas #drawcanvas {
  z-index: 1;
}

.img_box img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}


.img_group_item {
  width: 250px;
  height: 250px;
  position: relative;
  margin: 0 auto;
}

.img_group_item img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;

}

</style>
