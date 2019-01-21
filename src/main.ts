declare const DISCORD_TOKEN: any;
declare const DISCORD_FINDINGS_ID: any;
declare const DISCORD_ABOUT_ID: any;

import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins/element.js';
import '@/styles/main.scss';
import { Slider } from 'element-ui';
import 'element-ui/lib/theme-chalk/slider.css';
Vue.component('el-slider', Slider);
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
