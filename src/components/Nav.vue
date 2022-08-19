<template>
  <div class="nav">
    <a href="#">关注</a>
    <a href="#">推荐</a>
    <a href="#">程序人生</a>
    <a href="#">Python</a>
    <a href="#">Java</a>
    <a href="#">人工智能</a>
    <a href="#">前端</a>
    <a href="#">架构</a>
    <a href="#">数据库</a>
    <a href="#">5G</a>
    <a href="#">问答</a>
    <a href="#">体育</a>
    <a href="#">科技</a>
  </div>
</template>

<script>
export default {
  name: "Nav"
}
</script>

<style scoped>
.nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /*段落中文本不换行*/
  white-space: nowrap;
  /*阴影*/
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  /*设置横向滚动*/
  overflow-x: scroll;
  /*禁止纵向滚动*/
  overflow-y: hidden;
  /*文本平铺*/
  text-align: justify;
  /*背景颜色*/
  background: #F4F5F6;
  padding: 0px 5px;
  margin-bottom: 10px;
  /*设置边距改变效果为内缩*/
  box-sizing: border-box;
}

.nav a {
  color: #505050;
  /*取消超链接下划线*/
  text-decoration: none;
  margin: auto 10px;
}

.nav::-webkit-scrollbar {
  /*隐藏滚动条*/
  display: none;
}
</style>
