<template>
    <div class="about">
        <PageText>
            <template slot="header">
                <Header look="main">About</Header>
            </template>
            <template slot="content">
                <div v-html="this['about/html']"></div>
            </template>
        </PageText>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from '@/components/atoms/Header.vue';
    import PageText from '@/components/templates/PageText.vue';
    import MarkdownParser from '@/components/atoms/MarkdownParser.vue';
    import store from '@/store';
    import {mapGetters} from 'vuex';
    @Component({
        components: {
            Header,
            PageText,
            MarkdownParser
        },
        computed: {
            ...mapGetters([
                'about/html'
            ])
        }
    })
    export default class About extends Vue {

        public beforeRouteEnter(from: any, to: any, next: any) {
            const promises: Array<Promise<any>> = [
                store.dispatch('about/fetch'),
            ];
            Promise.all(promises)
                .then(() => {
                    next();
                })
                .catch(() => {
                    next();
                });
        }
    }
</script>
