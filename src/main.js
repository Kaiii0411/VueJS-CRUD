import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.prototype.$request = axios

new Vue({
  router,
  render: h => h(App),
  use: VueSweetalert2
}).$mount('#app')
