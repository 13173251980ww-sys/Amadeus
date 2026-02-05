import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        vueDevTools(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [          // 1. 配置elementPlus采用sass样式配色系统
                ElementPlusResolver({ importStyle: "sass" }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },

    //自动导入定制化文件进行样式覆盖
    css:{
        preprocessorOptions: {
            scss:{
                additionalData:
                    '@use "@/styles/element/var.scss" as element;\n' +
                   '@use "@/styles/var.scss" as *;'
            }
        }
    }
})
