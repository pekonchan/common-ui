<template>
    <span class="mine-popper" @click.stop>
        <span class="mine-popper-link"><slot name="reference"></slot></span>
        <div class="mine-popper-tooltip" role="tooltip">
            <slot></slot>
            <div v-if="arrow" class="mine-popper-arrow" data-popper-arrow></div>
        </div>
    </span>
</template>

<script>
import { createPopper } from '@popperjs/core';
export default {
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
        value: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            popperLink: null,
            tooltip: null,
            popperInstance: null,
            visible: this.value
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
    watch: {
        value (newValue) {
            this.visible = newValue;
            newValue ? this.show(true) : this.hide(true);
        }
    },
    methods: {
        /**
         * 显示popper时
         * @param {Boolean} isValueChange - 是否是代码改变value值触发的显示
         */
        show (isValueChange) {
            if (this.visible && !isValueChange) {
                this.hide();
                return;
            }
            this.tooltip.setAttribute('data-show', '');
            this.create();
            if (isValueChange) {
                this.visible = true;
                this.$emit('change', true);
            }
        },
        /**
         * 隐藏popper时
         * @param {Boolean} isValueChange - 是否是代码改变value值触发的隐藏
         */
        hide (isValueChange) {
            this.tooltip.removeAttribute('data-show');
            this.destroy();
            if (isValueChange) {
                this.visible = false;
                this.$emit('change', false);
            }
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
        this.popperLink = document.querySelector('.mine-popper-link');
        this.tooltip = document.querySelector('.mine-popper-tooltip');
        this.showEvents.forEach(event => {
            this.popperLink.addEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.popperLink.addEventListener(event, this.hide);
        });
        if (this.trigger === 'click' && this.isHiddenOut) {
            document.querySelector('body').addEventListener('click', this.hide);
        }
    },
    destroyed () {
        this.showEvents.forEach(event => {
            this.popperLink.removeEventListener(event, this.show);
        });
        this.hideEvents.forEach(event => {
            this.popperLink.removeEventListener(event, this.hide);
        });
        if (this.trigger === 'click' && this.isHiddenOut) {
            document.querySelector('body').removeEventListener('click', this.hide);
        }
    }
};
</script>

<style lang="scss">
@import 'index';
</style>