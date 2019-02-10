<style lang="scss" scoped>
    .player {
        display: flex;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 50vw;
        height: 100px;
        background-color: config('colors.black');
        .player__picture {
            width: 100px;
            height: 100px;
            display: flex;
            color: white;
            text-transform: uppercase;
            font-size: 12px;
            align-items: center;
            justify-items: center;
            position: relative;
            * {
                text-align: center;
            }
        }
        .player__trackName {
            color: white;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: .1rem;
            .player__trackName__top {
                height: 24px;
            }
            .player__trackName__bottom {
                height: 17px;
            }
            .player__trackName__link {
                display: inherit;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                &--hidden {
                    text-overflow: initial;
                }
            }
            .player__trackName--small {
                height: 13px;
                margin-bottom: 4px;
            }
        }
        .player__trackProgress {
            margin-top: -8px;
            /deep/ {
                .el-slider__runway {
                    margin: 0;
                    border-radius: 0;
                    &:before {
                        background-color: white;
                    }
                    .el-slider__bar {
                        border-radius: 0;
                        &:before {
                            background-color: config('colors.primary');
                        }
                    }
                    .el-slider__button {
                        height: 12px;
                        width: 12px;
                        border: 0;
                        background-color: white;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 1);
                    }
                }
                .el-slider__runway,
                .el-slider__bar {
                    height: 20px;
                    display: flex;
                    background-color: transparent;
                    align-items: center;
                    &:before {
                        content: '';
                        flex: 1;
                        height: 4px;
                    }
                }
                .el-slider__button-wrapper {
                    opacity: 0;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
        .player__body {
            flex: 1;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            max-width: calc(100% - 100px);
            .player__body__bottom {
                height: 4px;
            }

        }
        .player__buttons {
            display: flex;
        }
        .player__button {
            width: 16px;
            height: 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            i {
                line-height: 1;
            }
            & + .player__button {
                margin-left: 20px;
            }
            &:hover {
                color: config('colors.secondary');
            }
            &--active {
                color: config('colors.primary')!important;
            }

        }
        .player__controls {
            display: flex;
            align-content: space-between;
            flex-wrap: wrap;
            width: 14%;
            .player__buttons {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .player__controls__top {
                height: 50px;
                .player__button {
                    width: auto;
                    height: auto;
                    font-size: 1.4rem;
                }
            }
            .player__controls__bottom {
                position: absolute;
            }
        }
        &:hover {
          /deep/ {
              .el-slider__button-wrapper {
                  opacity: 1;
                  /*cursor: pointer!important;*/
              }
          }
        }
    }
</style>

<template>
    <div class="player">
        <div class="player__controls pr-pl-8 pr-py-4">
            <div class="player__buttons player__controls__top">
                <div class="player__button" @click="playPrevious()">
                    <i class="icon ion-md-skip-backward"></i>
                </div>
                <div class="player__button" @click="resumePause()">
                    <i v-if="isPlaying" class="icon ion-md-pause"></i>
                    <i v-else class="icon ion-md-play"></i>
                </div>
                <div class="player__button" @click="playNext()">
                    <i class="icon ion-md-skip-forward"></i>
                </div>
            </div>
            <div class="player__buttons player__controls__bottom pr-relative">
                <div class="pr-flex-1 pr-inline-flex    ">
                    <div class="player__button" :class="{'player__button--active': repeat}" @click="toggleRepeat()">
                        <i class="icon ion-md-repeat"></i>
                    </div>
                    <div class="player__button" @click="openLink()">
                        <i class="icon ion-md-open"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="player__body pr-w-full pr-px-8 pr-py-4">
            <!--<div class="player__body__top pr-w-full pr-max-w-full">-->
            <!--</div>-->
            <div class="player__body__middle pr-w-full pr-pointer-events-none">
                <div class="player__trackName">
                    <div class="player__trackName__top player__trackName__link" :class="{'player__trackName__link--hidden': !showText}">
                        <TweenTextTransition ref="text1" class="pr-inline" @show-text="showText = true" @hide-text="showText = false">
                            <transition @enter="text1TransitionEnter" @leave="text1TransitionLeave" :css="false"
                                        mode="out-in">
                                <a :key="song ? song.id : ''" :title="song ? song.embeds[0].title : ''" :href="song ? song.embeds[0].url : ''"
                                   class="pr-text-white hover:pr-text-grey-light pr-pointer-events-auto"
                                   target="_blank">{{song ? song.embeds[0].title : ''}}</a>
                            </transition>
                        </TweenTextTransition>
                    </div>
                    <div class="player__trackName__bottom pr-flex pr-items-center pr-justify-between">
                        <TweenTextTransition ref="text2" class="pr-inline pr-text-sm pr-leading-none player__trackName--small">
                            <transition @enter="text2TransitionEnter" @leave="text2TransitionLeave" :css="false"
                                        mode="out-in">
                        <a :key="song ? song.id : ''" :title="song ? song.embeds[0].author.name : ''" :href="song ? song.embeds[0].author.url : ''"
                           class="pr-inline player__trackName__link pr-leading-none pr-text-xs pr-text-grey-light hover:pr-text-grey pr-leading-normal pr-pointer-events-auto"
                           target="_blank">
                                    <span>{{song ? song.embeds[0].author.name : ''}}</span>
                        </a>
                            </transition>
                        </TweenTextTransition>
                        <TweenTextTransition ref="text3" class="pr-inline pr-text-sm pr-leading-none player__trackName--small">
                            <transition @enter="text3TransitionEnter" @leave="text3TransitionLeave" :css="false"
                                        mode="out-in">
                        <strong :key="song ? song.id : ''"
                                class="pr-inline pr-text-right pr-text-xs pr-text-grey-light pr-font-mono pr-pointer-events-auto">
                                    <span v-if="song">{{this['player/currentTimeFormated']}} / {{this['player/totalTimeFormated']}}</span>
                        </strong>
                            </transition>
                        </TweenTextTransition>
                    </div>
                </div>
            </div>
            <div class="player__body__bottom pr-w-full">
                <div class="player__trackProgress">
                    <el-slider height="4px" v-model="trueCurrentTime" :min="0" :max="$store.state.player.trueTotalTime" :show-tooltip="false"
                               @change="setTime" @mousedown.native="isSliding = true"></el-slider>
                </div>
            </div>
            <div class="pr-absolute pr-overflow-hidden" style="width: 0; height: 0;">
                <audio id="player__me"></audio>
            </div>
        </div>
        <div class="player__picture">
            <TweenTransition ref="cover" class="pr-absolute pr-pin">
                <transition @enter="coverTransitionEnter" @leave="coverTransitionLeave" :css="false" mode="out-in">
                    <div :key="song ? song.embeds[0].thumbnail.proxy_url : ''"
                         class="pr-absolute pr-pin pr-bg-cover pr-bg-center"
                         :style="`background-image: url('${song ? song.embeds[0].thumbnail.proxy_url : ''}')`"></div>
                </transition>
            </TweenTransition>
        </div>
    </div>
</template>

<script lang="ts">
    declare var MediaElementPlayer: any;
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import 'mediaelement/full';
    import 'mediaelement/build/mediaelementplayer.css';
    import {findIndex} from 'lodash';
    import {mapGetters} from 'vuex';
    import TweenTransition from '@/components/atoms/TweenTransition.vue';
    import TweenTextTransition from '@/components/atoms/TweenTextTransition.vue';

    @Component({
        components: {
            TweenTransition,
            TweenTextTransition
        },
        computed: {
            ...mapGetters([
                'player/song',
                'player/currentTimeFormated',
                'player/totalTimeFormated',
            ]),
        },
    })
    export default class Player extends Vue {
        private isPlaying: boolean = false;
        private repeat: boolean = false;
        private player: any = null;
        private isSliding: boolean = false;
        private showText: boolean = true;

        get trueCurrentTime() {
            return this.$store.state.player.trueCurrentTime;
        }

        set trueCurrentTime(value) {
            this.$store.dispatch('player/setTrueCurrentTime', value);
        }

        get songIndex() {
            return findIndex(this.$store.state.findings.collection, (item: any) => item === this.song);
        }

        get previousSong() {
            return this.$store.state.findings.collection[this.songIndex - 1];
        }

        get nextSong() {
            return this.$store.state.findings.collection[this.songIndex + 1];
        }

        get song() {
            return this['player/song'];
        }

        public coverTransitionEnter(el, done) {
            (this.$refs.cover as any).enter(done);
        }

        public coverTransitionLeave(el, done) {
            (this.$refs.cover as any).leave(done);
        }

        public text1TransitionEnter(el, done) {
            (this.$refs.text1 as any).enter(done);
        }

        public text1TransitionLeave(el, done) {
            (this.$refs.text1 as any).leave(done);
        }

        public text2TransitionEnter(el, done) {
            (this.$refs.text2 as any).enter(done);
        }

        public text2TransitionLeave(el, done) {
            (this.$refs.text2 as any).leave(done);
        }

        public text3TransitionEnter(el, done) {
            (this.$refs.text3 as any).enter(done);
        }

        public text3TransitionLeave(el, done) {
            (this.$refs.text3 as any).leave(done);
        }

        @Watch('song')
        public onSongChange() {
            this.setSong(this.song.embeds[0].url);
        }

        private pause() {
            this.player.pause();
            this.isPlaying = false;
        }

        private play() {
            if (this.songIndex < 0) {
                this.$store.dispatch('player/play', this.$store.state.findings.collection[0]);
            }
            this.player.play();
            this.isPlaying = true;
        }

        private replay() {
            this.player.setCurrentTime(0);
            this.player.play();
            this.isPlaying = true;
        }

        private playPrevious() {
            this.$store.dispatch('player/play', this.previousSong);
        }

        private playNext() {
            this.$store.dispatch('player/play', this.nextSong);
        }

        private toggleRepeat() {
            this.repeat = !this.repeat;
        }

        private openLink() {
            window.open(this.song.embeds[0].url, '_blank');
        }
        private resumePause() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }

        private setSong(url: string) {
            this.player.setSrc(url);
            this.player.play();
            this.isPlaying = true;
            this.player.setCurrentTime(0);
        }

        private setTime(time: number) {
            this.player.setCurrentTime(time);
            this.isSliding = false;
        }

        private mounted() {
            const __this = this;
            this.player = new MediaElementPlayer('player__me', {
                success(mediaElement: any, originalNode: any, instance: any) {
                    mediaElement.addEventListener('timeupdate', () => {
                        const currentTime = __this.player.getCurrentTime();
                        const totalTime = __this.player.duration;
                        if (!__this.isSliding) {
                            __this.$store.dispatch('player/setTrueCurrentTime', currentTime);
                            __this.$store.dispatch('player/setTrueTotalTime', totalTime);
                        }
                    });
                    mediaElement.addEventListener('ended', () => {
                        if (__this.repeat) {
                            __this.replay();
                        } else {
                            __this.playNext();
                        }
                    });
                },
            });
            this.bindListeners();
        }

        private onMouseUp() {
        }

        private bindListeners() {
            // window.addEventListener('mouseup', this.onMouseUp)
        }

        private removeListeners() {

        }

        private beforeDestroy() {
            this.removeListeners();
        }
    }
</script>
