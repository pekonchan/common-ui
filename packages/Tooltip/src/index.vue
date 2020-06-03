<template>
    <span class="com-tooltip" @click.stop>
        <span ref="tooltipLink" class="com-tooltip__link"><slot></slot></span>
        <div ref="tooltipContent" :class="['com-tooltip__content', {'is-show': visible}]" role="tooltip">
            <p v-for="text in tooltipText" :key="text" class="com-tooltip__text">{{text}}</p>
            <div class="com-tooltip__arrow" data-popper-arrow></div>
        </div>
    </span>
</template>

<script>
import { createPopper } from '@popperjs/core';
import util from '~/util';

export default {
    name: 'ComTooltip',
    props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        trigger: {
            type: String,
            default: 'hover'
        },
        isHiddenOut: { // 是否点击空白处消失
            type: Boolean,
            default: true
        },
        canEnter: { // trigger：hover时鼠标能否进入popper内容区
            type: Boolean,
            default: false
        },
        content: {
            type: [String, Array],
            default: ''
        }
    },
    data () {
        return {
            tooltipLink: null,
            tooltip: null,
            popperInstance: null,
            visible: false,
            hideimer: null
        };
    },
    computed: {
        showEvents () {
            return this.trigger === 'hover' ? ['mouseenter'] : ['click'];
        },
        hideEvents () {
            return this.trigger === 'hover' ? ['mouseleave'] : [];
        },
        tooltipText () {
            return util.transPropArray(this.content);
        }
    },
    methods: {
        /**
         * 显示popper时
         */
        show () {
            // 点击com-tooltip__link元素，可以实现类似toggle功能，打开了再点一下就关闭了
            if (this.visible && this.trigger === 'click') {
                this.hide();
                return;
            }
            this.visible = true;
            this.$emit('change', true);
            this.create();
        },
        /**
         * 隐藏popper时，有个延迟，为了能够在trigger：hover时，鼠标能移入popper内容区
         * @param {Boolean} isValueChange - 是否是代码改变value值触发的隐藏
         */
        hidePopper () {
            this.trigger === 'hover' && this.canEnter ? this.hideimer = setTimeout(() => {
                this.hide();
            }, 300) : this.hide();
        },
        /**
         * trigger:hover时，移开popper内容就消失popper
         */
        hide () {
            this.destroy();
            this.visible = false;
            this.$emit('change', false);
        },
        /**
         * trigger:hover时，移入popper内容区，不消失popper，直到移出内容区
         */
        hoverPopperContent () {
            this.hideimer && clearTimeout(this.hideimer);
            this.visible = true;
        },
        create () {
            this.popperInstance = createPopper(this.tooltipLink, this.tooltip, {
                placement: this.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10]
                        }
                    }
                ]
            });
        },
        destroy () {
            if (this.popperInstance) {
                this.popperInstance.destroy();
                this.popperInstance = null;
            }
        }
    },
    mounted () {
        this.tooltipLink = this.$refs.tooltipLink;
        this.tooltip = this.$refs.tooltipContent;
        this.showEvents.forEach(event => {
            this.tooltipLink.addEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.tooltipLink.addEventListener(event, this.hidePopper);
        });
        if (this.trigger === 'hover') {
            this.tooltip.addEventListener('mouseenter', this.hoverPopperContent);
            this.tooltip.addEventListener('mouseleave', this.hide);
        }
        if (this.trigger === 'click' && this.isHiddenOut) {
            document.body.addEventListener('click', this.hidePopper);
        }
    },
    destroyed () {
        this.showEvents.forEach(event => {
            this.tooltipLink.removeEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.tooltipLink.removeEventListener(event, this.hidePopper);
        });
        if (this.trigger === 'hover') {
            this.tooltip.removeEventListener('mouseenter', this.hoverPopperContent);
            this.tooltip.removeEventListener('mouseleave', this.hide);
        }
        if (this.trigger === 'click' && this.isHiddenOut) {
            document.body.removeEventListener('click', this.hidePopper);
        }
    }
};
</script>

<style lang="scss">
@import 'index';
</style>