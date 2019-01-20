<style lang="scss" scoped>
    .tweenTransition {
        position: relative;
        .tweenTransition__all {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
        }
        .tweenTransition__bars {
            width: 100%;
            height: 100%;
            position: relative;
            .tweenTransition__bar {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0;
            }
            .tweenTransition__bar1 {
                background-color: #6e22ec;
            }
            .tweenTransition__bar2 {
                /*background-color: #3ce3cc;*/
                background-color: config('colors.black');
            }
            .tweenTransition__bar3 {
                /*background-color: config('colors.black');*/
                background-color: #3ce3cc;
            }
        }
    }
</style>

<template>
    <div class="tweenTransition">
        <slot></slot>
        <div class="tweenTransition__all">
            <div class="tweenTransition__bars" ref="barGroup">
                <div ref="bar1" class="tweenTransition__bar tweenTransition__bar1"></div>
                <div ref="bar2" class="tweenTransition__bar tweenTransition__bar2"></div>
                <div ref="bar3" class="tweenTransition__bar tweenTransition__bar3"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {TweenLite, Expo} from 'gsap';
@Component({
    components: {},
})
export default class TweenTransition extends Vue {

    public leave(done: any) {
        const { bar1, bar2, bar3, barGroup } = this.$refs;
        const duration = 1;
        TweenLite.set(bar1, {width: 0});
        TweenLite.set(bar2, {width: 0});
        TweenLite.set(bar3, {width: 0});
        TweenLite.set(barGroup, {x: '0%'});
        TweenLite.to(bar1, duration, {width: '100%', ease: Expo.easeInOut, onComplete: isDone});
        function isDone() {
            console.log('animation is done');
            done();
        }
    }
    public enter(done: any) {
        const { bar1, bar2, bar3, barGroup } = this.$refs;
        const duration = 1;
        TweenLite.to(bar2, duration, {width: '100%', ease: Expo.easeOut, delay: duration * .5});
        TweenLite.to(bar3, duration, {width: '100%', ease: Expo.easeOut, delay: duration * .75});
        TweenLite.to(barGroup, duration, {x: '100%', ease: Expo.easeOut, delay: duration * .87, onComplete: isDone});
        function isDone() {
            console.log('animation is done');
            done();
        }
    }

    private mounted() {
    }
}
</script>
