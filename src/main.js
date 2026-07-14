import "./assets/main.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.ts";
const app = createApp(App);
app.use(createPinia);
// app.use(router)
app.use(vuetify);
app.use(VueQueryPlugin);
app.mount("#app");
