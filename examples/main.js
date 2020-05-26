import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './common/global.scss';
import './common/localComponents';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
