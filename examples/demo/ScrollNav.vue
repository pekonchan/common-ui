<template>
  <div class="demo-body-assume">
    <div class="complex-demo-scrollnav">
      <div class="top-section"></div>
      <com-scroll-nav
        ref="scrollNav"
        :menu="navs"
        :height="52"
        :extraFixed="-24"
        relative-name="html">
        <div class="content-demo">导航1内容</div>
        <div class="content-demo">导航2内容</div>
        <div class="content-demo">导航3内容</div>
        <div class="content-demo">导航4内容</div>
      </com-scroll-nav>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      navs: [
        {
          label: '导航1',
          checked: true
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航4'
        }
      ]
    };
  }
}
</script>

<style lang="scss">
  .demo-body-assume {
    margin: 0;
    padding-top: 24px; // 故意设置，让组件传输偏差值进行计算
    background-color: #f5f6fa;
  }
  .complex-demo-scrollnav {
    position: relative; // 故意把导航和导航内容的`offsetParent`变成`#app`
  }
  %block {
    border-radius: 5px;
    box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.02);
    background: #ffffff;
  }
  .top-section {
    margin-bottom: 16px;
    height: 200px;
    @extend %block;
  }
  .content-demo {
    margin-top: 16px;
    height: 600px;
    @extend %block;
  }
</style>