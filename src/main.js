import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import './css/global.less'
// import './css/icon/css/all.min.css'
import './css/icon/less/fontawesome.less'
import './css/icon/less/solid.less'
//npm install --save @fortawesome/fontawesome-free

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
