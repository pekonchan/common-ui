import Vue from 'vue'
import App from './App.vue'
import router from './router';

import DemoBlock from './demoBlock'
Vue.component('demo-block', DemoBlock)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
