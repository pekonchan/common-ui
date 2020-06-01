# checkbox 复选框

## 代码演示

<script>
    export default {
        data () {
            return {
                value1: false,
                value2: true
            }
        }
    }
</script>

### 基础应用
::: demo
```html
<com-checkbox v-model="value1"></com-checkbox>
```
```js
<script>
    export default {
        data () {
            return {
                value1: false
            }
        }
    }
</script>
```
:::

### 禁用复选框

::: demo
```html
<com-checkbox v-model="value2" disabled></com-checkbox>
```
```js
<script>
    export default {
        data () {
            return {
                value2: true
            }
        }
    }
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