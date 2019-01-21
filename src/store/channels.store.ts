declare var DISCORD_GUILD_ID: any;

import { discordApi } from '@/consts';

const channels = {
    namespaced: true,
    state: {
        collection: [],
    },
    mutations: {
        setCollection(state: any, value: any) {
            state.collection = value;
        },
    },
    actions: {
        fetch: ({commit}: any) => {
            return new Promise((resolve, reject) => {
                discordApi.get('guilds/' + DISCORD_GUILD_ID + '/channels')
                    .then(({ data }) => {
                        commit('setCollection', data);
                        resolve(data);
                    });
            });
        },
    },
};

export default channels;
