<style lang="scss" scoped>
    .page-text {
        padding-top: 100px;
        padding-bottom: 100px;
        .page-text__header {
            padding-top: config('padding.xl');
            padding-bottom: config('padding.xl');
        }
        .page-text__content {
            color: white;
            @apply text-3xl;
            /deep/ {
                .emoji {
                    width: 32px;
                }
                p {
                    margin-bottom: 0;
                }
                pre {
                    margin-top: 32px;
                    border: 0;
                    code {
                        border: 0;
                        border-left: 8px solid rgb(38, 40, 72);
                        background-color: transparent;
                        color: white;
                        padding: 16px 30px;
                        @apply text-xl font-sans;
                    }
                    margin-bottom: 64px;
                }
                a {
                    @apply text-grey;
                    position: relative;
                    text-decoration: none;
                    padding-bottom: 12px;
                    transition: all .5s cubic-bezier(.165, .84, .44, 1);
                    &::before {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        width: 70px;
                        max-width: 30%;
                        height: 8px;
                        background-color: white;
                        transition: all .5s cubic-bezier(.165, .84, .44, 1);
                    }
                    &:hover {
                        @apply text-white;
                        &::before {
                            width: 100%;
                            max-width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="page-text">
        <div class="container page-text__header">
            <slot name="header"></slot>
        </div>
        <div class="container page-text__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class PageText extends Vue {
}
</script>
