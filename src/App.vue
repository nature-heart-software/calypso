<template>
    <div id="app">
        <Navigation></Navigation>
        <router-view></router-view>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import Navigation from '@/components/organisms/Navigation.vue';

    @Component({
        components: {
            Navigation,
        },
    })
    export default class App extends Vue {
        mounted() {
        }
    }
</script>

<style lang="scss">
    body {
        background-color: config('colors.black');
        //height: (948px*3)+1;
    }
#app {
    /*height: 100vh;*/
    /*overflow: auto;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
}
</style>
