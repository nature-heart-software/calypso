<template>
    <div>
        <div class="home">
            <PageList>
                <template slot="header">
                    <Header look="main">Featured</Header>
                </template>
                <template slot="content">
                    <ListItem :key="index" v-for="(song, index) in $store.state.findings.collection" :song="song"></ListItem>
                </template>
            </PageList>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageList from '@/components/templates/PageList.vue';
import BackgroundFigures from '@/components/atoms/BackgroundFigures.vue';
import Header from '@/components/atoms/Header.vue';
import ListItem from '@/components/molecules/ListItem.vue';
import store from '@/store';
@Component({
    components: {
        Header,
        PageList,
        ListItem,
    },
})
export default class Home extends Vue {
    private beforeRouteEnter(from: any, to: any, next: any) {
        const promises: Array<Promise<any>> = [
            store.dispatch('findings/fetch'),
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
