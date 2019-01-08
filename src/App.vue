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

    }
</script>

<style lang="scss">
    body {
        background-color: config('colors.black');
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
