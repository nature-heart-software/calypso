<style lang="scss" scoped>
    @import '~@/styles/abstracts/functions';
    .navigation {
        width: config('pristine.misc.navigation.width');
        height: 100vh;
        display: flex;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        padding: 40px 0;
        background-color: config('colors.black');
        nav {
            width: 100%;
            display: flex;
        }
        .navigation__brand {
            align-self: flex-end;
            white-space: nowrap;
            transform: translateX(_(pristine,misc,navigation,width)/2) rotate(-90deg);
            transform-origin: 0 50%;
        }
        .navigation__background {
            z-index: -1;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>

<template>
    <header class="navigation">
        <nav ref="nav">
            <Header class="navigation__brand" look="brand light">Sweet Trips</Header>
        </nav>
        <TweenTransition ref="cover" class="navigation__background">
            <transition @enter="coverTransitionEnter" @leave="coverTransitionLeave" :css="false"
                        mode="out-in">
                <BluredBackground :key="cover" :image="cover"
                                  class="pr-absolute pr-pin pr-opacity-25"></BluredBackground>
            </transition>
        </TweenTransition>
    </header>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import Header from "@/components/atoms/Header.vue";
    import BluredBackground from "@/components/molecules/BluredBackground.vue";
    import TweenTextTransition from "@/components/atoms/TweenTextTransition.vue";
    import TweenTransition from "@/components/atoms/TweenTransition.vue";
    import {TweenLite, Expo} from "gsap";
    import {forEach} from "lodash";

    @Component({
        components: {
            Header,
            TweenTransition,
            TweenTextTransition,
            BluredBackground
        },
        computed: {},
    })
    export default class Navigation extends Vue {
        private shown: boolean = false;
        private navigation: any[] = [
            {
                name: "Home",
                to: {name: "home"},
                ref: "home",
            },
            {
                name: "About",
                to: {name: "about"},
                ref: "about",
            },
            {
                name: "How To",
                to: {name: "howto"},
                ref: "howto",
            },
            {
                name: "Rules",
                to: {name: "rules"},
                ref: "rules",
            },
        ];

        get cover() {
            return this.$store.state.player.song ? this.$store.state.player.song.embeds[0].thumbnail.proxy_url : "";
        }

        // private transitionEnter(args, ref): void {
        //     console.log(args[1]);
        //     (this.$refs[ref] as any).enter(args[1]);
        // }
        //
        // private transitionLeave(args, ref): void {
        //     console.log(args[1]);
        //     (this.$refs[ref] as any).leave(args[1]);
        // }

        public coverTransitionEnter(el, done) {
            (this.$refs.cover as any).enter(done);
        }

        public coverTransitionLeave(el, done) {
            (this.$refs.cover as any).leave(done);
        }

        private show(): void {
            const {nav, navBottom} = (this.$refs as any);
            console.log(nav);
            TweenLite.to(nav, .5, {
                height: window.innerHeight, ease: Expo.easeOut, onComplete: () => {
                    forEach(this.navigation, (link: any) => {
                        console.log(this.$refs[link.ref]);
                        (this.$refs[link.ref] as any)[0].enter()
                            .then(() => {
                                this.shown = true;
                                this.$nextTick(() => {
                                    (this.$refs[link.ref] as any)[0].afterEnter();
                                });
                            });
                    });
                }
            });
        }

        private hide(): void {
            const {nav, navBottom} = (this.$refs as any);
            TweenLite.to(nav, .5, {
                height: 100, ease: Expo.easeOut, onComplete: () => {
                    forEach(this.navigation, (link: any) => {
                        console.log(this.$refs[link.ref]);
                        (this.$refs[link.ref] as any)[0].leave()
                            .then(() => {
                                this.shown = false;
                                this.$nextTick(() => {
                                    (this.$refs[link.ref] as any)[0].afterLeave();
                                });
                            });
                    });
                }
            });
        }

        private toggleFullscreen(): void {
            this.$store.dispatch("navigation/toggleFullscreen");
            if (this.$store.state.navigation.fullscreen) {
                this.show();
            } else {
                this.hide();
            }
        }

        private backgroundTransitionEnter(el, done): void {
            (this.$refs["background"] as any).enter(done);
        }

        private backgroundTransitionLeave(el, done): void {
            (this.$refs["background"] as any).leave(done);
        }
    }
</script>
