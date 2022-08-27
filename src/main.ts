import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SocketIO from '@/assets/api/io';
import './index.css';


const app = createApp(App);


app.use(SocketIO, {
    connection: 'http://localhost:3000/',
})

app.use(store).use(router).mount('#app');
