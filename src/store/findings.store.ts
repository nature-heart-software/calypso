declare var DISCORD_GUILD_ID: any;

import { discordApi } from '@/consts';
import { filter } from 'lodash';
const findings = {
    namespaced: true,
    state: {
        collection: [],
    },
    mutations: {
        setFindings(state: any, value: any) {
            state.collection = value;
        },
    },
    actions: {
        fetch: (context: any) => {
            return new Promise((resolve, reject) => {
                discordApi.get('channels/' + DISCORD_GUILD_ID + '/messages?limit=100')
                    .then(({ data }) => {
                        const filteredData = filter(data, (post: any) => {
                            return post.embeds.length > 0 && post.embeds[0].provider
                                && (
                                    post.embeds[0].provider.name === 'YouTube'
                                    || post.embeds[0].provider.name === 'SoundCloud'
                                );
                        });
                        context.commit('setFindings', filteredData);
                        resolve(filteredData);
                    });
            });
        },
    },
    getters: {},
};

export default findings;
