// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../template2/router/index'

//mdui https://www.mdui.org/docs
import MDUI from 'mdui'
Vue.prototype.mdui = MDUI;
import 'mdui/dist/css/mdui.css'

//reset css
import  '@/assets/css/reset.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


