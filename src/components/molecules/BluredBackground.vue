<style lang="scss" scoped>
    .bluredBackground {
        position: relative;
        .bluredBackground__image {
            position: absolute;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            background-size: cover;
            background-position: center;
            filter: blur(10px);
        }
        &--heavy {
            .bluredBackground__image {
                filter: blur(60px);
            }
        }
        &--clear {
            .bluredBackground__image {
                opacity: 1;
            }
        }
        &--grayscale {
            .bluredBackground__image {
                opacity: 1;
            }
        }
    }
</style>

<template>
    <div class="bluredBackground" :class="[getLooks]">
        <div ref="background" class="bluredBackground__image" :style="`background-image: url('${image}');`">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {TweenLite} from 'gsap';
@Component({
    components: {
    },
})
export default class BluredBackground extends Vue {
    @Prop({required: true}) private image!: any;
    @Prop({ default: 'default' }) public look!: string;

    private looks: any = {
        default: '',
        heavy: 'bluredBackground--heavy',
        clear: 'bluredBackground--clear',
        grayscale: 'bluredBackground--grayscale'
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
    private onMouseMove(e) {
        const {background} = this.$refs;
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
        const percentageX = e.clientX / viewWidth * 100;
        const percentageY = e.clientY / viewHeight * 100;
        // TODO: Maths for this
        TweenLite.to(background, 1, {x: `${-(percentageX - 50)/10}%`, y: `${-(percentageY - 50)/10}%`});
    }

    private mounted() {
        this.bindListeners();
    }

    private beforeDestroy() {
        this.removeListeners();
    }

    private bindListeners() {
        window.addEventListener('mousemove', this.onMouseMove);
    }

    private removeListeners() {
        window.removeEventListener('mousemove', this.onMouseMove);
    }
}
</script>
