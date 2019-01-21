<style lang="scss" scoped>
    $navigation-height: 100px;
    .navigation {
        display: flex;
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        nav {
            height: 100px;
            transition: all .5s cubic-bezier(.165, .84, .44, 1);
        }
        .navigation__links {
            margin-left: config('margin.lg');
            .navigation__link {
                a {
                    color: white;
                }
            }
        }
        .navigation__container {
            /*padding-left: 10px;*/
            display: flex;
            flex: 1;
            align-content: start;
            transition: all .5s cubic-bezier(.165, .84, .44, 1);
        }

        .navigation__screen {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            .navigation__screen__top {
                transition: all .5s cubic-bezier(.165, .84, .44, 1);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: $navigation-height;
                display: flex;
                align-items: center;
            }
            .navigation__screen__middle {
                position: absolute;
                top: 150px;
                width: 100%;
                transition: all .3s cubic-bezier(.165, .84, .44, 1);
            }
            .navigation__screen__bottom {
                transition: all .5s cubic-bezier(.165, .84, .44, 1);
                opacity: 0;
                display: flex;
                position: absolute;
                bottom: 20vh;
                left: 0;
                right: 0;
            }
        }

        .navigation__screen__background {
            background-color: config('colors.black');
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            overflow: hidden;
            .navigation__screen__background__image {
                position: absolute;
                width: 110%;
                height: 110%;
                object-fit: cover;
                object-position: center;
                filter: blur(60px);
                /*opacity: .1;*/
            }
        }

        .navigation__brand {
            margin-left: config('margin.lg');
        }

        .navigation__menu-button {
            $width: 20px;
            $height: 3px;
            width: $width;
            position: absolute;
            top: 0;
            left: -$width/2;
            bottom: 0;
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            .navigation__menu-button__bar {
                display: inline-flex;
                width: $width;
                height: $height;
                margin-bottom: ($width - (3*$height)) / 2;
                background-color: white;
                &:last-child {
                    margin-bottom: 0;
                    width: $width/2;
                }
            }
        }

        &--fullscreen {
            nav {
                height: 100vh;
            }

            .navigation__container {
                padding-left: 100px;
                padding-right: 250px;
            }
            .navigation__screen__top {
                top: 50px;
            }
            .navigation__screen__bottom {
                opacity: 1!important;
                margin-left: -100px;
                margin-right: -250px;
            }
        }
    }
</style>

<template>
    <header class="navigation" :class="{'navigation--fullscreen': $store.state.navigation.fullscreen}">
        <nav class="container pr-flex">
            <div class="navigation__container">
                <div class="navigation__screen">
                    <div class="navigation__screen__top">
                        <div class="navigation__menu-button pr-cursor-pointer" @click="$store.dispatch('navigation/toggleFullscreen')">
                            <div class="navigation__menu-button__bar" v-for="i in 3"></div>
                        </div>
                        <Header class="navigation__brand" look="brand">Sweet<br>Trips</Header>
                        <div class="pr-flex-1 pr-flex pr-justify-end pr-h-full">
                            <Player v-show="$store.state.player.song" class="pr-self-end"></Player>
                        </div>
                    </div>
                    <div class="navigation__screen__middle" :class="{'pr-opacity-0 pr-pointer-events-none': !$store.state.navigation.fullscreen}">
                        <ul class="navigation__links pr-list-reset">
                            <li class="navigation__link">
                                <Header look="brand">
                                    <router-link @click.native="$store.dispatch('navigation/toggleFullscreen')" :to="{name: 'home'}">Home</router-link>
                                </Header>
                            </li>
                            <li class="navigation__link">
                                <Header look="brand">
                                    <router-link @click.native="$store.dispatch('navigation/toggleFullscreen')" :to="{name: 'about'}">About</router-link>
                                </Header>
                            </li>
                        </ul>
                    </div>
                    <div class="navigation__screen__bottom">
                        <div class="pr-w-2/3 pr-flex pr-flex-wrap pr-content-end">
                            <Header class="pr-w-full pr-ml-lg pr-mb-base" look="brand">Playing</Header>
                            <Header class="pr-w-full" look="main">{{$store.state.player.song ? $store.state.player.song.embeds[0].title : ''}}</Header>
                        </div>
                        <div class="pr-w-1/3">
                            <div class="pr-ratio-1/1">
                                <TweenTransition ref="cover" class="pr-absolute pr-pin">
                                    <transition @enter="coverTransitionEnter" @leave="coverTransitionLeave" :css="false" mode="out-in">
                                        <img :key="cover" class="pr-fit-cover pr-w-full pr-h-full" :src="cover">
                                    </transition>
                                </TweenTransition>
                            </div>
                        </div>
                    </div>
                    <div class="navigation__screen__background">
                        <TweenTransition ref="background" class="pr-absolute pr-pin">
                            <transition @enter="backgroundTransitionEnter" @leave="backgroundTransitionLeave" :css="false" mode="out-in">
                                <BluredBackground :key="cover" :image="cover" look="heavy" class="pr-absolute pr-pin pr-opacity-25"></BluredBackground>
                            </transition>
                        </TweenTransition>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Header from '@/components/atoms/Header.vue';
import Player from '@/components/molecules/Player.vue';
import BluredBackground from '@/components/molecules/BluredBackground.vue';
import TweenTransition from '@/components/atoms/TweenTransition.vue';
import {TweenLite} from 'gsap';
@Component({
    components: {
        Header,
        Player,
        TweenTransition,
        BluredBackground
    },
    computed: {

    },
})
export default class Navigation extends Vue {
    get cover() {
        return this.$store.state.player.song ? this.$store.state.player.song.embeds[0].thumbnail.proxy_url : '';
    }
    public backgroundTransitionEnter(el, done) {
        (this.$refs['background'] as any).enter(done);
    }

    public backgroundTransitionLeave(el, done) {
        (this.$refs['background'] as any).leave(done);
    }
    public coverTransitionEnter(el, done) {
        (this.$refs['cover'] as any).enter(done);
    }

    public coverTransitionLeave(el, done) {
        (this.$refs['cover'] as any).leave(done);
    }
}
</script>
