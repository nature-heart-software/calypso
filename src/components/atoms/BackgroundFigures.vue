<style lang="scss" scoped>
    .backgroundFigures {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .backgroundFigures__figure,
        .backgroundFigures__group {
            display: inline-block;
            position: absolute;
        }
        .backgroundFigures__figure {
            background-color: #10111f;
        }
        .backgroundFigures__timer {
            top: 20%;
            left: 60%;
        }
    }
</style>

<template>
    <div class="backgroundFigures">
        <div class="backgroundFigures__group backgroundFigures__timer" ref="timerSVG">
            <svg :key="this['player/currentTimeFormated']" overflow="visible">
                <defs>
                    <clipPath id="text-mask-1" x="0" y="0">
                        <text y="0" x="0" ref="timer" class="pr-font-mono" font-weight="bold" font-size="15em" fill="#fff" dominant-baseline="text-before-edge">{{this['player/currentTimeFormated']}}</text>
                    </clipPath>
                </defs>
                <g clip-path="url(#text-mask-1)" fill-opacity="1">
                    <rect :width="`${timerBBox.width}px`" :height="`${timerBBox.height}px`" :x="`${timerBBox.x}`" :y="`${timerBBox.y}`" fill="#161729" x="0" y="0" fill-opacity="1"/>
                    <rect :width="`${$store.state.player.trueCurrentTime / $store.state.player.trueTotalTime * timerBBox.width }px`" :height="`${timerBBox.height}px`"  :x="`${timerBBox.x}`" :y="`${timerBBox.y}`" fill="#10111f" x="0" y="0" fill-opacity="1"/>
                </g>
            </svg>
        </div>
        <template v-for="figure in figures">
            <div class="backgroundFigures__group" v-if="figure.type === 'group'" :style="`
                width: ${figure.width || 'auto'};
                height: ${figure.height || 'auto'};
                top: ${figure.top || 'auto'};
                left: ${figure.left || 'auto'};
                right: ${figure.right || 'auto'};
                bottom: ${figure.bottom || 'auto'};
                transform: translate(${figure.x || 0}, ${figure.x || 0}) rotate(${figure.rotation}deg);
            `">
                <div v-for="nestedFigure in figure.figures" ref="figure" class="backgroundFigures__figure" :style="`
                    width: ${nestedFigure.width || 'auto'};
                    height: ${nestedFigure.height || 'auto'};
                    top: ${nestedFigure.top || 'auto'};
                    left: ${nestedFigure.left || 'auto'};
                    right: ${nestedFigure.right || 'auto'};
                    bottom: ${nestedFigure.bottom || 'auto'};
                    transform: translate(${nestedFigure.x || 0}, ${nestedFigure.x || 0}) rotate(${nestedFigure.rotation}deg);
                `"></div>
            </div>
            <div v-else ref="figure" class="backgroundFigures__figure" :style="`
                width: ${figure.width || 'auto'};
                height: ${figure.height || 'auto'};
                top: ${figure.top || 'auto'};
                left: ${figure.left || 'auto'};
                right: ${figure.right || 'auto'};
                bottom: ${figure.bottom || 'auto'};
                transform: translate(${figure.x || 0}, ${figure.x || 0}) rotate(${figure.rotation}deg);
            `"></div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {TweenLite, Expo} from 'gsap';
    import {mapGetters} from 'vuex';
    @Component({
        components: {},
        computed: {
            ...mapGetters([
                'player/currentTimeFormated',
                'player/totalTimeFormated',
            ]),
        }
    })
    export default class BackgroundFigures extends Vue {
        private timerBBox: any = {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        get currentTimeFormated () {
            return this['player/currentTimeFormated'];
        }
        @Watch('currentTimeFormated')
        onTimeChange(): void {
            this.timerBBox = (this.$refs as any).timer.getBBox();
        }

        private figures: any[] = [
            {
                type: 'group',
                height: '250px',
                width: '330px',
                bottom: '-10%',
                right: '15%',
                rotation: -22,
                figures: [
                    {
                        height: '250px',
                        width: '150px',
                    },
                    {
                        height: '250px',
                        width: '150px',
                        top: '0',
                        right: '0',
                    },
                ]
            }
        ];

        private mounted() {
            this.bindListeners();
        }

        private onMouseMove(e) {
            const {figure, timerSVG} = this.$refs;
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
            const percentageX = e.clientX / viewWidth * 100;
            const percentageY = e.clientY / viewHeight * 100;
            // TODO: Maths for this
            TweenLite.to(figure, 1, {x: `${(percentageX - 50) / 5}%`, y: `${(percentageY - 50) / 5}%`});
            TweenLite.to(timerSVG, 1, {x: `${(percentageX - 50) / 15}%`, y: `${(percentageY - 50) / 15}%`});
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
