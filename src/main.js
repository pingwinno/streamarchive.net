import Vue from "vue";
import VueResource from "vue-resource";
import InfiniteScroll from "vue-infinite-scroll";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(InfiniteScroll);

let endpoints = {};
new Vue().$http.get(`${process.env.VUE_APP_URL}/streamers`).then(response => {
  endpoints = response.body.reduce(function(result, item) {
    result[item["streamerName"]] = item["storageEndpoint"];
    return result;
  }, {});
  Vue.prototype.$endpoints = endpoints;
  Vue.prototype.$streamers = Object.keys(endpoints);

  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
