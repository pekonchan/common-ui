
# Scroll-Nav 定位导航栏
----
此为`vue.js`版滚动导航组件，实现
- 滚动时，根据滚动距离判断当前内容所属哪个导航
- 点击导航，页面滚动到内容对应位置
- 可控制导航栏是否吸附固定，如吸顶效果，即滚动一定距离后，导航栏固定起来，不会被滚动出可视区域
- 可用在页面任何位置上，不一定是顶部导航这种简单应用哦，可以复杂型应用
- 在浏览器支持下，可以采用`position: sticky`方式实现固定

具体深度解释该组件的一个开发思路，可看此文章[滚动导航+吸顶合并方案（含stikcy详解）](https://juejin.im/post/5e66152be51d4527235b7067)

### 基本用法
<Scroll-Nav
    ref="scrollNav"
    :menu="[
        { label: '导航1', checked: true },
        { label: '导航2' },
        { label: '导航3' }
    ]"
    :height="52"
    relativeName="html">
    <div>导航1内容</div>
    <div>导航2内容</div>
    <div>导航3内容</div>
</Scroll-Nav>

::: demo
```html

<Scroll-Nav
    ref="scrollNav"
    :menu="[
        { label: '导航1', checked: true },
        { label: '导航2' },
        { label: '导航3' }
    ]"
    :height="52"
    relativeName="html">
    <div>导航1内容</div>
    <div>导航2内容</div>
    <div>导航3内容</div>
</Scroll-Nav>

```
:::

