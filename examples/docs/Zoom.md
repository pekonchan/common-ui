
# zoom 放大组件

圆形头像

## 代码演示

### 基础应用
::: demo
```html

<com-zoom title="这是放大组件" tooltip="xxx">
    <p style="width: 300px;height: 400px;">ceshi</p>
</com-zoom>

```
:::

### 设置基本样式
可以改变文字大小，头像大小，设置文本头像的背景颜色以及显示文本头像的前几个字符
::: demo
```html

<com-avatar 
    content="头像我的头像" 
    font-size="24px" 
    size="100px" 
    background-color="#32accc" 
    :substr="3">
</com-avatar>

```
:::

### 设置图片头像
有设置图片，以图片头像优先，如果没有图片，则显示文本头像
::: demo
```html

<com-avatar src="//www.baidu.com/img/flexible/logo/pc/result.png"></com-avatar>

```
:::


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| content | 文本头像内容，头像没传图片src就显示文本头像 | String | — | — | no |
| fontSize | 文本大小 | String, Number. 传入数字类型时，单位是`px` | — | 12px | no |
| backgroundColor | 头像背景颜色 | String | — | #709ff7 | no |
| size | 头像大小 | String, Number. 传入数字类型时，单位是`px` | — | 15px | no |
| src | 头像图片地址 | String | — | — | no |
| substr | 截断content前几个字符 | Number | — | 2 | no |