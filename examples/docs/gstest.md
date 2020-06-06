
# Input 输入框

## 定义
通过鼠标或键盘输入内容，属于表单域的基础组件。

## 何时使用
当需要输入文本或数字时；

当表单域中有需要填充各类信息时。


## 不推荐使用
当需要输入时间或日期时，建议使用DatePicker或TimePicker替代；

当需要输入待搜索的字段时，建议使用Search替代。


## 代码演示


### 输入框基础交互逻辑

::: demo
```html
<template>
  <div class="input-demo">
    <label>无提示文本</label>
    <input></input>
  </div>
  <div class="input-demo">
    <label>有提示文本</label>
    <input placeholder="请输入内容" width="240px"></input>
  </div>
</template>
```
:::



### Input props

|参数|说明|类型|可选值|默认值|
|---------- |-------------- |---------- |--------------------------------  |-------- |
|value|绑定值|String, Number|—|—|
|placeholder|占位符|String|—|—|
|width| 输入框宽度，使用`number`类型时单位为`px`，使用`string`类型需给上单位 | String, Number  |—|—|
|disabled|禁用|Boolean|—|false|
|auto-complete|原生属性，自动补全|String|on, off|off|
|preicon|输入框头部图标|String|—|—|
|icon|输入框尾部图标|String|—|—|
|on-preicon-click|点击输入框头部图标的钩子函数|Function|—|—|
|on-icon-click|点击输入框尾部图标的钩子函数|Function|—|—|
|validate-event|Form 表单中使用，是否作为 Form 表单的数据校验项|Boolean|—|true|
|password-visibility-toggle|是否显示切换密码图标| Boolean | — | false |
|show-word-limit|是否显示输入字符数限制，需要配合原生属性`maxlength`使用|Boolean|—|false|



###  Input events

|事件名称|说明|回调参数
|---------- |-------------- |---------- |--------------------------------  |-------- |
|click|点击 Input 内的图标时触发|(event: Event)|
|blur|在 Input 失去焦点时触发|(event: Event)|
|focus|在 Input 获得焦点时触发|(event: Event)|
|change|在 Input 值改变时触发|(value: String) | Number)|
|keyup|原生的 keyup 事件|event|
|keydown|原生的 keyup 事件|event|
|keypress|原生的 keyup 事件|event|


### InputNumber props

|参数|说明|类型|可选值|默认值|
|---------- |-------------- |---------- |--------------------------------  |-------- |
|value|绑定值|Number|—|—|
|placeholder|占位符|String|—|—|
|width| 数字输入框宽度，使用`number`类型时单位为`px`，使用`string`类型需给上单位 | String, Number  |—|—|
|disabled|禁用|Boolean|—|false|
|name|原生属性|String|—|—|
|readonly|原生属性，是否只读|Boolean|—|false|
|max|设置最大值|Number, String|—|—|
|min|设置最小值|Number, String|—|—|
|step|设置输入字段的合法数字间隔|Number, String|—|1|
|precision|控制数值精度（控制保留小数点位数）|Number|—|—|
|disabled|禁用|Boolean|—|false|
|auto-complete|原生属性，自动补全|String|on, off|off|
|validate-event|Form 表单中使用，是否作为 Form 表单的数据校验项|Boolean|—|true|

###  InputNumber events

|事件名称|说明|回调参数
|---------- |-------------- |---------- |--------------------------------  |-------- |
|click|点击 Input 内的图标时触发|(event: Event)|
|blur|在 Input 失去焦点时触发|(event: Event)|
|focus|在 Input 获得焦点时触发|(event: Event)|
|change|在 Input 值改变时触发|(value: String) | Number)|
|keyup|原生的 keyup 事件|event|
|keydown|原生的 keyup 事件|event|
|keypress|原生的 keyup 事件|event|


### Textarea props

|参数|说明|类型|可选值|默认值|
|---------- |-------------- |---------- |--------------------------------  |-------- |
|value|绑定值|String, Number|—|—|
|placeholder|占位符|String|—|—|
|width| 文本域宽度，使用`number`类型时单位为`px`，使用`string`类型需给上单位 | String, Number  |—|—|
|maxlength|最大输入长度|Number|—|—|
|minlength|最小输入长度|Number|—|—|
|disabled|禁用|Boolean|—|false|
|name|原生属性|String|—|—|
|readonly|原生属性，是否只读|Boolean|—|false|
|max|原生属性，设置最大值|—|—|—|
|min|原生属性，设置最小值|—|—|—|
|step|原生属性，设置输入字段的合法数字间隔|—|—|—
|autofocus|原生属性，自动获取焦点|Boolean|true, false|false
|form|原生属性|String|—|—|
|resize|原生属性|String|—|—|
|rows |输入框行数| Number  |—| 3 |
|autosize|  自适应内容高度|Boolean, Object: { minRows: 2, maxRows: 6 }|—|—|
|min-height|最小高度|Number、String|—|80|
|max-height|最大高度|Number、String|—|—|
|validate-event|Form 表单中使用，是否作为 Form 表单的数据校验项|Boolean|—|true|
|show-word-limit|是否显示输入字符数限制，需要配合原生属性`maxlength`使用|Boolean|—|false|


###  Textarea events

|事件名称|说明|回调参数
|---------- |-------------- |---------- |--------------------------------  |-------- |
|blur|在 Textarea 失去焦点时触发|(event: Event)|
|focus|在 Textarea 获得焦点时触发|(event: Event)|
|change|在 Textarea 值改变时触发|(value: String | Number)|
|keyup|原生的 keyup 事件|event|
|keydown|原生的 keyup 事件|event|
|keypress|原生的 keyup 事件|event|


### Input, InputNumber, Textarea 通用 api

|方法名|说明|参数|
|---------- |-------------- |---------- |--------------------------------  |-------- |
|focus|使输入框获取焦点|-|
|blur|使输入框失去焦点|-|
|select|选中输入框中的文字|-|
