
# scroll-div 自定义滚动容器

滚动容器组件，当需要展示滚动条是，实现与`mac os`浏览器上相类似的滚动条样式和效果，主要原因是`windows`系统上的浏览器原生滚动条样式比较丑陋

可用该组件替代类似`div`等容器使用，该组件的滚动条样式是类`mac os`风格。

## 特点

- 针对滚动条区域不占用内容本身空间，影响尺寸的浏览器滚动条，采用原生滚动条，组件最终也只会渲染成一个`div`标签。
    - 如`mac`系统上的绝大部分浏览器（暂时没遇到不是的），它的原生滚动条本身交互效果还是挺好且好看的，不需要自定义滚动条
    - 除上述`MAC`的情况外，由于方案的实现问题，对这类浏览器的滚动条不做自定义处理，如window系统上的浏览器，这种情况比较少见（暂时没遇到）。所以不为这种少数的情况做处理，增加方案复杂度。
    - 自定义滚动条会渲染成几个嵌套结构，增加DOM，所以能不用就不用了
- 针对非上述两种情况下的浏览器，一般为`window`系统的浏览器，如果是`webkit`内核的浏览器，组件就会利用`-webkit-scrollbar`等css方式自定义原生滚动条样式，最终渲染成一个`div`标签。——这个选择是用户可选的，可以不用这个效果。
- 除了上述情况，都会采用自定义滚动条方式，这样分情况来渲染不同的结果，可以最大程度上采用最简单的方式，来满足好看的滚动条样式。
- 组件是包含横向和垂直滚动条

简而言之，组件会采取“最优”的方案，在满足滚动条样式可观的情况下，采用渲染结构最简单，组件性能最好的方案。


## 代码演示

> 注意: 当你使用的过程中发现隐藏的原生滚动出现了，请检查你是否设置或正确设置了容器的宽高

### 默认情况
设置容器的宽高，请直接传值到props属性的`width`和`height`，以及你要设置`padding`。

可以直接传入`calc(100% - 10px)`这种字符串，支持数字类型和字符串。

`view-class`是为滚动容器添加类名，用于设置一些额外的样式，因为受到不同的自定义滚动条模式的影响，具体的滚动容器可能不一样。

> 注意view-class属性仅用来设置具体的滚动容器的一些样式，与滚动容器滚动无关的属性，直接请使用class。

不做滚动条显示模式设定的默认情况下，会根据您所在浏览器的特性而选择不同的方案
- macos 原生滚动条
- webkit内核使用css来美化原生滚动条
- 其他浏览器采用HTML元素模拟滚动条

::: demo
```html

<com-scroll-div width="400px" height="100px" padding="5px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</com-scroll-div>

<style>
    .yourclassname {
        margin: auto;
    }
</style>

```
:::

### 仿MacOS效果
默认情况下`useNative`值为`true`，表示开启智能选择模式，即上述的默认情况，原生能支持就用原生的意思。

这里设置`useNative="false"`，关闭智能选择，固定采用仿MacOS的效果，即window系统下的所有浏览器都会采用自定义滚动条模拟

::: demo
```html

<com-scroll-div height="100px" :use-native="false">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</com-scroll-div>

```
:::

### 常驻滚动条模式
Windows上的火狐IE等这些非webkit内核的浏览器上，会采用HTML元素模仿滚动条，默认是仿MacOS效果的滚动条，即只有滚动了才会出现。

如果你不想这样，可以开启常驻滚动条模式，只需要设置`awaysShowScroll="true"`

同样可以结合`useNative`来使用，来更加自由的定制所需模式

> 本示例最好在火狐或IE上体验

::: demo
```html

<com-scroll-div height="100px" :aways-show-scroll="true">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</com-scroll-div>

```
:::

### 自定义滚动条样式
组件本身已经自定义了相对大众美观一点的滚动条了，当然，你仍然有更好的自定义能力，可以通过`barStyle, size, offset`等参数进一步打造属于你的滚动条效果。

当然，这是针对用HTML元素模拟滚动条效果的情况下，才能生效的，即你得设置`useNative=false`

> 如果你仍然想要维持高性能的`:use-native="true"`智能选择模式下，在chrome这种webkit内核的浏览器上改变样式，你得自己在项目中写全局样式覆盖`-webkit-scrollbar`等样式。

::: demo
```html

<com-scroll-div
    height="100px"
    :use-native="false"
    :bar-style="{backgroundColor: 'pink', borderRadius: '6px'}">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</com-scroll-div>

```
:::

::: demo
```html

<com-scroll-div
    height="100px"
    :use-native="false"
    :bar-style="{backgroundColor: 'rgba(255, 192, 203, .5)'}"
    size="10px"
    offset="6px"
    :aways-show-scroll="true">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</com-scroll-div>

```
:::


### 支持全局设置
如果你的项目打算大量使用该组件，一个个设置一些一样的值，显然显得很累赘，本组件支持全局设置

```
import Vue from 'vue'
import ScrollDiv from 'vue-scroll-div'

Vue.use(ScrollDiv,{
  barStyle: {
    backgroundColor: 'pink', // 滚动条的颜色
  },
  size: 6, // 滚动条的大小
  offset: 2 // 滚动条距离边界的偏移量
})
```


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| height | 容器高度 | String, Number. 传入数字类型时，单位是`px` | — | — | no |
| width | 容器宽度 | String, Number. 传入数字类型时，单位是`px` | — | — | no |
| padding | 容器的内边距 | String | — | — | no |
| useNative | 针对滚动条区域占用内容本身空间的浏览器（如window系统上绝大多数浏览器），<br>如果浏览器是webkit内核，则可以用css样式改变原生滚动条样式。<br>如果该值设置为true，则启用css改变滚动条样式，否则，用自定义滚动条。建议开启该项，能改善性能和减少dom结构。 | Boolan | true/false | true | no |
| viewClass | 内容容器设置类名。除width,height,padding属性外，使用该值指定类名进行对**滚动容器**样式修改。 | String | — | — | no |
| optimize | 优化在Firefox或IE浏览器下，自定义滚动条容器里，padding-bottom不起效的问题,会多渲染了一个无用的元素，故新增了该属性，默认值是true，即仅针对Firefox或IE浏览器才这么处理. 但是有一种情况,如果Scroll-Div容器内有一个容器设定了高度,内容过多溢出,但是未设置overflow,这种情况,padding-bottom的修复效果可能会欠佳存在不足 | Boolean | — | true | no |
| scroll | 传递一个函数,用作为滚动容器绑定滚动事件监听,函数的第一个形参是表示触发事件的`event`对象 | Function | — | — | no |
| barStyle | 设置自定义滚动条的各种样式，传入css的各种属性组成的对象，值的形式跟在vue里的标签上使用:style一样。 | Object | — | — | no |
| size | 设置滚动条的大小，如传入8，则垂直滚动条宽度为8px，横向滚动条高度为8px。一般情况下，该属性值也会影响到滚动条的border-radius值，等同该值。如果用户有特别需求，可以另外设置border-radius样式进行覆盖 | String, Number | — | — | no |
| offset | 滚动条距离页面边界的偏移值,该值默认不设置。如传入2，则垂直滚动条距离页面右边边界2px，横向滚动条距离页面底部边界2px | String, Number | — | — | no |
| awaysShowScroll | 设置滚动条是否一直显示，不消失（除没得滚动的情况下），变成常驻的话，由于内容会发生改变，进而会影响滚动条的长度比例，目前暂时只能提供一个方法updateScrollBar暴露给使用者，使用者在内容发生变化或改变页面大小时需要主动调用这个方法以及时更改滚动条长度比例或是否展示 | Boolean | — | false | no |
| zIndex | 设置滚动条的css样式`z-index`，默认情况下会有组件自身计算的一个层级值，如果你觉得不合适，可以手动传这个值用以控制。 | Number | — | — | no |


### Methods

| 方法名 | 说明 | 参数 |
| ---- | -------------- | ------ |
| scrollTo | 可以指定滚动容器滚动到什么位置,接受两个入参 | yPosition：Number / String. 指定垂直滚动的位置,相当于设置scrollTop,当为String类型时,只有等于top,才起效,会滚动到顶部；<br/>xPosition: Number / String. 指定横向滚动的位置,相当于设置scrollLeft,当为String类型时,只有等于left,才起效,会滚动到最左边 |
| updateScrollBar | 当设置了awaysShowScroll: true，自定义滚动条常驻的场景下，使用者在内容发生变化或改变页面大小时需要主动调用这个方法以及时更改滚动条长度比例或是否展示。后续可优化这个如何监听变化机制。 | - |