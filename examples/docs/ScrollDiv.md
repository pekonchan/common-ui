
# Scroll-Div 自定义滚动容器
----
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

想了解其中的自定义核心思路，可阅读我的文章[自定义滚动条全面方案详解](https://juejin.im/post/5e93d6736fb9a03c320bb36e)

## 基本用法
<style>
    .yourclassname {
        margin: auto;
    }
</style>
<div class="demo-block">
    <Scroll-Div width="400px" height="100px" view-class="yourclassname">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    </Scroll-Div>
</div>

::: demo
```html

<Scroll-Div width="400px" height="100px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</Scroll-Div>

<style>
    .yourclassname {
        margin: auto;
    }
</style>

```
:::

