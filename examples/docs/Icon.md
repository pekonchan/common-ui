
# icon 字体图标

圆形头像

## 代码演示

### 基础应用
::: demo
```html

<com-icon name="shrink"></com-icon>

```
:::

### 直接使用类名
::: demo
```html

<i class="com-icon-blow"></i>

```
:::

### 目前图标

<style>

.demo-icon [class^="com-icon"] {
  margin: 0 10px;
  font-size: 24px;
  vertical-align: middle;
}

ul.icon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-radius: 4px;
}
ul.icon-list li {
  width: 130px;
  padding: 10px 0;
  text-align: center;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  list-style: none;
}
ul.icon-list li + li {
  margin-top: 0;
}
.icon-list i {
  font-size: 24px;
}
.icon-list span {
  display: block;
}

.icon-box [class^="com-icon"] {
  font-size: 14px;
}

</style>

<script>
  export default {
    data() {
      return {
        icons: ['shrink', 'blow', 'circle-question']
      };
    }
  };
</script>

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <i :class="'com-icon-' + name"></i>
    <span>com-icon-{{name}}</span>
  </li>
</ul>


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| name | icon的名字 | String | — | — | yes |