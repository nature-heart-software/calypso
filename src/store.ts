import Vue from 'vue';
import Vuex from 'vuex';

import findings from '@/store/findings.store';
import player from '@/store/player.store';
import navigation from '@/store/navigation.store';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        findings,
        player,
        navigation
    },
});
