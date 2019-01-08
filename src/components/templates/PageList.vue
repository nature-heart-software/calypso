<style lang="scss" scoped>
    .page-list {
        padding-top: 100px;
        height: 100vh;
        .page-list__header {
            padding-top: config('padding.xl');
            padding-bottom: config('padding.xl');
        }
        .page-list__content {

        }
    }
</style>

<template>
    <div class="page-list">
        <div class="container page-list__header">
            <slot name="header"></slot>
        </div>
        <div>
            <slot class="page-list__content" name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class PageList extends Vue {
}
</script>
