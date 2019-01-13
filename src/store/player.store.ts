
const player = {
    namespaced: true,
    state: {
        song: null,
    },
    getters: {
      song: (state) => {
          return state.song
      }
    },
    mutations: {
        setSong(state: any, value: any) {
            state.song = value;
        },
    },
    actions: {
        play: (context: any, value: any) => {
            context.commit('setSong', value);
        },
    },
};

export default player;
