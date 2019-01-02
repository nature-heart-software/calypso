<template>
    <div id="app">
        <Navigation></Navigation>
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
    export default class Home extends Vue {

    }
</script>

<style lqng="scss">
#app {
    background-color: config('colors.black');
    height: 100vh;
}
</style>
