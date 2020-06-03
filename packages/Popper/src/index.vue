<template>
    <span class="com-popper" @click.stop>
        <span ref="popperLink" class="com-popper__link"><slot name="reference"></slot></span>
        <div ref="popperContent" :class="['com-popper__tooltip', {'is-show': visible}]" role="tooltip">
            <slot></slot>
            <div v-if="arrow" class="com-popper__arrow" data-popper-arrow></div>
        </div>
    </span>
</template>

<script>
import { createPopper } from '@popperjs/core';
export default {
    name: 'ComPopper',
    props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        arrow: {
            type: Boolean,
            default: false
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
        }
    },
    data () {
        return {
            popperLink: null,
            tooltip: null,
            popperInstance: null,
            visible: false,
            hideTimer: null
        };
    },
    computed: {
        showEvents () {
            return this.trigger === 'hover' ? ['mouseenter'] : ['click'];
        },
        hideEvents () {
            return this.trigger === 'hover' ? ['mouseleave'] : [];
        }
    },
    methods: {
        /**
         * 显示popper时
         */
        show () {
            // 点击com-popper__link元素，可以实现类似toggle功能，打开了再点一下就关闭了
            if (this.visible && this.trigger === 'click') {
                this.hide();
                return;
            }
            // this.tooltip.setAttribute('data-show', '');
            this.visible = true;
            this.$emit('change', true);
            this.create();
        },
        /**
         * 隐藏popper时，有个延迟，为了能够在trigger：hover时，鼠标能移入popper内容区
         * @param {Boolean} isValueChange - 是否是代码改变value值触发的隐藏
         */
        hidePopper () {
            // this.tooltip.removeAttribute('data-show');
            this.trigger === 'hover' && this.canEnter ? this.hideTimer = setTimeout(() => {
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
         * rigger:hover时，移入popper内容区，不消失popper，直到移出内容区
         */
        hoverPopperContent () {
            this.hideTimer && clearTimeout(this.hideTimer);
            this.visible = true;
        },
        create () {
            this.popperInstance = createPopper(this.popperLink, this.tooltip, {
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
        this.popperLink = this.$refs.popperLink;
        this.tooltip = this.$refs.popperContent;
        this.showEvents.forEach(event => {
            this.popperLink.addEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.popperLink.addEventListener(event, this.hidePopper);
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
            this.popperLink.removeEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.popperLink.removeEventListener(event, this.hidePopper);
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