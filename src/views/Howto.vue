<template>
    <div class="howto">
        <PageText>
            <template slot="header">
                <Header look="main">How to</Header>
            </template>
            <template slot="content">
                <div v-html="this['howto/html']"></div>
            </template>
        </PageText>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from '@/components/atoms/Header.vue';
    import PageText from '@/components/templates/PageText.vue';
    import store from '@/store';
    import {mapGetters} from 'vuex';
    @Component({
        components: {
            Header,
            PageText,
        },
        computed: {
            ...mapGetters([
                'howto/html'
            ])
        }
    })
    export default class Howto extends Vue {
        public beforeRouteEnter(from: any, to: any, next: any) {
            const promises: Array<Promise<any>> = [
                store.dispatch('channels/fetch'),
                store.dispatch('howto/fetch'),
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
