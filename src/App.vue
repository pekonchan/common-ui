<template>
  <div id="app">
    <Section width="400px" height="100px" style="background: pink; color: #fff;">
      <div v-for="(item, index) in navs" :key="index">{{item.label}}</div>
    </Section>
  </div>
</template>

<script>
// import ScrollNav from '../packages/ScrollNav';
import Section from '../packages/Section';

export default {
  name: 'App',
  components: {
    Section
  },
  data () {
    return {
      navs: [
        {
          label: '导航1',
          value: '.content1'
        },
        {
          label: '导航2',
          value: '.content2'
        },
        {
          label: '导航3',
          value: '.content3'
        },
        {
          label: '导航2',
          value: '.content2'
        },
        {
          label: '导航3',
          value: '.content3'
        },
        {
          label: '导航2',
          value: '.content2'
        },
        {
          label: '导航3',
          value: '.content3'
        },
        {
          label: '导航2',
          value: '.content2'
        },
        {
          label: '导航3',
          value: '.content3'
        }
      ]
    };
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding-top: 24px;
  }

  .com-section-view > div:first-child {
    width: 1000px;
  }

</style>