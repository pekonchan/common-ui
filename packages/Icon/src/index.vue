<template>
    <i :class="`com-icon-${name}`"></i>
</template>

<script>
export default {
    name: 'ComIcon',
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
 @import 'index';
</style>