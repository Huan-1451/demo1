/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-31 18:17:50
 * @LastEditTime: 2024-04-07 15:24:22
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import _ from 'lodash';
import App from './App.vue';
import router from './router/routes';
import './style.css';
const app = createApp(App);

const lodash = {
  install() {
    window._ = _;
  },
};

app.use(createPinia());
app.use(router);
app.use(lodash);

app.mount('#app');
