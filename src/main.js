import Vue from 'vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

import moment from 'moment'

import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

// eslint-disable-next-line import/no-named-default
import { default as api } from './utils/api'
import { hasPerm } from './utils/hasPerm'

import '@/assets/fonts/iconfont.css'
import './permission'

Vue.use(ElementUI, { locale })

Vue.prototype.api = api
Vue.prototype.hasPerm = hasPerm
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
