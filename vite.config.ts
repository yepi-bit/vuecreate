import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import {VantResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        Components({
            resolvers: [VantResolver()],
        }),],
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
                data: '@import "./src/assets/css/base.less";',
            },
        },
    },

})
