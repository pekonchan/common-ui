# tooltip 文本提示
相当于一个方便快捷的popper，用来简单提示文本信息

## 代码演示

<style>
    .com-tooltip + .com-tooltip {
        margin-left: 16px;
    }

    button {
        cursor: pointer;
    }
</style>

### 基础应用
::: demo
```html
<com-tooltip content="这是浮窗的内容">
    <button>悬浮显示</button>
</com-tooltip>
```
:::

### 选择触发tooltip方式
设置`canEnter`可控制鼠标能否进入浮窗内容区，仅`trigger: hover`时有效。

::: demo
```html
<com-tooltip content="这是浮窗的内容" trigger="hover" :can-enter="true">
    <button>悬浮显示</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" trigger="click">
    <button>点击显示</button>
</com-tooltip>
```
:::

### 不同方向
::: demo
```html
<com-tooltip content="这是浮窗的内容" placement="top">
    <button>top</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="bottom">
    <button>bottom</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="left">
    <button>left</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="right">
    <button>right</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="right-end">
    <button>right-end</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="top-start">
    <button>top-start</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="bottom-end">
    <button>bottom-end</button>
</com-tooltip>

<com-tooltip content="这是浮窗的内容" placement="left-start">
    <button>left-start</button>
</com-tooltip>
```
:::

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| content | 提示内容 | String | — | — | yes |
| placement | 浮窗的位置 | String | auto, auto-start, auto-end, top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left,  left-start, left-end | bottom | no |
| trigger | 触发浮窗的事件 | String | hover/click | hover | no |
| isHiddenOut | 是否点击空白处消失 | Boolean | true/false | true | no |
| canEnter | trigger：hover时鼠标能否进入popper内容区 | Boolean | true/false | false | no |

### events
| 参数 | 说明 | 回调参数 |
| ---- | -------------- | ------ |
| change | 改变复选框值触发 | 新值 |