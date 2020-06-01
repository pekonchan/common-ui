<template>
    <span
        class="com-avatar"
        :style="{
            'background-color': backgroundColor,
            'background-image': `url(${src})`,
            'font-size': actualFontSize,
            width: actualSize,
            height: actualSize,
            'line-height': actualSize
        }">
        {{src ? '' : text}}
    </span>
</template>

<script>
import util from '~/util';
export default {
    name: 'ComAvatar',
    props: {
        content: { // 头像没传图片src就显示文本头像，该值为文本
            type: String,
            default: ''
        },
        fontSize: { // 文本大小
            type: [String, Number],
            default: '12px'
        },
        backgroundColor: { // 头像背景颜色
            type: String,
            default: '#709ff7'
        },
        size: { // 头像大小
            type: [String, Number],
            default: '50px'
        },
        src: { // 头像图片地址
            type: String,
            default: ''
        },
        substr: { // 截断content前几个字符
            type: Number,
            default: 2
        }
    },
    computed: {
        text () {
            return this.content ? this.content.substr(0, this.substr) : '';
        },
        actualSize () {
            return util.transPropsValue(this.size);
        },
        actualFontSize () {
            console.log('actualFontSize -> transPropsValue', util);
            return util.transPropsValue(this.fontSize);
        }
    }
};
</script>
<style lang="scss">
    @import "index";
</style>
