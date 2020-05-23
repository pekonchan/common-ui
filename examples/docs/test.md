<style>
.myview {
    background-color: #fff;
}
</style>
<script>
    import ScrollDiv from '~/ScrollDiv';
 export default {
     components: { ScrollDiv },
    data () {
        return {
        contents: [
            {
            label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!'
            },
            {
            label: '导航2'
            },
            {
            label: '导航3'
            },
            {
            label: '导航2'
            },
            {
            label: '导航3'
            },
            {
            label: '导航2'
            },
            {
            label: '导航3'
            },
            {
            label: '导航2'
            },
            {
            label: '导航3'
            }
        ]
        };
  }
  }
</script>
# Alert 警告
----
用于页面中展示重要的提示信息。

### 基本用法
页面中的非浮层元素，不会自动消失。
<div class="demo-block">
  <Scroll-Div width="400px" height="100px" padding="20px" view-class="myview">
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>
</div>

::: demo
```html

<Scroll-Div width="400px" height="100px" padding="20px" view-class="myview">
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

```
:::

