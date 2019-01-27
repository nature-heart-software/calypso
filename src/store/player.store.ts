import moment from 'moment';

const player = {
    namespaced: true,
    state: {
        song: null,
        trueCurrentTime: null,
        trueTotalTime: null,
    },
    getters: {
        song: (state) => {
            return state.song
        },
        currentTimeFormated(state) {
            return moment.utc(state.trueCurrentTime * 1000).format('mm:ss');
        },

        totalTimeFormated(state) {
            return moment.utc(state.trueTotalTime * 1000).format('mm:ss');
        }
    },
    mutations: {
        setSong(state: any, value: any) {
            state.song = value;
        },
        setTrueCurrentTime(state: any, value: any) {
            state.trueCurrentTime = value;
        },
        setTrueTotalTime(state: any, value: any) {
            state.trueTotalTime = value;
        }
    },
    actions: {
        play: (context: any, value: any) => {
            context.commit('setSong', value);
        },
        setTrueCurrentTime(context: any, value: any) {
            context.commit('setTrueCurrentTime', value);
        },
        setTrueTotalTime(context: any, value: any) {
            context.commit('setTrueTotalTime', value);
        }
    },
};

export default player;
