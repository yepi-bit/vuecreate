<template>
  <div id="getImage"></div>
</template>

<script>
export default {
  mounted() {
    this.getImageFun()
  },
  methods:{
    getImageFun () {
      const el = document.getElementById('getImage')
      el.addEventListener('paste',function (e){
        let file = null;
        const items = (e.clipboardData || window.clipboardData).items
        if (items && items.length) {
          for (var i = 0; i < items.length; i++) {
            if(items[i].type.indexOf('image') !== -1) {
              file = items[i].getAsFile()
              break
            }

          }
        }
        console.log(file)
        if(file) {
          var render = new FileReader()
          render.onload = function (e) {
            let img = document.createElement('img');
            img.src = e.target.result;
            el.appendChild(img)
          }
          render.readAsDataURL(file)
        }
      })
    }
  }
}
</script>
<style scoped>
#getImage {
  width: 600px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid royalblue;
}
</style>
