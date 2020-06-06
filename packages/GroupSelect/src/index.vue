<template>
    <span class="com-group-select">
        <com-popper v-model="visible" trigger="click" :isHiddenOut="false" placement="bottom-end" :can-toggle="false" @change="hanldeVisibleChange">
            <template v-slot:reference>
                <slot name="reference"></slot>
            </template>
            <div class="com-group-select__popper" :style="{ width: popperWdith }">
                <div class="com-group-select__title" :class="{'is-group': isGroupSelect}">
                    <span v-if="!isGroupSelect" @click="hanldeSelectAll">{{isSelectedAll ? '取消全选' : '全选'}}</span>
                    <span>已选{{count}}项</span>
                </div>
                <div class="com-group-select__option">
                    <com-scroll-div
                        ref="levelScrollbar"
                        v-for="(item,index) in levelOption"
                        :key="index"
                        class="com-group-select__level">
                        <ul class="level__list">
                            <li
                                v-for="subItem in item"
                                :key="subItem.value"
                                :class="{'is-active': subItem.active}"
                                @click="selectGroup(subItem, item, index)">
                                {{subItem.label}}
                            </li>
                        </ul>
                    </com-scroll-div>
                    <checkbox-list ref="checkboxList" :option="checkboxList" :prop="propNew" :showCheckedALl="isGroupSelect"></checkbox-list>
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
import comScrollDiv from '~/ScrollDiv';

export default {
    name: 'ComGroupSelect',
    components: {comPopper, checkboxList, comScrollDiv},
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
            return this.width ? typeof this.width === 'number' ? `${this.width}px` : this.width : 'auto';
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
            handler () {
                this.initValueChecked();
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
        hanldeVisibleChange (value) {
            if (value) {
                this.scrollToTop(true);
            }
        },
        async scrollToTop (levelNeed) {
            await this.$nextTick();
            this.$refs.checkboxList.$el.scrollTop = 0;
            levelNeed && this.$refs.levelScrollbar && this.$refs.levelScrollbar.forEach(item => {
                item.$el.scrollTop = 0;
            });
        },
        initOption () {
            // 通过复制一份原option数据，在副本上做记录每个分组的勾选情况（因为是对象数组，通过指针记录着每个对象的状态）
            // 这么做的目的是，切换分组后，还会通过这个副本option记录着每个选项的勾选情况，因此返回分组就能回显之前勾选情况
            // 这样并不会污染父级的option数据
            this.copyOption = JSON.parse(JSON.stringify(this.option));
            this.levelOption = [];
            this.initValueChecked();
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
        initValueChecked (option = this.copyOption) {
            option.forEach(item => {
                if (!item.children || item.children.length === 0) {
                    this.$set(item, 'checked', this.value.includes(item[this.propNew.value]));
                    this.$set(item, 'disabled', item[this.propNew.disabled] || false);
                } else {
                    this.initValueChecked(item.children);
                }
            });
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
            this.scrollToTop();
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
            this.visible = false;
            this.initOption();
            this.$emit('change', this.result);
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