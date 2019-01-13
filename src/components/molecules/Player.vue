<style lang="scss" scoped>
    .player {

    }
</style>

<template>
    <div class="player">
        <audio id="player__me"></audio>
    </div>
</template>

<script lang="ts">
    declare var MediaElementPlayer: any;
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import 'mediaelement/full';
    import 'mediaelement/build/mediaelementplayer.css';
    import moment from 'moment';
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
        private player: any = null;
        private currentTime: any = null;
        private totalTime: any = null;

        get song() {
            return this.$store.state.player.song;
        }

        @Watch('song')
        onSongChange() {
            console.log('song changed');
            this.setSong(this.song.embeds[0].url);
        }
        private pause() {
            this.player.pause()
        }

        private play() {
            this.player.play()
        }

        private setSong(url: string) {
            this.player.setSrc(url);
            this.player.play()
        }
        private mounted() {
            const __this = this;
            this.player = new MediaElementPlayer('player__me', {
                success(mediaElement: any, originalNode: any, instance: any) {
                    mediaElement.addEventListener('timeupdate', () => {
                        __this.currentTime = moment.utc(__this.player.getCurrentTime()*1000).format('mm:ss');
                        __this.totalTime = moment.utc(__this.player.duration*1000).format('mm:ss');
                    });
                }
            });
        }
    }
</script>
