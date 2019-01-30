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
        <div ref="text" class="pr-inline">
            <slot></slot>
        </div>
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
            const {bar1, barGroup, text} = this.$refs;
            const duration = .5;
            TweenLite.set(bar1, {width: '100%', height: '100%', y: '100%'});
            if (typeof done === 'function') {
                TweenLite.to(bar1, duration, {
                    y: '0%', ease: Expo.easeInOut, onComplete: () => {
                        TweenLite.set(text, {visibility: 'hidden'});
                        this.$emit('hide-text');
                        TweenLite.to(bar1, duration, {y: '-100%', ease: Expo.easeInOut, onComplete: isDone});
                    }
                });

                function isDone() {
                    done();
                }
            } else {
                return new Promise((resolve, reject) => {
                    TweenLite.to(bar1, duration, {
                        y: '0%', ease: Expo.easeInOut, onComplete: () => {
                            resolve();
                        }
                    });
                });
            }
        }

        public afterLeave() {
            const {bar1, barGroup, text} = this.$refs;
            const duration = .5;
            TweenLite.set(text, {visibility: 'hidden'});
            this.$emit('hide-text');
            TweenLite.to(bar1, duration, {y: '-100%', ease: Expo.easeInOut});
        }

        public enter(done: any) {
            const {bar1, barGroup, text} = this.$refs;
            const duration = .5;
            TweenLite.set(bar1, {width: '100%', height: '100%', y: '100%'});
            if (typeof done === 'function') {
                TweenLite.to(bar1, duration, {
                    y: '0%', ease: Expo.easeInOut, onComplete: () => {
                        TweenLite.set(text, {visibility: 'visible'});
                        this.$emit('show-text');
                        TweenLite.to(bar1, duration, {
                            y: '-100%',
                            delay: duration,
                            ease: Expo.easeOut,
                            onComplete: isDone
                        });
                    }
                });

                function isDone() {
                    done();
                }
            } else {
                return new Promise((resolve, reject) => {
                    TweenLite.to(bar1, duration, {
                        y: '0%', ease: Expo.easeInOut, onComplete: () => {
                            resolve();
                        }
                    });
                });
            }
        }

        public afterEnter() {
            const {bar1, barGroup, text} = this.$refs;
            const duration = .5;
            TweenLite.set(text, {visibility: 'visible'});
            this.$emit('show-text');
            TweenLite.to(bar1, duration, {y: '-100%', delay: duration, ease: Expo.easeOut});
        }

        private mounted() {
        }
    }
</script>
