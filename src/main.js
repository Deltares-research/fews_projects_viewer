import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vue2MapboxGL from 'vue2mapbox-gl'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(Vue2MapboxGL)
Vue.use(VueMaterial)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
