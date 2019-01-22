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
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        // return { x: 0, y: 0 }
    }
});

export default router;
