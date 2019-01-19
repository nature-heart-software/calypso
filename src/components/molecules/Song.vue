<style lang="scss" scoped>
    .song {
        height: 560px;
        display: flex;
        //margin-top: -200px;
        position: relative;
        &:first-of-type {
            margin-top: 0;
        }
        .song__container {
            display: flex;
        }
        .song__background--wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .song__background {
            position: absolute;
            width: 45%;
            height: 80%;
            top: 50%;
            transform: translate(0, -50%);
            overflow: hidden;
            opacity: .3;
            .song__background__image {
                position: absolute;
                top: -5%;
                left: -5%;
                right: -5%;
                bottom: -5%;
                background-size: cover;
                filter: blur(10px);
            }
        }
        .song__content__front {
            display: flex;
            width: 30%;
        }
        .song__content {
            width: 100%;
            display: flex;
            align-self: center;
            .song__content__user {
                display: flex;
                transform: translate(0, -50%);
                align-items: flex-end;
                width: 100%;
                padding-left: config('padding.lg');
                .song__content__user__picture {
                    width: 128px;
                    height: 128px;
                    background-size: cover;
                }
                .song__content__user__name {
                    height: (128px/2);
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
                }
            }
            .song__content__title {
                position: relative;
                flex: 1;
                display: flex;
                align-items: center;
                .song__content__title__header {
                    position: absolute;
                    top: 0;
                    width: 70%;
                }
            }
        }
    }

</style>

<template>
    <div class="song" @click="play()">
        <div class="song__background--wrapper"  ref="background">
            <div class="song__background">
                <div class="song__background__image" :style="`background-image: url(${song.embeds[0].thumbnail.url})`"></div>
            </div>
        </div>
        <div class="container song__container">
            <div class="song__content">
                <div class="song__content__front">
                    <div class="pr-w-full pr-relative pr-pr-lg">
                        <div class="pr-ratio-1/1 pr-bg-cover pr-bg-center"
                             :style="`background-image: url(${song.embeds[0].thumbnail.url})`"></div>
                        <div class="song__content__user pr-absolute pr-pin-bottom">
                            <div class="song__content__user__picture" :style="`background-image: url(https://cdn.discordapp.com/avatars/${song.author.id}/${song.author.avatar}.jpg)`"></div>
                            <div class="song__content__user__name">
                                <Header class="pr-capitalize">{{song.author.username}}<br><span class="pr-font-normal">Shared</span>
                                </Header>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="song__content__title">
                    <Header ref="title" class="song__content__title__header" look="main" :look="'main'">{{song.embeds[0].title}}</Header>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import Header from '@/components/atoms/Header.vue';
import {TimelineLite} from 'gsap';

@Component({
    components: {
        Header,
    },
})
export default class Song extends Vue {
    @Prop({required: true}) private song!: any;
    @Prop({required: true}) private scrollPercentage!: number;
    private tl: any = new TimelineLite({paused: true});
    @Watch('scrollPercentage')
    onScrollPercentageChange() {
        let percentage;
        if (this.scrollPercentage >= 100) {
            percentage = 100;
        } else if (this.scrollPercentage <= 0) {
            percentage = 0;
        } else {
            percentage = this.scrollPercentage;
        }
        this.tl.progress(percentage/100);
    }
    private isEven(n: number) {
        return n % 2 == 0;
    }
    private play() {
        this.$store.dispatch('player/play', this.song);
    }
    private mounted() {
        const {title, background} = this.$refs;
        const titleYValue = 400;
        const backgroundYValue = 50;
        this.tl
            .add("start")
            .set([title.$el, background], {display: 'none'})
            .set(title.$el, {y: `-${titleYValue}px`})
            .set(background, {y: `-${backgroundYValue}px`})
            .from(title.$el, 1, {display: 'block', y: `${titleYValue}px`}, "start")
            .from(background, 1, {display: 'block', y: `${backgroundYValue}px`}, "start")
            .set([title.$el, background], {display: 'none'})
    }
}
</script>
