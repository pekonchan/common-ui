<template>
  <div id="app">
    <Scroll-Div width="400px" height="100px" padding="20px" view-class="myview">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!</p>
      <p>test测试</p>
      <p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>
    </Scroll-Div>
  </div>
</template>

<script>
import ScrollDiv from 'vue-scroll-div';

export default {
  name: 'App',
  components: {
    ScrollDiv
  },
  data () {
    return {
    };
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding-top: 24px;
    background-color: #f5f6fa;
  }
  .myview {
    background-color: #fff;
  }
</style>