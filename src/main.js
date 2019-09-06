import Vue from "vue";
import axios from "axios";
import InfiniteScroll from "vue-infinite-scroll";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(InfiniteScroll);

let endpoints = {};
axios.get(process.env.VUE_APP_URL + "/streamers").then(response => {
  endpoints = Object.fromEntries(new Map(response.data.map(item => [item.name, item["storageEndpoint"]])));
  Vue.prototype.$endpoints = endpoints;
  Vue.prototype.$streamers = Object.keys(endpoints);

  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
