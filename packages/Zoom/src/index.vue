<template>
    <div v-loading="loading" class="custom-zoom-box" :class="{'is-up': up}" :style="{height: up ? '100%' : boxtHeight}">
        <div class="zoom-box-header">
            <h1>{{title}}</h1>
            <gs-tooltip
                v-if="titleTooltip.length > 0"
                placement="bottom"
                popper-class="zoom-box-tooltip">
                <i class="iconfont icon-shuomingtishi"></i>
                <template v-slot:template>
                    <p v-for="item in titleTooltip" :key="item">{{item}}</p>
                </template>
            </gs-tooltip>
            <span class="header-extra"><slot name="headerExtra"></slot></span>
        </div>
        <div class="zoom-box-body">
            <div v-if="$slots.toolbar" class="zoom-box-toolbar clearfix">
                <slot name="toolbar"></slot>
            </div>
            <div v-if="!isEmpty" class="zoom-box-feauter">
                <slot name="boxFeauter"></slot>
                <i class="iconfont icon-xiazaiExcel" @click="downloadExcel"></i>
                <i :class="['iconfont', up ? 'icon-suoxiaotubiao-' : 'icon-fangda1']" @click="handleUp"></i>
            </div>
            <slot name="extra"></slot>
            <gs-scrollbar wrap-class="zoom-box-content-wrap" :style="{height: up ? '85%' : _contentHeight}" :wrap-style="{height: 'calc(100% + 17px)'}">
                <div v-if="!isEmpty" class="zoom-box-content">
                    <slot></slot>
                </div>
                <div class="zoom-content-empty" v-else>
                    <tip v-if="showCommonTip" :option="tipConfig"></tip>
                    <p v-else v-for="item in showDataTip" :key="item">{{item}}</p>
                </div>
            </gs-scrollbar>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

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
        noDataTip: {
            type: [String, Array],
            default () {
                return ['暂无数据'];
            }
        },
        showCommonTip: {
            type: Boolean,
            default: false
        },
        tipConfig: {
            type: Object,
            default () {
                return {
                    title: '',
                    detail: ['暂无数据'],
                    button: []
                };
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
        },
        excelOption: {
            default () { return []; }
        },
        serviceModule: {
            type: String,
            default: ''
        }
    },
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
            return this.contentHeight ? this.formatValue(this.contentHeight) : this.height !== 'auto' ? 'calc(100% - 49px)' : '400px';
        },
        titleTooltip () {
            return this.tooltip instanceof Array ? this.tooltip : this.tooltip ? [this.tooltip] : [];
        },
        /**
         * 自定义的无数据的提示语
         */
        showDataTip () {
            return this.noDataTip instanceof Array ? this.noDataTip : [this.noDataTip];
        }
    },
    methods: {
        handleUp () {
            this.up = !this.up;
            this.$emit('zoom', this.up);
        },
        formatValue (value) {
            return typeof value === 'number' ? `${value}px` : value;
        },
        async downloadExcel () {
            try {
                await Vue.common.axiosDownload(`/${this.serviceModule}/chart`, this.excelOption);
            } catch (e) {
                (e.status !== -1) && this.$Message.error((e.data && e.data.Error) || '下载excel失败，请重试');
            }
        }
    }
};
</script>

<style lang="scss">
@import './customChartZoom';
</style>