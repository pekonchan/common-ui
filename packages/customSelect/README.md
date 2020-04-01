## 简介
多选下拉选择器。分为单个下拉选择器和分组选择器。

## 用法
示例
```html
<custom-select :option="option" v-model="selectedData">
    <span slot="reference">自定义列</span>
</custom-select>
```
- 具名插槽`reference`为引起下拉选择器的触发器。
- `option`为下拉选项的配置信息
- 具有双向绑定的`value`，是个数组，每个元素都是由`option`配置项最后一层的选项的`value`值组成的数组

### 分组选择与直接下拉选择
组件接收`option`属性，根据`option`结构自动判断展示形式。

#### 直接下拉选择option
```js
option = [
    {
        label: '爬取日期',
        value: 'crawledDate'
        disabled: true
    },
    {
        label: '搜索量',
        value: 'searchAmount'
        disabled: false
    }
]
```
如果`disabled`不传，组件会默认赋值`false`

#### 分组选择option
```js
option = [
    {
        label: '爬取日期',
        value: 'crawledDate',
        disabled: true
        children: [
            {
                label: '今天',
                value: 'today',
                disabled: true
            }
        ]
    },
    {
        label: '搜索量',
        value: 'searchAmount'
        children: [
            {
                label: '10-100',
                value: '100'
            },
            {
                label: '100-500',
                value: '500'
            }
        ]
    }
]
```
可以通过`children`属性进行多重层级分组。

## 特点
根据传递的选项，自动判断采用单选择下拉框还是分组下拉框形式展示，且按需渲染代码，渲染出来代码没有多余的。

### 按需渲染
组件并不是直接根据`option`里所罗列的所有配置进行html渲染，不会一次性把所有配置都实现写好代码。而是根据“所见即所需”的理念，渲染用户当前所要用到的html

这样就避免当配置项过多，一次性加载大量html，造成的交互可能迟钝，缓慢等不友好现象。

### 思路
参考后端数据库交互形式，把传递进来的`option`数据复制一份作为副本，该副本即是所谓的“数据库”的数据，我们在组件上做的勾选操作，都是在这份数据上进行的。

因为副本是一个对象数组（数组元素为对象），即我们引用的是对象的指针，改变对象的属性`checked`是能直接关联到这个副本上的，即对这个副本做了更改。

而展示界面，实际上分为两类面板，一类是专门展示分组情况的面板，有多个分组，就有多少块分组面板，根据实际选中的分组依次找出其子孙分组，进而渲染出多少块分组面板；每次选中新的分组，就会重新计算并渲染子孙分组形成面板

另一类是结果面板，即展示最终的勾选项的面板，该面板只有一个，每次选择分组后都会展示该分组下的勾选项，即这个面板会不断刷新展示项。

上面就是所谓的“按需”，以最少的渲染html为目的，展示用户所需的数据。

由于所有的操作都是基于`option`副本进行的修改，所以每次切换分组后，选择展示的数据也是基于这个副本取出来的，是对对象的引用，意味着，会自动记录每次操作的结果，这样不会说切换分组后，之前在某些分组做的操作，都置空了。

上面的用法，就好比每次勾选后，告知后端修改数据库，然后每组的展示都读取这个数据。只是这个过程，完全是在前端进行，类比这种效果。

## 测试数据
单层下拉框
```js
[
    {
        label: '爬取日期',
        value: 'crawledDate'
    },
    {
        label: '爬取日期',
        value: 'crawledDate1'
    },
    {
        label: '爬取日期',
        value: 'crawledDate2'
    },
    {
        label: '爬取日期',
        value: 'crawledDate3'
    },
    {
        label: '爬取日期',
        value: 'crawledDate4'
    },
    {
        label: '爬取日期',
        value: 'crawledDate5'
    },
    {
        label: '爬取日期',
        value: 'crawledDate6'
    },
    {
        label: '爬取日期',
        value: 'crawledDate7'
    }
]
```

多层下拉框
```js
[
    {
        label: '爬取日期',
        value: 'crawledDate',
        disabled: true,
        children: [
            {
                label: '爬取日期-1',
                value: 'crawledDate-1',
                disabled: true
            }
        ]
    },
    {
        label: '页码',
        value: 'pageIndex',
        children: [
            {
                label: '页码-1',
                value: 'pageIndex-1',
                children: [
                    {
                        label: '页码-1-1',
                        value: 'pageIndex-1-1'
                    },
                    {
                        label: '页码-1-2',
                        value: 'pageIndex-1-2'
                    },
                    {
                        label: '页码-1-3',
                        value: 'pageIndex-1-3'
                    }
                ]
            },
            {
                label: '页码-2',
                value: 'pageIndex-2',
                children: []
            },
            {
                label: '页码-3',
                value: 'pageIndex-3'
            }
        ]
    },
    {
        label: '数据',
        value: 'data',
        children: [
            {
                label: '数据-1',
                value: 'data-1'
            }
        ]
    }
]
```

## TODO
- 提供滚动加载，远程加载配置项
- 提供点击分组触发事件告知给用户
- 提供popper显示和隐藏事件