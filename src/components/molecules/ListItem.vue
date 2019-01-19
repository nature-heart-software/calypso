<style lang="scss" scoped>
    .list-item {
        height: 560px;
        display: flex;
        //margin-top: -200px;
        position: relative;
        &:first-of-type {
            margin-top: 0;
        }
    }

</style>

<template>
    <div ref="item" class="list-item">
        <Song v-if="isInRange" class="pr-w-full pr-flex" :song="song" :scroll-percentage="scrollPercentage"></Song>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Header from '@/components/atoms/Header.vue';
import Song from '@/components/molecules/Song.vue';

@Component({
    components: {
        Header,
        Song
    },
})
export default class ListItem extends Vue {
    @Prop({required: true}) private song!: any;
    private isInRange: boolean = false;
    private scrollPercentage: number = 0;
    private mounted() {
        this.bindListeners();
    }
    private beforeDestroy() {
        this.removeListeners();
    }
    private bindListeners() {
        window.addEventListener('scroll', this.onScroll);
        window.dispatchEvent(new Event('scroll'));
    }
    private removeListeners() {
        window.removeEventListener('scroll', this.onScroll);
    }

    private onScroll(e: any) {
        this.isInRange = this.withinRange();
        this.scrollPercentage = this.getScrollPercentage();
    }
    private withinRange() {
        const elm = (this.$refs['item'] as any);
        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const threshold = -viewHeight;
        const above = rect.bottom - threshold < 0;
        const below = rect.top - viewHeight + threshold >= 0;
        return !above && !below ;
    }
    private getScrollPercentage() {
        const elm = (this.$refs['item'] as any);
        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const max = -rect.height;
        const min = viewHeight;
        return ((rect.top - min) * 100) / (max - min);
    }
}
</script>
