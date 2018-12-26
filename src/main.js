// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Web3 from './util/Web3'
import Vuex from 'vuex'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Web3)
Vue.use(Vuex)

function storeLocalStore (state) {
  window.localStorage.setItem('info', JSON.stringify(state))
}

const store = new Vuex.Store({
  state: {
    account: '',
    password: ''
  },
  mutations: {
    storeUsername (state, account) {
      state.account = account
      storeLocalStore(state)
    },
    storeSchedulename (state, password) {
      state.password = password
      storeLocalStore(state)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
