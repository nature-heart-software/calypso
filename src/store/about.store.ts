declare var DISCORD_ABOUT_ID: any;

import { discordApi } from '@/consts';
import showdown from 'showdown';
const converter = new showdown.Converter();

const findings = {
    namespaced: true,
    state: {
        data: [],
    },
    getters: {
        markdown: (state, getters)  => {
            return state.data.map((post: any) => post.content).reverse().join('\n');
        },
        html: (state, getters)  => {
            return converter.makeHtml(getters.markdown);
        },
    },
    mutations: {
        setData(state: any, value: any) {
            state.data = value;
        },
    },
    actions: {
        fetch: ({commit}: any) => {
            return new Promise((resolve, reject) => {
                discordApi.get('channels/' + DISCORD_ABOUT_ID + '/messages?limit=100')
                    .then(({ data }) => {
                        commit('setData', data);
                        resolve(data);
                    });
            });
        },
    },
};

export default findings;
