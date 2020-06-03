<template>
    <div class="main-view">
        <header class="main-view-header">
            logo
        </header>
        <com-scroll-div view-class="main-side">
            <Menu :option="menus" :active="$route.path"></Menu>
        </com-scroll-div>
        <com-scroll-div view-class="main-body">
            <router-view class="markdown-body"></router-view>
        </com-scroll-div>
    </div>
</template>

<script>
import Menu from '@/components/menu';
import 'highlight.js/styles/color-brewer.css';
import '@/common/css/github-markdown.css';
export default {
    components: { Menu },
    data () {
        return {
            menus: [
                {
                    label: '自定义滚动容器',
                    path: '/main/scroll-div'
                },
                {
                    label: '定位导航栏',
                    path: '/main/scroll-nav'
                },
                {
                    label: '头像',
                    path: '/main/avatar'
                },
                {
                    label: '复选框',
                    path: '/main/checkbox'
                },
                {
                    label: 'Popper浮窗',
                    path: '/main/popper'
                },
                {
                    label: 'Loading',
                    path: '/main/loading'
                },
                {
                    label: 'Tooltip',
                    path: '/main/tooltip'
                },
                {
                    label: '放大组件Zoom',
                    path: '/main/zoom'
                },
                {
                    label: '分组选择器',
                    path: '/main/group-select'
                }
            ]
        }
    },
    computed: {
    }
}
</script>

<style lang="scss">
    @import 'index';
</style>