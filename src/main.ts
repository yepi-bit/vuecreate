import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router'
import store from './store'
import "./style.css";
// 水印
// import watermark from './utils/watermark.js'
// Vue.prototype.$watermark = watermark


createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
