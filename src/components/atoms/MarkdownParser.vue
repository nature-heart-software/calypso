<style lang="scss" scoped>
</style>

<template>
    <div class="markdown-parser" v-html="generatedMarkdown"></div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Header extends Vue {
    @Prop({required: true}) markdown!: string;
    get generatedMarkdown() {
        return 'hello';
    }
}
</script>
