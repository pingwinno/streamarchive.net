import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const handleResponse = response => {
  let endpoints = {};
  endpoints = Object.fromEntries(new Map(response.data.map(item => [item.name, item["storageEndpoint"]])));
  endpoints = Object.fromEntries(
    Object.entries(endpoints)
      .filter(item => item[1] !== "https://idinahui.com")
      .map(([streamer, url]) => {
        const lastUrlSymbol = url.length - 1;
        const isEndWithSlash = url[lastUrlSymbol] === "/";
        if (isEndWithSlash) {
          return [streamer, url.slice(0, lastUrlSymbol)];
        }
        return [streamer, url];
      })
  );
  return endpoints;
};
const state = {
  enpoints: {}
};
const mutations = {
  setEndpoints(state, endpoints) {
    state.enpoints = endpoints;
  }
};
const actions = {
  fetchEndpoints(context) {
    axios.get(process.env.VUE_APP_URL + "/streamers").then(response => {
      let endpoints = handleResponse(response);
      console.log(endpoints);
      console.log(context.commit("setEndpoints", endpoints));
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
