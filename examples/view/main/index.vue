<template>
    <div class="main-view">
        <header class="main-view-header">
            logo
        </header>
        <Scroll-Div view-class="main-side">
            <Menu :option="menus"></Menu>
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
                }
            ]
        }
    }
}
</script>

<style lang="scss">
    @import 'index';
</style>