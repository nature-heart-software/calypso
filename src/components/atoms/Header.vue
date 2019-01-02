<style lang="scss" scoped>
    .header {
        font-weight: bold;
        text-transform: uppercase;
        &--brand {
            font-size: 24px;
            letter-spacing: .44em;
            line-height: 1.2;
        }

        &--main {
            font-size: 64px;
            letter-spacing: .05em;
            line-height: 1.2;
            &::after {
                content: '';
                display: block;
                width: 70px;
                height: 18px;
                background-color: white;
                margin-top: 15px;
            }
        }

        &--dark-theme {
            color: white;
        }
    }
</style>

<template>
    <component class="header header--dark-theme" :class="[getLooks]" :is="tag">
        <slot></slot>
    </component>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Header extends Vue {
    @Prop({default: 'h2'}) public tag!: string;
    @Prop({ default: 'default' }) public look!: string;

    private looks: any = {
        default: '',
        brand: 'header--brand',
        main: 'header--main',
    };

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
