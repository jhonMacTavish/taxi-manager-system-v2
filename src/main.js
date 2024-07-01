import { createApp } from 'vue'
import App from './App.vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './index.css'
import moment from "moment";

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(VxeUI)
app.use(VXETable)
app.use(router)
app.use(store)

app.mount('#app')
