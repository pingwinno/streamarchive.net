import Vue from 'vue'
import axios from 'axios'
import './plugins/vuetify'
import './plugins/infiniteScroll'
import './assets/css/styles.scss'
import router from './plugins/router'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAnalytics, { id: process.env.VUE_APP_ANALYTICS_ID, router })

axios
  .get(process.env.VUE_APP_URL + '/streamers')
  .then(response => response.data)
  .then(data => {
    const endpoints = data.reduce(reduceEndpoints, {})
    const streamers = data.map(item => item.name)

    Vue.prototype.$endpoints = endpoints
    Vue.prototype.$streamers = streamers

    new Vue({ router, render: h => h(App) }).$mount('#app')
  })

function reduceEndpoints(acc, item) {
  acc[item.name] = item.storageEndpoint.replace(/[/\\]$/, '')
  return acc
}
