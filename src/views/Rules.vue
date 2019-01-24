<template>
    <div class="rules">
        <PageText>
            <template slot="header">
                <Header look="main">Rules</Header>
            </template>
            <template slot="content">
                <div v-html="this['rules/html']"></div>
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
                'rules/html'
            ])
        }
    })
    export default class Rules extends Vue {
        public beforeRouteEnter(from: any, to: any, next: any) {
            const promises: Array<Promise<any>> = [
                store.dispatch('channels/fetch'),
                store.dispatch('rules/fetch'),
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
