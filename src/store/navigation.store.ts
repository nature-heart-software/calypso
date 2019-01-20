
const navigation = {
    namespaced: true,
    state: {
        fullscreen: false,
    },
    getters: {

    },
    mutations: {
        toggleFullscreen(state: any) {
            state.fullscreen = !state.fullscreen;
        },
    },
    actions: {
        toggleFullscreen: (context: any) => {
            context.commit('toggleFullscreen');
        },
    },
};

export default navigation;
