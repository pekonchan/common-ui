<template>
    <label class="com-checkbox" :class="{'is-disabled': disabled}">
        <span class="com-checkbox__outlook" :class="{'is-checked': checked}">
        </span>
        <input class="com-checkbox__input" type="checkbox" v-model="checked" :disabled="disabled" @change="$emit('change', checked)" />
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'ComCheckbox',
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