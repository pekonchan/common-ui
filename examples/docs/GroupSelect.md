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
                selectedData1: [],
                option1: [
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
                            },
                            {
                                label: '佛山市',
                                value: 'foshan'
                            },
                            {
                                label: '清远市',
                                value: 'qingyuan'
                            },
                            {
                                label: '深圳市',
                                value: 'shenzhen'
                            },
                            {
                                label: '湛江市',
                                value: 'zhanjiang'
                            },
                            {
                                label: '惠州市',
                                value: 'huizhou'
                            },
                            {
                                label: '梅州市',
                                value: 'meizhou'
                            },
                            {
                                label: '茂名市',
                                value: 'maoming'
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
                            },
                            {
                                label: '选项1',
                                value: 'xuanxiang1'
                            },
                            {
                                label: '选项2',
                                value: 'xuanxiang2'
                            },
                            {
                                label: '选项3',
                                value: 'xuanxiang3'
                            },
                            {
                                label: '选项4',
                                value: 'xuanxiang4'
                            },
                            {
                                label: '选项5',
                                value: 'xuanxiang5'
                            },
                            {
                                label: '选项6',
                                value: 'xuanxiang6'
                            },
                            {
                                label: '选项7',
                                value: 'xuanxiang7'
                            },
                            {
                                label: '选项8',
                                value: 'xuanxiang8'
                            },
                            {
                                label: '选项9',
                                value: 'xuanxiang'
                            }
                        ]
                    }
                ],
                selectedData2: [],
                option2: [
                    {
                        label: '广东省',
                        value: 'guangdong'
                    },
                    {
                        label: '湖北省',
                        value: 'hubei'
                    }
                ],
                selectedData3: [],
                option3: [
                    {
                        name: '广东省',
                        type: 'guangdong',
                        canuse: true
                    },
                    {
                        name: '湖北省',
                        type: 'hubei'
                    }
                ],
                customProp: {
                    label: 'name',
                    value: 'type',
                    disabled: 'canuse'
                },
                selectedData4: ['guangdong', 'beijing'],
                option4: [
                    {
                        label: '广东省',
                        value: 'guangdong'
                    },
                    {
                        label: '湖北省',
                        value: 'hubei'
                    },
                    {
                        label: '北京市',
                        value: 'beijing',
                        disabled: true
                    }
                ]
            };
        }
    };

</script>

### 基础应用

实际上不仅仅只能一层分组，还可以多层分组，只要在对应项上添加`children`字段即可实现多层分组

::: demo
```html
<com-group-select :option="option1" v-model="selectedData1">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData1: [],
                option1: [
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
                            },
                            {
                                label: '佛山市',
                                value: 'foshan'
                            },
                            {
                                label: '清远市',
                                value: 'qingyuan'
                            },
                            {
                                label: '深圳市',
                                value: 'shenzhen'
                            },
                            {
                                label: '湛江市',
                                value: 'zhanjiang'
                            },
                            {
                                label: '惠州市',
                                value: 'huizhou'
                            },
                            {
                                label: '梅州市',
                                value: 'meizhou'
                            },
                            {
                                label: '茂名市',
                                value: 'maoming'
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
                            },
                            {
                                label: '选项1',
                                value: 'xuanxiang1'
                            },
                            {
                                label: '选项2',
                                value: 'xuanxiang2'
                            },
                            {
                                label: '选项3',
                                value: 'xuanxiang3'
                            },
                            {
                                label: '选项4',
                                value: 'xuanxiang4'
                            },
                            {
                                label: '选项5',
                                value: 'xuanxiang5'
                            },
                            {
                                label: '选项6',
                                value: 'xuanxiang6'
                            },
                            {
                                label: '选项7',
                                value: 'xuanxiang7'
                            },
                            {
                                label: '选项8',
                                value: 'xuanxiang8'
                            },
                            {
                                label: '选项9',
                                value: 'xuanxiang'
                            }
                        ]
                    }
                ],
                selectedData2: [],
                option2: [
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

### 也可以用作一组选择器，即不分组使用

::: demo
```html
<com-group-select :option="option2" v-model="selectedData2">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData2: [],
                option2: [
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

### 自定义配置项名称

多层分组同样也是这么使用

::: demo
```html
<com-group-select 
    :option="option3" 
    v-model="selectedData3" 
    :prop="customProp">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData3: [],
                option3: [
                    {
                        name: '广东省',
                        type: 'guangdong',
                        canuse: true
                    },
                    {
                        name: '湖北省',
                        type: 'hubei'
                    }
                ],
                customProp: {
                    label: 'name',
                    value: 'type',
                    disabled: 'canuse'
                }
            };
        }
    };
    
</script>
```
:::

### 默认选择

可以直接通过value值来控制选中的项。

disabled字段为禁用。

::: demo
```html
<com-group-select :option="option4" v-model="selectedData4">
    <span slot="reference">地域选择</span>
</com-group-select>
```
```js
<script>
    export default {
        data () {
            return {
                selectedData4: ['guangdong', 'beijing'],
                option4: [
                    {
                        label: '广东省',
                        value: 'guangdong'
                    },
                    {
                        label: '湖北省',
                        value: 'hubei'
                    },
                    {
                        label: '北京市',
                        value: 'beijing',
                        disabled: true
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
| value | 选择的值，可用`v-model` | Array | — | — | no |
| option | 选项配置，选项设置默认是`{label: '', value: null, disabled: false}`的格式 | Array | — | — | yes |
| prop | 改写选项配置的三个默认字段名 | Object | — | — | no |
| width | 选择器的宽度 | String, Number。 传入数字类型时，单位是`px` | — | — | no |

### events
| 参数 | 说明 | 回调参数 |
| ---- | -------------- | ------ |
| change | 改变选择值 | 新值 |