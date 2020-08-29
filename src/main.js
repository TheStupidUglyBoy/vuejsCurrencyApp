import '@/assets/css/style.css'

import Vue from 'vue'
import store from './store.js'
import App from './App.vue'

import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)

Vue.config.productionTip = false



new Vue({


  render: h => h(App),
store,

}).$mount('#app')
