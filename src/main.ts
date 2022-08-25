import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import SocketIO from '@/assets/api/io';

import axios from 'axios'

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(SocketIO, {
    connection: 'http://localhost:3000/',
})

app.use(store).use(router).mount('#app');
