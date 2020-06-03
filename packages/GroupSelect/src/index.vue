<template>
    <span class="com-group-select">
        <com-popper v-model="visible" trigger="click" :isHiddenOut="false" placement="bottom-end">
            <template v-slot:reference>
                <slot name="reference"></slot>
            </template>
            <div class="com-group-select__popper" :style="{ width: popperWdith }">
                <div class="com-group-select__title" :class="{'is-group': isGroupSelect}">
                    <span v-if="!isGroupSelect" @click="hanldeSelectAll">{{isSelectedAll ? '取消全选' : '全选'}}</span>
                    <span>已选{{count}}项</span>
                </div>
                <div class="com-group-select__option">
                    <ul class="com-group-select__level" v-for="(item,index) in levelOption" :key="index">
                        <li
                            v-for="subItem in item"
                            :key="subItem.value"
                            :class="{'is-active': subItem.active}"
                            @click="selectGroup(subItem, item, index)">
                            {{subItem.label}}
                        </li>
                    </ul>
                    <checkbox-list :option="checkboxList" :prop="propNew" :showCheckedALl="isGroupSelect"></checkbox-list>
                </div>
                <div class="com-group-select__footer">
                    <span @click="confirm">确定</span>
                    <span @click="cancel">取消</span>
                </div>
            </div>
        </com-popper>
    </span>
</template>

<script>
import comPopper from '~/Popper';
import checkboxList from './checkboxList';
export default {
    name: 'ComGroupSelect',
    components: {comPopper, checkboxList},
    props: {
        option: {
            type: Array,
            default () { return []; }
        },
        width: {
            type: [String, Number],
            default: ''
        },
        value: {
            type: Array,
            default () { return []; }
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
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            visible: false,
            levelOption: [],
            checkboxList: [],
            copyOption: [],
            result: []
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
        popperWdith () {
            return this.width ? typeof this.width === 'number' ? `${this.width}px` : this.width : 'unset';
        },
        isSelectedAll () {
            const enabledLen = this.checkboxList.filter(item => !item.disabled).length;
            const len = this.checkboxList.length;
            return len === this.count && len - enabledLen !== len;
        },
        count () {
            return this.checkboxList.filter(item => item.checked).length;
        },
        isGroupSelect () {
            return this.levelOption.length > 0;
        }
    },
    watch: {
        value: {
            handler (newValue) {
                this.checkboxList.forEach(item => {
                    item.checked = newValue.includes([this.propNew.value]);
                });
            }
        },
        option: {
            handler () {
                this.initOption();
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        initOption () {
            // 通过复制一份原option数据，在副本上做记录每个分组的勾选情况（因为是对象数组，通过指针记录着每个对象的状态）
            // 这么做的目的是，切换分组后，还会通过这个副本option记录着每个选项的勾选情况，因此返回分组就能回显之前勾选情况
            // 这样并不会污染父级的option数据
            this.copyOption = JSON.parse(JSON.stringify(this.option));
            this.levelOption = [];
            this.createOption(this.copyOption);
        },
        createOption (option, optionIndex = 0) {
            if (!option || option.length === 0) {
                this.checkboxList = [];
                return;
            }
            const children = option[0].children;
            // 没有下一层分组时，生成勾选项列表
            if (!children || children.length === 0) {
                option.forEach(item => {
                    // 这里的item.checked为true时只有一种情况：勾选了某个分组下的选项，然后切换了，之前勾选的选项还是true的。所以返回之前的分组还是要显示之前的勾选情况。如果是false的情况，才从value中取是否已勾选的选项
                    this.$set(item, 'checked', item.checked || this.value.includes(item[this.propNew.value]));
                    this.$set(item, 'disabled', item[this.propNew.disabled] || false);
                });
                this.checkboxList = option;
            } else {
                // 通过splice形式来添加以及切换分组后修改
                this.levelOption.splice(optionIndex, 1, option.map((item, index) => {
                    return {
                        label: item[this.propNew.label],
                        value: item[this.propNew.value],
                        disabled: item[this.propNew.disabled] || false,
                        active: index === 0,
                        children: item.children
                    };
                }));
                return this.createOption(children, ++optionIndex); // 尾递归
            }
        },
        hanldeSelectAll () {
            const isSelectedAll = this.isSelectedAll;
            this.checkboxList.forEach(item => {
                item.disabled || (item.checked = !isSelectedAll);
            });
        },
        selectGroup (member, group, groupIndex) {
            group.forEach(item => {
                item.active = false;
            });
            member.active = true;
            this.levelOption.splice(groupIndex + 1); // 把改分组之后的分组都删掉，需要重新生成
            this.createOption(member.children, groupIndex + 1); // 每次切换分组，该分组之后的分组都要重新获取
        },
        createResult (option = this.copyOption) {
            option.forEach(item => {
                if (!item.children || item.children.length === 0) {
                    item.checked && this.result.push(item[this.propNew.value]);
                } else {
                    this.createResult(item.children);
                }
            });
        },
        confirm () {
            this.result = [];
            this.createResult();
            this.$emit('change', this.result);
            this.visible = false;
            this.initOption();
        },
        cancel () {
            this.visible = false;
            this.initOption();
        }
    }
};
</script>

<style lang="scss">
@import 'index';
</style>