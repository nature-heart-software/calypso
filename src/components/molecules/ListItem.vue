<style lang="scss" scoped>
    .list-item {
        height: 560px;
        display: flex;
        //margin-top: -200px;
        position: relative;
        pointer-events: none;
        &:first-of-type {
            margin-top: 0;
        }
        .list-item__container {
            display: flex;
        }
        .list-item__background {
            position: absolute;
            width: 45%;
            height: 80%;
            bottom: 0;
            overflow: hidden;
            opacity: .3;
            pointer-events: auto;
            .list-item__background__image {
                position: absolute;
                top: -5%;
                left: -5%;
                right: -5%;
                bottom: -5%;
                background-size: cover;
                filter: blur(10px);
            }
        }
        .list-item__content__front {
            display: flex;
            pointer-events: auto;
        }
        .list-item__content {
            width: 50%;
            .list-item__content__user {
                display: flex;
                transform: translate(0, -50%);
                align-items: flex-end;
                width: 100%;
                padding-left: config('padding.lg');
                .list-item__content__user__picture {
                    width: 128px;
                    height: 128px;
                    background-size: cover;
                }
                .list-item__content__user__name {
                    height: (128px/2);
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
                }
            }
            .list-item__content__title {
                position: relative;
                pointer-events: auto;
                .list-item__content__title__header {
                    position: absolute;
                    top: 0;
                    width: 150%;
                }
            }
        }
        &--odd {
            .list-item__content {
                padding-right: config('padding.2xl');
            }
        }
        &--even {
            .list-item__container {
                flex-direction: row-reverse;
            }
            .list-item__background {
                right: 0;
            }
            .list-item__content__front {
                flex-direction: row-reverse;
            }
            .list-item__content {
                padding-left: config('padding.2xl');
                .list-item__content__user {
                    flex-direction: row-reverse;
                    justify-content: right;
                    padding-left: 0;
                    padding-right: config('padding.lg');
                    .list-item__content__user__picture {
                    }
                    .list-item__content__user__name {
                        margin-left: 0;
                        margin-right: 10px;
                        text-align: right;
                    }
                }
                .list-item__content__title {
                    text-align: right;
                    .list-item__content__title__header {
                        right: 0;
                    }
                }
            }
        }
    }

</style>

<template>
    <div class="list-item" :class="[isEven(index) ? '' : 'list-item--odd']">
        <div class="list-item__background">
            <div class="list-item__background__image" :style="`background-image: url(${song.embeds[0].thumbnail.url})`"></div>
        </div>
        <div class="container list-item__container">
            <div class="list-item__content">
                <div class="list-item__content__front">
                    <div class="pr-w-1/2 pr-relative">
                        <div class="pr-ratio-1/1 pr-bg-cover pr-bg-center"
                             :style="`background-image: url(${song.embeds[0].thumbnail.url})`"></div>
                        <div class="list-item__content__user pr-absolute pr-pin-bottom">
                            <div class="list-item__content__user__picture" :style="`background-image: url(https://cdn.discordapp.com/avatars/${song.author.id}/${song.author.avatar}.jpg)`"></div>
                            <div class="list-item__content__user__name">
                                <Header class="pr-capitalize">{{song.author.username}}<br><span class="pr-font-normal">Shared</span>
                                </Header>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-item__content__title pr-mt-24">
                    <Header class="list-item__content__title__header" look="main" :look="isEven(index) ? 'main' : 'main'">{{song.embeds[0].title}}</Header>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Header from '@/components/atoms/Header.vue';

@Component({
    components: {
        Header,
    },
})
export default class ListItem extends Vue {
    private placeholderJPG: string = require('@/assets/placeholder.jpg');
    @Prop({default: 0}) private index!: number;
    @Prop({required: true}) private song!: boolean;

    private isEven(n: number) {
        return n % 2 == 0;
    }
}
</script>
