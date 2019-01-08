import Vue from 'vue';
import Vuex from 'vuex';

import findings from '@/store/findings.store';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        findings,
    },
});
