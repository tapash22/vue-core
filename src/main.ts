import './assets/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify/index.ts';

import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router/index.ts';
import { registerChartJS } from './utils/chartRegistry.ts';

registerChartJS();

const app = createApp(App);

app.use(createPinia());
// app.use(router)
app.use(Vue3Toastify, {
  position: 'bottom-center',
  theme: 'light',
  transition: 'slide',
});

app.use(vuetify);
app.use(VueQueryPlugin);
app.use(router);

app.mount('#app');
