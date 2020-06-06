<template>
    <com-scroll-div view-class="o-checkbox-list">
        <ul>
            <li v-if="showCheckedALl && hasData">
                <span class="o-checkbox-list__all-text" @click="hanldeSelectAll">{{isSelectedAll ? '取消全选' : '全选'}}</span>
            </li>
            <li
                v-for="item in option"
                :key="item[propNew.value]">
                <com-checkbox v-model="item.checked" :disabled="item[propNew.disabled]">{{item[propNew.label]}}</com-checkbox>
            </li>
            <li v-if="!hasData" class="o-checkbox-list__empty">{{this.emptyText}}</li>
        </ul>
    </com-scroll-div>
</template>

<script>
import comCheckbox from '~/Checkbox';
import comScrollDiv from '~/ScrollDiv';

export default {
    components: { comCheckbox, comScrollDiv },
    props: {
        option: {
            type: Array,
            default () { return []; }
        },
        showCheckedALl: {
            type: Boolean,
            default: true
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        prop: {
            type: Object,
            default () {
                return {
                    label: 'label',
                    value: 'value',
                    disabled: 'disabled'
                };
            }
        }
    },
    data () {
        return {
            data: []
        };
    },
    computed: {
        propNew () {
            return {
                label: this.prop.label || 'label',
                value: this.prop.value || 'value',
                disabled: this.prop.disabled || 'disabled'
            };
        },
        isSelectedAll () {
            const enabledLen = this.option.filter(item => !item[this.propNew.disabled]).length;
            const len = this.option.length;
            return len === this.option.filter(item => item.checked).length && len - enabledLen !== len;
        },
        hasData () {
            return this.option.length > 0;
        }
    },
    watch: {
        option: {
            handler (newValue) {
                newValue.forEach(item => {
                    item.checked = item.checked || false;
                    item[this.propNew.disabled] = item[this.propNew.disabled] || false;
                });
            },
            immediate: true
        }
    },
    methods: {
        hanldeSelectAll () {
            const isSelectedAll = this.isSelectedAll;
            this.option.forEach(item => {
                item[this.propNew.disabled] || (item.checked = !isSelectedAll);
            });
        }
    }
};
</script>

<style lang="scss">
@import 'checkboxList';
</style>