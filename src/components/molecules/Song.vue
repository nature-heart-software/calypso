<style lang="scss" scoped>
    .songWrapper {
        position: relative;
    }
    .song {
        height: 560px;
        display: flex;
        //margin-top: -200px;
        position: relative;
        width: 100%;
        &:first-of-type {
            margin-top: 0;
        }
        .song__container {
            display: flex;
        }
        .song__background--wrapper {
            position: absolute;
            width: 100%;
            height: 60%;
        }
        .song__background {
            position: relative;
            height: 100%;
            top: 50%;
            transform: translate(-50px, -50%);
            /*opacity: .5;*/
            .song__background__imageWrapper,
            .song__background__image {
                height: 100%;
            }
            .song__background__imageWrapper {
                width: 50%;
                overflow: hidden;
                height: 100%;
                float: left;
                transition: all .6s cubic-bezier(.215, .61, .355, 1);
                position: relative;
                box-shadow: 0 90px 150px rgba(0, 0, 0, 0.1);
                &::after {
                    content: '';
                    position: absolute;
                    pointer-events: none;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    transition: all .6s cubic-bezier(.215, .61, .355, 1);
                    background-image: linear-gradient(120deg, config('colors.secondary') 0%, config('colors.primary') 100%);
                    opacity: .6;
                }
            }
            /*<!--.song__background__image {-->*/
                /*<!--position: absolute;-->*/
                /*<!--top: -5%;-->*/
                /*<!--left: -5%;-->*/
                /*<!--right: -5%;-->*/
                /*<!--bottom: -5%;-->*/
                /*<!--background-size: cover;-->*/
                /*<!--filter: blur(10px);-->*/
            /*<!--}-->*/
        }
        .song__content__front {
            display: flex;
            width: 30%;
        }
        .song__content {
            width: 100%;
            display: flex;
            align-self: center;
            .song__content__cover {
                box-shadow: 0 0 150px rgba(0,0,0,.3);
            }
            .song__content__user {
                display: inline-flex;
                align-items: center;
                margin-bottom: 20px;
                .song__content__user__picture {
                    width: 64px;
                    height: 64px;
                    background-size: cover;
                }
                .song__content__user__name {
                    height: (128px/2);
                    display: flex;
                    /*align-items: top;*/
                    margin-left: 10px;
                    .song__content__user__name__nick,
                    .song__content__user__name__action {
                        background-color: black;
                        color: white;
                        padding: 4px 6px;
                        font-size: 16px;
                        display: inline-flex;
                    }
                    .song__content__user__name__nick {

                    }
                    .song__content__user__name__action {
                        margin-top: 4px;
                        font-size: 14px;
                        font-weight: normal;
                    }
                }
            }
            .song__content__title {
                position: relative;
                flex: 1;
                display: flex;
                align-items: center;
                .song__content__title__header {
                    /*position: absolute;*/
                    top: 0;
                    width: 70%;
                }
            }
        }
        &--hover {
            cursor: pointer;
            .song__background__imageWrapper {
                height: 110%!important;
                width: 55%!important;
                &::after {
                    opacity: .8!important;
                }
            }
        }
    }

</style>

<template>
    <div ref="songWrapper" class="songWrapper">
        <div ref="song" class="song" :class="{'song--hover': hover}" @click="play()">
            <div class="song__background--wrapper"  ref="background">
                    <div class="container song__background">
                        <div class="song__background__imageWrapper">
                            <BluredBackground @mouseenter.native="hover = true" @mouseleave.native="hover = false" :image="song.embeds[0].thumbnail.url" class="song__background__image" look="clear grayscale"></BluredBackground>
                        </div>
                    </div>
            </div>
            <div class="container song__container">
                <div class="song__content">
                    <div class="song__content__front">
                        <div class="pr-w-full pr-relative pr-pr-lg pr-pointer-events-none">
                            <div @mouseenter="hover = true" @mouseleave="hover = false" class="song__content__cover pr-ratio-1/1 pr-bg-cover pr-bg-center pr-pointer-events-auto"
                                 :style="`background-image: url(${song.embeds[0].thumbnail.url})`"></div>
                        </div>
                    </div>
                    <div class="song__content__title pr-pointer-events-none">
                        <div ref="title" class="pr-w-full">
                            <div @mouseenter="hover = true" @mouseleave="hover = false" class="song__content__user pr-pointer-events-auto">
                                <div class="song__content__user__picture" :style="`background-image: url(https://cdn.discordapp.com/avatars/${song.author.id}/${song.author.avatar}.jpg)`"></div>
                                <div class="song__content__user__name">
                                    <Header class="pr-capitalize pr-leading-none"><span class="song__content__user__name__nick">{{song.author.username}}</span><br><span class="song__content__user__name__action">Shared</span>
                                    </Header>
                                </div>
                            </div>
                            <Header class="song__content__title__header" @mouseenter="hover = true" @mouseleave="hover = false" look="main light">{{song.embeds[0].title}}</Header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import Header from '@/components/atoms/Header.vue';
import BluredBackground from '@/components/molecules/BluredBackground.vue';
import {TimelineLite, TweenLite} from 'gsap';

@Component({
    components: {
        Header,
        BluredBackground
    },
})
export default class Song extends Vue {
    @Prop({required: true}) private song!: any;
    @Prop({required: true}) private scrollPercentage!: number;
    private tl: any = new TimelineLite({paused: true});
    private hover: boolean = false;
    @Watch('scrollPercentage')
    onScrollPercentageChange() {
        this.setScrollPercentage();
    }
    setScrollPercentage() {
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
        if (this.hover) {
            this.$store.dispatch('player/play', this.song);

        }
    }
    private mounted() {
        const {title, background, songWrapper} = (this.$refs as any);
        const titleYValue = 200;
        const backgroundYValue = 50;
        const songXValue = 100;
        // https://greensock.com/forums/topic/14458-using-set-in-a-timeline/
        this.tl
            .add("start")
            .set([title, background], {display: 'none'})
            .set(title, {y: -titleYValue*.3})
            .set(background, {y: `-${backgroundYValue}px`})
            // .set(songWrapper, {left: `${songXValue}px`})
            // .to(songWrapper, 1, {left: `-${songXValue}px`}, "start")
            .from(title, 1, {display: 'block', y: titleYValue, immediateRender: false}, "start")
            .from(background, 1, {display: 'block', y: `${backgroundYValue}px`, immediateRender: false}, "start")
            .set([title, background], {display: 'none'})
        ;
        this.bindListeners();
        this.setScrollPercentage();
    }
    private onMouseMove(e) {
        const {song} = this.$refs;
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
        const percentageX = e.clientX / viewWidth * 100;
        const percentageY = e.clientY / viewHeight * 100;
        // TODO: Maths for this
        TweenLite.to(song, 1, {x: `${-(percentageX - 50)/50}%`, y: `${-(percentageY - 50)/10}%`});
    }

    private beforeDestroy() {
        this.removeListeners();
    }

    private bindListeners() {
        window.addEventListener('mousemove', this.onMouseMove);
    }

    private removeListeners() {
        window.removeEventListener('mousemove', this.onMouseMove);
    }
}
</script>
