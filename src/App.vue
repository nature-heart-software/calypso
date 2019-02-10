<template>
    <div id="app">
        <Navigation></Navigation>
        <TweenTransition ref="view" class="pr-min-h-screen pr-flex-1" transition-class="pr-fixed pr-pin">
            <transition @enter="routeTransitionEnter" @leave="routeTransitionLeave" :css="false" mode="out-in">
                <router-view class="app__view" :class="{'app__view--blured': $store.state.navigation.fullscreen}"></router-view>
            </transition>
        </TweenTransition>
        <BackgroundFigures></BackgroundFigures>
        <Player v-show="$store.state.player.song" class="app__player"></Player>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Navigation from '@/components/organisms/Navigation.vue';
    import TweenTransition from '@/components/atoms/TweenTransition.vue';
    import BackgroundFigures from '@/components/atoms/BackgroundFigures.vue';
    import Player from "@/components/molecules/Player.vue";

    @Component({
        components: {
            Navigation,
            TweenTransition,
            BackgroundFigures,
            Player,
        },
    })
    export default class App extends Vue {
        private appeared: boolean = false;
        public routeTransitionEnter(el, done) {
            window.scrollTo(0, 0);
            if (this.appeared) {
                (this.$refs['view'] as any).enter(done);
            } else {
                done();
                this.appeared = true;
            }
        }

        public routeTransitionLeave(el, done) {
            (this.$refs['view'] as any).leave(done);
        }

        mounted() {

        }
    }
</script>

<style lang="scss">
    body {
        background-color: config('colors.background');
        //height: (948px*3)+1;
    }
#app {
    display: flex;
    padding-left: config('pristine.misc.navigation.width');
    .app__view {
        opacity: 1;
        transition: all .6s cubic-bezier(.215, .61, .355, 1);
        transform: scale(1);
        &--blured {
            opacity: 0;
            transform: scale(.9);
        }
    }
    //&:after {
    //    content: '';
    //    position: fixed;
    //    top: 0;
    //    right: 0;
    //    width: 60vw;
    //    height: 100vh;
    //    background-color: #EFEFEF;
    //    z-index: -1;
    //}
}
</style>
