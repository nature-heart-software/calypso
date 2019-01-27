<template>
    <div id="app">
        <Navigation></Navigation>
        <TweenTransition ref="view" class="pr-min-h-screen" transition-class="pr-fixed pr-pin">
            <transition @enter="routeTransitionEnter" @leave="routeTransitionLeave" :css="false" mode="out-in">
                <router-view class="app__view" :class="{'app__view--blured': $store.state.navigation.fullscreen}"></router-view>
            </transition>
        </TweenTransition>
        <BackgroundFigures></BackgroundFigures>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Navigation from '@/components/organisms/Navigation.vue';
    import TweenTransition from '@/components/atoms/TweenTransition.vue';
    import BackgroundFigures from '@/components/atoms/BackgroundFigures.vue';

    @Component({
        components: {
            Navigation,
            TweenTransition,
            BackgroundFigures,
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
        background-color: config('colors.black');
        //height: (948px*3)+1;
    }
#app {
    /*height: 100vh;*/
    /*overflow: auto;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    .app__view {
        opacity: 1;
        transition: all .6s cubic-bezier(.215, .61, .355, 1);
        transform: scale(1);
        &--blured {
            opacity: 0;
            transform: scale(.9);
        }
    }
}
</style>
