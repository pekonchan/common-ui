
# zoom 放大组件

适用场景：内容一般为图片，图表等，在数据多且小屏情况下，不利于方便观看，那么可以放大占满整个屏幕进行观看。

可以为组件添加工具箱，增强其功能，如增加下载图片，下载excel等功能。

## 代码演示

### 基础应用

<style>
    .com-zoom + .com-zoom {
        margin-top: 16px;
    }
</style>

tooltip不一定要求传，不传会隐藏掉。

::: demo
```html

<com-zoom title="这是放大组件" tooltip="xxx">
    <p style="width: 200px;height: 200px;background: pink">这是内容区，一般为图片，图表等，在数据多且小屏情况下，不利于方便观看，那么可以放大占满整个屏幕进行观看。</p>
</com-zoom>

<style>
    .com-zoom {
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #ccc;
    }
</style>

```
:::

### 设置容器高度
通过属性，我们可以设置两个放大前的高度

1. 放大组件的整体高度 - height
2. 组件内内容区的高度 - contentHeight

::: demo
```html

<com-zoom title="设置整体高度" height="200px" class="demo2-zoom">
    <p>这是内容区，一般为图片，图表等，在数据多且小屏情况下，不利于方便观看，那么可以放大占满整个屏幕进行观看。</p>
</com-zoom>


<com-zoom title="设置内容高度" content-height="200px" class="demo2-zoom">
    <p>这是内容区，一般为图片，图表等，在数据多且小屏情况下，不利于方便观看，那么可以放大占满整个屏幕进行观看。</p>
</com-zoom>

<style>
    .demo2-zoom .com-zoom__body {
        background: pink;
    }
</style>

```
:::

### 设置无数据等空内容提示
如果内容区没有数据，可以通过`isEmpty`告知，那么组件就会呈现无数据的提示，可以通过`emptyText`来设置自定义提示文本。

设置了提示无数据，就算里面slot里有内容，不也不会显示。

::: demo
```html

<com-zoom title="无数据提示" :is-empty="true">
    <p>就算有内容也不会显示出来</p>
</com-zoom>

<com-zoom 
    title="自定义提示" 
    :is-empty="true" 
    empty-text="这里没有数据啦~"
    height="200px">
</com-zoom>

```
:::

### 增加工具箱工具

::: demo
```html

<com-zoom 
    title="增加工具"
    height="200px">
    <i slot="boxFeauter">点击下载</i>
    <p>这是内容</p>
</com-zoom>

```
:::


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| title | 组件的标题 | String | — | — | yes |
| tooltip | 标题的提示文本 | String, Array. 传入数组时，一个元素占一行 | — | — | no |
| emptyText | 无数据的提示文本 | String | — | — | no |
| isEmpty | 是否无数据 | Boolean | true/false | false | no |
| height | 组件整体高度 | String, Number | — | auto | no |
| contentHeight | 组件内容区的高度 | String, Number | — | — | no |

### events
| 参数 | 说明 | 回调参数 |
| ---- | -------------- | ------ |
| zoom | 放大/缩小触发 | true：放大状态  false：还原 |