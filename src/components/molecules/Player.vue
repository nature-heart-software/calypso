<style lang="scss" scoped>
    .player {
        height: 100%;
        width: 500px;
        display: flex;
        .player__picture {
            width: 100px;
            height: 100px;
            background-color: black ;
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
        }
        .player__trackProgress {
            /deep/ {
                .el-slider__runway {
                    margin: 0;
                    background-color: white;
                    border-radius: 0;
                    .el-slider__bar {
                        border-radius: 0;
                        @apply bg-grey-darker;
                    }
                    .el-slider__button {
                        height: 12px;
                        width: 12px;
                        border: 0;
                        background-color: white;
                        box-shadow: 0 2px 4px 0 rgba(0,0,0,1);
                    }
                }
            }
        }
        .player__controls {
            flex: 1;
            align-items: center;
            display: flex;
            flex-wrap: wrap;

            .player__controls__buttons {
                display: flex;
                .player__controls__button {
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
                    & + .player__controls__button {
                        margin-left: 20px;
                    }
                }
            }

        }
    }
</style>

<template>
    <div class="player">
        <div class="player__controls pr-mr-8 pr-py-2 pr-pt-4">
            <div class="player__controls__top pr-w-full">
                <div class="player__controls__buttons">
                    <div class="player__controls__button" @click="playPrevious()">
                        <i class="icon ion-md-skip-backward"></i>
                    </div>
                    <div class="player__controls__button" @click="resumePause()">
                        <i v-if="isPlaying" class="icon ion-md-pause"></i>
                        <i v-else class="icon ion-md-play"></i>
                    </div>
                    <div class="player__controls__button" @click="playNext()">
                        <i class="icon ion-md-skip-forward"></i>
                    </div>
                </div>
            </div>
            <div class="player__controls__middle pr-w-full">
                <div class="player__trackName pr-my-2 pr-mt-0">
                    <div>
                        <a :title="song.embeds[0].title" :href="song.embeds[0].url" class="pr-text-white hover:pr-text-grey-light pr-overflow-hidden pr-whitespace-no-wrap" target="_blank" v-if="song">{{song.embeds[0].title}}</a>
                    </div>
                    <div class="pr-leading-none">
                        <a :title=" song.embeds[0].title" :href="song.embeds[0].author.url" class="pr-text-xs pr-text-grey-light hover:pr-text-grey" target="_blank" v-if="song">{{song.embeds[0].author.name}}</a>
                    </div>
                </div>
            </div>
            <div class="player__controls__bottom pr-w-full">
                <div class="player__trackProgress">
                    <el-slider v-model="trueCurrentTime" :min="0" :max="trueTotalTime" :show-tooltip="false"></el-slider>
                </div>
            </div>
            <div class="pr-absolute pr-overflow-hidden" style="width: 0; height: 0;">
                <audio id="player__me"></audio>

            </div>
        </div>
        <div class="player__picture">
            <span>Nothing is playing :(</span>
            <div v-if="song" class="pr-absolute pr-pin pr-bg-cover pr-bg-center" :style="`background-image: url('${song.embeds[0].thumbnail.proxy_url}')`"></div>
        </div>
    </div>
</template>

<script lang="ts">
    declare var MediaElementPlayer: any;
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import 'mediaelement/full';
    import 'mediaelement/build/mediaelementplayer.css';
    import moment from 'moment';
    import {findIndex} from 'lodash';
    import { mapGetters } from 'vuex';
    @Component({
        components: {},
        computed: {
            // ...mapGetters([
            //     'player/song'
            // ])
        }
    })
    export default class Player extends Vue {
        private isPlaying: any = true;
        private player: any = null;
        private trueCurrentTime: any = null;
        private trueTotalTime: any = null;

        get currentTimeFormated() {
            return moment.utc(this.trueCurrentTime*1000).format('mm:ss');
        }

        get totalTimeFormated() {
            return moment.utc(this.trueTotalTime*1000).format('mm:ss');
        }

        get songIndex() {
            return findIndex(this.$store.state.findings.collection, (item: any) => item === this.song);
        }

        get previousSong() {
            return this.$store.state.findings.collection[this.songIndex-1];
        }

        get nextSong() {
            return this.$store.state.findings.collection[this.songIndex+1];
        }

        get song() {
            return this.$store.state.player.song;
        }

        @Watch('song')
        onSongChange() {
            console.log('song changed');
            this.setSong(this.song.embeds[0].url);
        }
        private pause() {
            this.player.pause();
            this.isPlaying = false;
        }

        private play() {
            if (this.songIndex < 0 ) {
                this.$store.dispatch('player/play', this.$store.state.findings.collection[0]);
            }
            this.player.play();
            this.isPlaying = true;
        }

        private playPrevious() {
            this.$store.dispatch('player/play', this.previousSong);
        }

        private playNext() {
            this.$store.dispatch('player/play', this.nextSong);
        }

        private resumePause() {
            if(this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }

        private setSong(url: string) {
            this.player.setSrc(url);
            this.player.play();
        }
        private mounted() {
            const __this = this;
            this.player = new MediaElementPlayer('player__me', {
                success(mediaElement: any, originalNode: any, instance: any) {
                    mediaElement.addEventListener('timeupdate', () => {
                        const currentTime = __this.trueCurrentTime = __this.player.getCurrentTime();
                        const totalTime = __this.trueTotalTime =__this.player.duration;
                        if (Math.floor(currentTime) === Math.floor(totalTime) && typeof __this.nextSong) {
                            console.log('yeet');
                            __this.playNext();
                        }
                    });
                },
                // ended() {
                //     console.log('ended');
                //     if (this.nextSong) {
                //         __this.playNext();
                //     }
                // }
            });
        }
    }
</script>
