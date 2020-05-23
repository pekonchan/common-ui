<template>
    <Popper v-model="visible" trigger="click" :isHiddenOut="false" :placement="placement">
        <template v-slot:reference>
            <slot name="reference"></slot>
        </template>
    </Popper>
</template>

<script>
import Popper from '~/customPopper';
export default {
    props: {
        content: {
            type: String,
            default: ''
        },
        trigger: {
            type: String,
            default: 'hover'
        },
        placement: {
            type: String,
            default: 'bottom'
        }
    },
    components: {
        Popper
    },
    data () {
        return {};
    }
}
</script>