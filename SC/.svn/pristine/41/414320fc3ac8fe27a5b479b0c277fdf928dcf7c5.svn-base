// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from '../../store/index.js'

//mdui https://www.mdui.org/docs
import MDUI from 'mdui'
Vue.prototype.mdui = MDUI;
import 'mdui/dist/css/mdui.css'


//reset css
import  '@/assets/css/reset.css'
//common css
// import  '@/assets/css/common.less'
Vue.config.productionTip = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
