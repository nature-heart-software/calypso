<style lang="scss" scoped>
    .tweenTransition {
        position: relative;
        .tweenTransition__all {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .tweenTransition__bars {
            width: 100%;
            height: 100%;
            overflow: hidden;
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
                background-color: #3ce3cc;
            }
            .tweenTransition__bar3 {
                background-color: config('colors.black');
            }
        }
    }
</style>

<template>
    <div class="tweenTransition">
        <slot></slot>
        <div class="tweenTransition__all">
            <div class="tweenTransition__bars">
                <div ref="bar1" class="tweenTransition__bar tweenTransition__bar1"></div>
                <div ref="bar2" class="tweenTransition__bar tweenTransition__bar2"></div>
                <div ref="bar3" class="tweenTransition__bar tweenTransition__bar3"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {TweenLite} from 'gsap';
@Component({
    components: {},
})
export default class TweenTransition extends Vue {

    public show(done: any) {
        console.log(done);
        const { bar1, bar2, bar3 } = this.$refs;
        const duration = .2;
        TweenLite.set(bar1, {x: '0%', width: 0});
        TweenLite.set(bar2, {x: '0%', width: 0});
        TweenLite.set(bar3, {x: '0%', width: 0});
        TweenLite.to(bar1, duration, {x: '0%', width: '100%', delay: 0, onComplete: done});
        TweenLite.to(bar2, duration, {x: '0%', width: '100%', delay: duration});
        TweenLite.to(bar3, duration, {x: '0%', width: '100%', delay: duratio n *1.5});
        TweenLite.to([bar1, bar2, bar3], duration, {x: '100%', width: '100%', delay: duratio n *2});
    }

    public hide(done: any) {
        done();
    }

    private mounted() {
    }
}
</script>
