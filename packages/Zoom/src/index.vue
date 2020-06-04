<template>
    <div class="com-zoom" :class="{'is-up': up}" :style="{height: up ? '100%' : boxtHeight}">
        <div class="com-zoom__header">
            <h1>{{title}}</h1>
            <com-tooltip v-if="titleTooltip.length > 0" :content="titleTooltip" class="com-zoom__tooltip" popper-class="com-zoom__tooltip-popper">
                <com-icon name="circle-question"></com-icon>
            </com-tooltip>
            <div v-if="!isEmpty" class="com-zoom__feature">
                <slot name="boxFeauter"></slot>
                <com-icon :name="up ? 'shrink' : 'blow'" @click.native="handleUp"></com-icon>
            </div>
        </div>
        <div class="com-zoom__body">
            <com-scroll-div view-class="com-zoom__scroll" :height="up ? '85%' : _contentHeight">
                <div v-if="!isEmpty" class="com-zoom__content">
                    <slot></slot>
                </div>
                <div class="com-zoom__empty" v-else>
                    <p v-for="item in showDataTip" :key="item">{{item}}</p>
                </div>
            </com-scroll-div>
        </div>
    </div>
</template>

<script>
import ComTooltip from '~/Tooltip';
import ComScrollDiv from '~/ScrollDiv';
import ComIcon from '~/Icon';

export default {
    name: 'ComZoom',
    props: {
        title: {
            type: String,
            default: ''
        },
        tooltip: {
            type: [String, Array],
            default: ''
        },
        emptyText: {
            type: [String, Array],
            default () {
                return ['暂无数据'];
            }
        },
        isEmpty: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number],
            default: 'auto'
        },
        contentHeight: {
            type: [String, Number],
            default: 0
        }
    },
    components: { ComTooltip, ComScrollDiv, ComIcon },
    data () {
        return {
            up: false
        };
    },
    computed: {
        boxtHeight () {
            return this.formatValue(this.height);
        },
        _contentHeight () {
            return this.contentHeight ? this.formatValue(this.contentHeight) : this.height !== 'auto' ? 'calc(100% - 49px)' : 'auto';
        },
        titleTooltip () {
            return this.tooltip instanceof Array ? this.tooltip : this.tooltip ? [this.tooltip] : [];
        },
        /**
         * 自定义的无数据的提示语
         */
        showDataTip () {
            return this.emptyText instanceof Array ? this.emptyText : [this.emptyText];
        }
    },
    methods: {
        handleUp () {
            this.up = !this.up;
            this.$emit('zoom', this.up);
        },
        formatValue (value) {
            return typeof value === 'number' ? `${value}px` : value;
        }
    }
};
</script>

<style lang="scss">
@import 'index';
</style>