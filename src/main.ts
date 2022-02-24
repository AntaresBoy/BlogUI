import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.css'
import './assets/css/main.styl'
import BaseDirective from './directive'
import installElementPlus from './plugins/lib'

const app = createApp(App)

installElementPlus(app)

app.use(BaseDirective)
app.use(store)
app.use(router)
app.mount('#app')
