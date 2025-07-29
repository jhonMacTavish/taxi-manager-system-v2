// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/web_taxi/reconstruction/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/web_taxi/reconstruction/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/web_taxi/reconstruction/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/web_taxi/reconstruction/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/web_taxi/reconstruction/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///E:/web_taxi/reconstruction/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    host: "10.86.255.9",
    port: 8080,
    open: true,
    base: "./",
    proxy: {
      "/api": {
        target: "http://10.35.240.224",
        //测试
        // target: 'http://10.35.240.246',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/location": {
        // 配置 proxy 代理解决跨域问题
        target: "http://10.35.240.236",
        // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/location": ""
        }
      },
      "/user_list": {
        // 配置 proxy 代理解决跨域问题
        target: "http://10.35.240.220/",
        // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/user_list": ""
        }
      },
      "/tracks": {
        // 配置 proxy 代理解决跨域问题
        target: "https://apis.map.qq.com",
        // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/tracks": ""
        }
      }
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};