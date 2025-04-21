import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import ToastPlugin from 'vue-toast-notification';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import 'vuetify/styles'; // Ensure Vuetify styles are loaded
import { fakeBackend } from '@/utils/helpers/fake-backend';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// print
import print from 'vue3-print-nb';

const app = createApp(App);
fakeBackend();
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(ToastPlugin);
app.use(vuetify).mount('#app');
