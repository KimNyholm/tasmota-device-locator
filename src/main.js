import Vue from 'vue'
import App from './App.vue'
import DeviceList from './components/DeviceList'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.component("DeviceList", DeviceList);

new Vue({
  el: '#app',
  render: h => h(App)
})
