<style lang="scss" scoped>
    .header {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 20px;
        letter-spacing: .05em;
        &--brand {
            font-size: 24px;
            letter-spacing: .44em;
            line-height: 1.2;
        }

        &--main {
            font-size: 48px;
            line-height: 1.2;
            clear: both;
            .header__bar,
            &.header__bar {
                display: block;
                &::before {
                    content: '';
                    float: left;
                    width: 70px;
                    height: 18px;
                    background-color: config('colors.base-text-color');
                    margin-top: 15px;
                    clear: both;
                }
            }
        }

        &--right {
            text-align: right;
            .header__bar {
                &::before {
                    float: right;
                }
            }
        }

        &--light {
            color: white;
            .header__bar,
            &.header__bar {
                &::before {
                    background-color: white;
                }
            }
        }
    }
</style>
<style lang="scss">
    u {
        position: relative;
        text-decoration: none;
        &::before {
            content: '';
            position: absolute;
            bottom: -6px;
            width: 100%;
            height: 4px;
            background-color: white;
        }
    }
    strong {
        u {
            font-size: 32px;
            line-height: 1.2;
            clear: both;
            padding-bottom: 30px;
            position: relative;
            margin-top: 64px;
            display: inline-flex;
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 70px;
                height: 18px;
                background-color: white;
                clear: both;
            }
        }
    }
</style>

<template>
    <component class="header" :class="[getLooks]" :is="tag">
        <slot></slot>
        <div v-if="hasHeaderBar" class="header__bar"></div>
    </component>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class Header extends Vue {
        @Prop({default: 'h2'}) public tag!: string;
        @Prop({default: 'default'}) public look!: string;

        private looks: any = {
            default: '',
            brand: 'header--brand',
            main: 'header--main',
            right: 'header--right',
            light: 'header--light',
        };

        private get hasHeaderBar() {
            return this.look.split(' ').includes('main');
        }

        private get getLooks() {
            const looks = this.look.split(' ');
            const classes = looks
                .filter((look) => this.looks[look])
                .map((look) => this.looks[look])
                .join(' ')
            ;
            return classes;
        }
    }
</script>
