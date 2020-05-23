<template>
    <div v-loading="loading" class="com-zoom" :class="{'is-up': up}" :style="{height: up ? '100%' : boxtHeight}">
        <div class="com-zoom-header">
            <h1>{{title}}</h1>
            <Popper v-if="titleTooltip.length > 0" class="com-zoom-tooltip">
                <template v-slot:reference>
                    <i class="iconfont icon-shuomingtishi">?</i>
                </template>
                <p v-for="item in titleTooltip" :key="item">{{item}}</p>
            </Popper>
            <!-- <gs-tooltip
                v-if="titleTooltip.length > 0"
                placement="bottom"
                popper-class="zoom-box-tooltip">
                <i class="iconfont icon-shuomingtishi"></i>
                <template v-slot:template>
                    <p v-for="item in titleTooltip" :key="item">{{item}}</p>
                </template>
            </gs-tooltip> -->
        </div>
        <div class="com-zoom-body">
            <div v-if="!isEmpty" class="com-zoom-feature">
                <slot name="boxFeauter"></slot>
                <i :class="['iconfont', up ? 'icon-suoxiaotubiao-' : 'icon-fangda1']" @click="handleUp"></i>
            </div>
            <Scroll-Div class="com-zoom-scroll" :height="up ? '85%' : _contentHeight">
                <div v-if="!isEmpty" class="com-zoom-content">
                    <slot></slot>
                </div>
                <div class="com-zoom-empty" v-else>
                    <p v-for="item in showDataTip" :key="item">{{item}}</p>
                </div>
            </Scroll-Div>
        </div>
    </div>
</template>

<script>
import Loading from '~/Loading';
import Popper from '~/customPopper';
import ScrollDiv from '~/ScrollDiv';

export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
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
    directives: {
        Loading
    },
    components: { Popper, ScrollDiv },
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