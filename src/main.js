import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"

const app = createApp(App)

//路由挂载
app.use(router)
app.mount('#app')
