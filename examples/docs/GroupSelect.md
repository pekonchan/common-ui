# group-select 分组选择器

虽然名义上是分组选择器，但是实际上，也能不分组显示。跟普通下拉选择器的区别是，提供确定/取消按钮，才能最终确定修改结果。

目前只有多选功能。

适用场景：

跟普通下拉选择器（即选即用）相比，这种更适合避免频繁更新对应所选项引发的渲染界面显示不友好或性能不好等问题，等用户选择好之后最终确定才发生更改渲染。

## 代码演示

<script>
    export default {
        data () {
            return {
                selectedData: [],
                option: [
                    {
                        label: '广东省',
                        value: 'guangdong',
                        children: [
                            {
                                label: '东莞市',
                                value: 'dongguan'
                            },
                            {
                                label: '广州市',
                                value: 'guangzhou'
                            }
                        ]
                    },
                    {
                        label: '湖北省',
                        value: 'hubei',
                        children: [
                            {
                                label: '武汉',
                                value: 'wuhan'
                            }
                        ]
                    }
                ]
            };
        }
    };

</script>

### 基础应用
::: demo
```html
<com-group-select :option="option" v-model="selectedData">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData: [],
                option: [
                    {
                        label: '广东省',
                        value: 'guangdong',
                        children: [
                            {
                                label: '东莞市',
                                value: 'dongguan'
                            },
                            {
                                label: '广州市',
                                value: 'guangzhou'
                            }
                        ]
                    },
                    {
                        label: '湖北省',
                        value: 'hubei',
                        children: [
                            {
                                label: '武汉',
                                value: 'wuhan'
                            }
                        ]
                    }
                ]
            };
        }
    };
    
</script>
```
:::

### 也可以用作一组选择器，即不分组使用

::: demo
```html
<com-group-select :option="option" v-model="selectedData">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData: [],
                option: [
                    {
                        label: '广东省',
                        value: 'guangdong'
                    },
                    {
                        label: '湖北省',
                        value: 'hubei'
                    }
                ]
            };
        }
    };
    
</script>
```
:::

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| value | 复选框的值，可用`v-model` | Boolean | true/false | false | yes |
| disabled | 是否禁用复选框 | Boolean | true/false | false | no |

### events
| 参数 | 说明 | 回调参数 |
| ---- | -------------- | ------ |
| change | 改变复选框值触发 | 新值 |