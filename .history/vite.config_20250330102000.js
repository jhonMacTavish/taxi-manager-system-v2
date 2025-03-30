import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '10.86.255.9',
    // host: 'localhost',
    port: 8080,
    open: true,
    base: './',
    proxy: {
      '/door': {
        // target: 'http://10.35.240.225', //测试
        target: 'http://10.35.240.211',  //正式
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/door': ''
        }
      },
      // 动态数据，统计数据api
      '/api/v1': {
        // target: 'http://10.35.240.225:8081', //测试
        target:'http://10.35.240.211:8081', //生产
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': ''
        }
      },
      '/api': {
        // target: 'http://10.35.240.219', //测试
        target: 'http://10.35.240.215',  //正式
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/location': {
        // 配置 proxy 代理解决跨域问题
        target: 'http://10.35.240.236', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/location': ''
        }
      },
      '/user_list': {
        // 配置 proxy 代理解决跨域问题
        target: 'http://10.35.240.232/', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/user_list': ''
        }
      },
      '/tracks': {
        // 配置 proxy 代理解决跨域问题
        target: 'https://apis.map.qq.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/tracks': ''
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,

    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },

    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
