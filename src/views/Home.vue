<template>
    <div class="home">
        <PageList>
            <template slot="header">
                <Header look="main">Featured</Header>
            </template>
            <template slot="content">
                <ListItem :index="index+1" :key="index" v-for="(song, index) in $store.state.findings.collection" :song="song"></ListItem>
            </template>
        </PageList>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageList from '@/components/templates/PageList.vue';
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

    public beforeRouteEnter(from: any, to: any, next: any) {
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
