
# loading 加载中

是一个指令。指令值为Boolean类型，用来控制是否显示loading。

## 代码演示

<script>
    export default {
        data () {
            return {
                loading1: false,
                height: '100px'
            }
        },
        mounted () {
            setTimeout(() => {
                this.loading1 = true;
                this.height = '200px';
            }, 3000);
        }
    }
</script>

### 基础应用
::: demo
```html

<div style="border: 1px solid #ccc;" v-loading="true">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate asperiores tempora qui repellat iste, corrupti fugiat, voluptatem voluptatum suscipit odio inventore? Inventore recusandae deleniti quasi molestias amet laborum reprehenderit perspiciatis!
</div>

```
:::

### 可跟随内容大小自动调节
可以改变文字大小，头像大小，设置文本头像的背景颜色以及显示文本头像的前几个字符
::: demo
```html
<div class="loading-demo" :style="{height: height}" v-loading="loading1"></div>

<style>
    .loading-demo {
        width: 100px;
        border: 1px solid #ccc
    }
</style>
```
```js
<script>
    export default {
        data () {
            return {
                loading1: false,
                height: '100px'
            }
        },
        mounted () {
            setTimeout(() => {
                this.height = '200px';
            }, 3000);
        }
    }
</script>  
```
:::