declare var DISCORD_RULES_ID: any;

import { discordApi } from '@/consts';
import showdown from 'showdown';
import {find} from 'lodash';
const converter = new showdown.Converter({
    openLinksInNewWindow: true,
    simplifiedAutoLink: true,
});
const { toHTML } = require('discord-markdown');
const rules = {
    namespaced: true,
    state: {
        data: [],
    },
    getters: {
        markdown: (state, getters)  => {
            return state.data.map((post: any) => post.content).reverse().join('\n\n');
        },
        html: (state, getters, rootState, rootGetters)  => {
            const discordParsing = toHTML(getters.markdown, {
                discordParsing: true,
                discordCallback: {
                    channel: node => find(rootState.channels.collection, (channel: any) => channel.id === node.id).name,
                    emoji: node => {
                        if (node.animated) {
                            return `<img class="emoji" src="https://cdn.discordapp.com/emojis/${node.id}.gif" alt="${node.name}">`;
                        }
                        return `<img class="emoji" src="https://cdn.discordapp.com/emojis/${node.id}.png" alt="${node.name}">`;
                    },
                }
            });
            return converter.makeHtml(discordParsing);
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
                discordApi.get('channels/' + DISCORD_RULES_ID + '/messages?limit=100')
                    .then(({ data }) => {
                        commit('setData', data);
                        resolve(data);
                    });
            });
        },
    },
};

export default rules;
