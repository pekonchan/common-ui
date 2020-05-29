<template>
    <div class="main-view">
        <header class="main-view-header">
            logo
        </header>
        <Scroll-Div view-class="main-side">
            <Menu :option="menus" :active="$route.path"></Menu>
        </Scroll-Div>
        <Scroll-Div view-class="main-body">
            <router-view></router-view>
        </Scroll-Div>
    </div>
</template>

<script>
import Menu from '@/components/menu';
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