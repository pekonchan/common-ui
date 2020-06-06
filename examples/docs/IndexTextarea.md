
# index-textarea 序号文本框

带有序列号提示的文本输入框

## 代码演示

<script>
    export default {
        data () {
            return {
                value1: ''
            }
        }
    }
</script>

### 基础应用
::: demo
```html
<com-index-textarea v-model="value1"></com-index-textarea>
```
```js
<script>
    export default {
        data () {
            return {
                value1: ''
            };
        }
    };
</script>
```
:::


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| value | 文本输入框的值 | String | — | — | no |
| height | 文本输入框组件的高度 | Number | — | 100 | no |