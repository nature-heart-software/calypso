<style lang="scss" scoped>
    .tweenTextTransition {
        position: relative;
        .tweenTextTransition__all {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
        }
        .tweenTextTransition__bars {
            width: 100%;
            height: 100%;
            position: relative;
            .tweenTextTransition__bar {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0;
            }
            .tweenTextTransition__bar1 {
                background-color: white;
            }
        }
    }
</style>

<template>
    <div class="tweenTextTransition">
        <slot></slot>
        <div class="tweenTextTransition__all">
            <div class="tweenTextTransition__bars" ref="barGroup">
                <div ref="bar1" class="tweenTextTransition__bar tweenTextTransition__bar1"></div>
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
export default class tweenTextTransition extends Vue {

    public leave(done: any) {
        const { bar1, barGroup } = this.$refs;
        const duration = 1;
        TweenLite.set(bar1, {width: 0});
        TweenLite.set(barGroup, {x: '0%'});
        TweenLite.to(bar1, duration, {width: '100%', ease: Expo.easeInOut, onComplete: isDone});
        function isDone() {
            console.log('animation is done');
            done();
        }
    }
    public enter(done: any) {
        const { barGroup } = this.$refs;
        const duration = 1;
        TweenLite.to(barGroup, duration, {x: '101%', ease: Expo.easeOut, delay: duration * .87, onComplete: isDone});
        function isDone() {
            console.log('animation is done');
            done();
        }
    }

    private mounted() {
    }
}
</script>
