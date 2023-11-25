import { createApp } from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import { securedAxiosInstance, plainAxiosInstance } from './api/index';
import router from "./router"

const app = createApp(App);

app.use(VueAxios, {
    secured: securedAxiosInstance,
    plain: plainAxiosInstance
})

app.use(router);

app.mount('#app')
