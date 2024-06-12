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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3ZWJfdGF4aVxcXFxyZWNvbnN0cnVjdGlvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcd2ViX3RheGlcXFxccmVjb25zdHJ1Y3Rpb25cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3dlYl90YXhpL3JlY29uc3RydWN0aW9uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMTAuODYuMjU1LjknLFxuICAgIHBvcnQ6IDgwODAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBiYXNlOiAnLi8nLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEwLjM1LjI0MC4yMjQnLCAvL1x1NkQ0Qlx1OEJENVxuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTAuMzUuMjQwLjI0NicsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcGF0aFJld3JpdGU6IHtcbiAgICAgICAgICAnXi9hcGknOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJy9sb2NhdGlvbic6IHtcbiAgICAgICAgLy8gXHU5MTREXHU3RjZFIHByb3h5IFx1NEVFM1x1NzQwNlx1ODlFM1x1NTFCM1x1OERFOFx1NTdERlx1OTVFRVx1OTg5OFxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTAuMzUuMjQwLjIzNicsIC8vIFx1NzZFRVx1NjgwN1x1NEVFM1x1NzQwNlx1NjNBNVx1NTNFM1x1NTczMFx1NTc0MFxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NUYwMFx1NTQyRlx1NEVFM1x1NzQwNlx1RkYwQ1x1NTcyOFx1NjcyQ1x1NTczMFx1NTIxQlx1NUVGQVx1NEUwMFx1NEUyQVx1ODY1QVx1NjJERlx1NjcwRFx1NTJBMVx1N0FFRlxuICAgICAgICBwYXRoUmV3cml0ZToge1xuICAgICAgICAgICdeL2xvY2F0aW9uJzogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICcvdXNlcl9saXN0Jzoge1xuICAgICAgICAvLyBcdTkxNERcdTdGNkUgcHJveHkgXHU0RUUzXHU3NDA2XHU4OUUzXHU1MUIzXHU4REU4XHU1N0RGXHU5NUVFXHU5ODk4XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMC4zNS4yNDAuMjIwLycsIC8vIFx1NzZFRVx1NjgwN1x1NEVFM1x1NzQwNlx1NjNBNVx1NTNFM1x1NTczMFx1NTc0MFxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NUYwMFx1NTQyRlx1NEVFM1x1NzQwNlx1RkYwQ1x1NTcyOFx1NjcyQ1x1NTczMFx1NTIxQlx1NUVGQVx1NEUwMFx1NEUyQVx1ODY1QVx1NjJERlx1NjcwRFx1NTJBMVx1N0FFRlxuICAgICAgICBwYXRoUmV3cml0ZToge1xuICAgICAgICAgICdeL3VzZXJfbGlzdCc6ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnL3RyYWNrcyc6IHtcbiAgICAgICAgLy8gXHU5MTREXHU3RjZFIHByb3h5IFx1NEVFM1x1NzQwNlx1ODlFM1x1NTFCM1x1OERFOFx1NTdERlx1OTVFRVx1OTg5OFxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2FwaXMubWFwLnFxLmNvbScsIC8vIFx1NzZFRVx1NjgwN1x1NEVFM1x1NzQwNlx1NjNBNVx1NTNFM1x1NTczMFx1NTc0MFxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NUYwMFx1NTQyRlx1NEVFM1x1NzQwNlx1RkYwQ1x1NTcyOFx1NjcyQ1x1NTczMFx1NTIxQlx1NUVGQVx1NEUwMFx1NEUyQVx1ODY1QVx1NjJERlx1NjcwRFx1NTJBMVx1N0FFRlxuICAgICAgICBwYXRoUmV3cml0ZToge1xuICAgICAgICAgICdeL3RyYWNrcyc6ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcblxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLGVBQWUsV0FBVztBQUV6UyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFONkgsSUFBTSwyQ0FBMkM7QUFTbE4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFFBRVIsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsYUFBYTtBQUFBLFVBQ1gsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhO0FBQUE7QUFBQSxRQUVYLFFBQVE7QUFBQTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxhQUFhO0FBQUEsVUFDWCxjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjO0FBQUE7QUFBQSxRQUVaLFFBQVE7QUFBQTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxhQUFhO0FBQUEsVUFDWCxlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsTUFDQSxXQUFXO0FBQUE7QUFBQSxRQUVULFFBQVE7QUFBQTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxhQUFhO0FBQUEsVUFDWCxZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBRVgsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
