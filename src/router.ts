import Vue from 'vue';
import Router from 'vue-router';

import {
    Component,
} from 'vue-property-decorator';

Vue.use(Router);

// Register the router hooks with their names
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate', // for vue-router 2.2+
]);


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/how-to',
            name: 'howto',
            component: () => import(/* webpackChunkName: "howto" */ './views/Howto.vue'),
        },
        {
            path: '/rules',
            name: 'rules',
            component: () => import(/* webpackChunkName: "rules" */ './views/Rules.vue'),
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        // return { x: 0, y: 0 }
    }
});

export default router;
