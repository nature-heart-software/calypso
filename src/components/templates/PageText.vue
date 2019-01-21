<style lang="scss" scoped>
    .page-text {
        padding-top: 100px;
        height: 100vh;
        .page-text__header {
            padding-top: config('padding.xl');
            padding-bottom: config('padding.xl');
        }
        .page-text__content {
            color: white;
            @apply text-3xl;
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
