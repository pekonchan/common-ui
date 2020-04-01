<template>
    <label class="custom-checkbox" :class="{'is-disabled': disabled}">
        <span class="custom-checkbox-outlook" :class="{'is-checked': checked}">
        </span>
        <input class="custom-checkbox-input" type="checkbox" v-model="checked" :disabled="disabled" @change="$emit('change', checked)" />
        <slot></slot>
    </label>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
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
            checked: this.value
        };
    },
    watch: {
        value (newValue) {
            this.checked = newValue;
        }
    }
};
</script>

<style lang="scss">
@import 'index';
</style>