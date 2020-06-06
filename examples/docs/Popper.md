# popper 浮窗

## 代码演示

<script>
    export default {
        data () {
            return {
                value1: true
            };
        },
        methods: {
            handleChange (value) {
                this.$refs.demo3.innerText = value;
            }
        }
    }
</script>

### 基础应用
::: demo
```html
<com-popper>
    <template v-slot:reference>悬浮显示浮窗</template>
    这是浮窗的内容
</com-popper>
```
:::

### 选择触发popper方式
设置`arrow`属性控制是否显示箭头， 设置`canEnter`可控制鼠标能否进入浮窗内容区，仅`trigger: hover`时有效。

<style>
    .com-popper + .com-popper {
        margin-left: 16px;
    }
</style>

::: demo
```html
<com-popper trigger="hover" :can-enter="true">
    <template v-slot:reference>悬浮显示浮窗</template>
    <p>这是浮窗的内容</p>
</com-popper>

<com-popper trigger="click" :arrow="true">
    <template v-slot:reference>点击显示浮窗</template>
    这是浮窗的内容
</com-popper>
```
:::

### 代码控制浮窗状态
通过传递`value`值，能初始化或后续改变浮窗的显示/隐藏状态。 该值会跟trigger操作同步状态。
::: demo
```html
<com-popper v-model="value1" trigger="click">
    <template v-slot:reference>点击显示浮窗</template>
    这是浮窗的内容
</com-popper>
```
```js
<script>
    export default {
        data () {
            return {
                value1: true
            };
        }
    }
</script>
```
:::

### 通过change获取popper状态

::: demo
```html
<com-popper trigger="hover" @change="handleChange">
    <template v-slot:reference>悬浮显示浮窗</template>
    这是浮窗的内容
</com-popper>

<span ref="demo3" style="margin-left: 100px;"></span>
```
```js
<script>
    export default {
        methods: {
            handleChange (value) {
                this.$refs.demo3.innerText = value;
            }
        }
    };
</script>
```
:::

### 不同方向
::: demo
```html
<com-popper placement="top">
    <template v-slot:reference><button>向上</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="bottom">
    <template v-slot:reference><button>向下</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="left">
    <template v-slot:reference><button>向左</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="right">
    <template v-slot:reference><button>向右</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="right-end">
    <template v-slot:reference><button>right-end</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="top-start">
    <template v-slot:reference><button>top-start</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="bottom-end">
    <template v-slot:reference><button>bottom-end</button></template>
    这是浮窗的内容
</com-popper>

<com-popper placement="left-start">
    <template v-slot:reference><button>left-start</button></template>
    这是浮窗的内容
</com-popper>
```
:::

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| value | 浮窗的状态，true代表打开状态，false代表收起状态，可用v-model | Boolean | true/false | — | no |
| placement | 浮窗的位置 | String | auto, auto-start, auto-end, top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left,  left-start, left-end | bottom | no |
| arrow | 是否显示箭头 | Boolean | true/false | false | no |
| trigger | 触发浮窗的事件 | String | hover/click | hover | no |
| isHiddenOut | 是否点击空白处消失 | Boolean | true/false | true | no |
| canEnter | trigger：hover时鼠标能否进入popper内容区 | Boolean | true/false | false | no |
| canToggle | trigger：click，鼠标点击触发器时，能否实现开关切换效果，即打开了的popper，再点击一次触发器，是否会收起popper | Boolean | true/false | true | no |

### events
| 参数 | 说明 | 回调参数 |
| ---- | -------------- | ------ |
| change | 改变复选框值触发 | 新值 |