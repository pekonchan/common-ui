<template>
    <ul class="com-menu">
        <li v-for="menu in menuOption" :key="menu.path" class="com-menu-li" :class="{'is-active': menu.active}">
            <ul v-if="menu.children && menu.children.length > 0" class="com-sub-menu">
                <li v-for="subMenu in menu.children" :key="subMenu.path" class="com-menu-li" :class="{'is-active': subMenu.active}">
                    <a :href="urlMode + subMenu.path" @click="activePath(subMenu, menu.children)">{{subMenu.label}}</a>
                </li>
            </ul>
            <a v-else :href="urlMode + menu.path" @click="activePath(menu, menuOption)">{{menu.label}}</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        option: {
            type: Array,
            default () { return [] }
        },
        history: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            menuOption: []
        };
    },
    watch: {
        option: {
            handler () {
                this.menuOption = JSON.parse(JSON.stringify(this.option));
                this.menuOption.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(subItem => {
                            this.$set(subItem, 'active', false);
                        });
                    } else {
                        this.$set(item, 'active', false);
                    }
                });
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        urlMode () {
            return this.history ? '' : '#';
        }
    },
    methods: {
        activePath (menu, option) {
            option.forEach(item => {
                item.active = false;
            });
            menu.active = true;
        }
    }
}
</script>

<style lang="scss">
 @import 'index';
</style>