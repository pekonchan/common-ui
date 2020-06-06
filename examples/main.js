import Vue from 'vue'
import router from './router';
import 'normalize.css';
import './common/css/global.scss';
import './common/localComponents';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
