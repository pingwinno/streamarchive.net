import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Main from "./views/Main.vue";
import Video from "./views/Video.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/:streamer",
      name: "main",
      component: Main,
      params: true
    },
    {
      path: "/:streamer/video/:uuid",
      name: "video",
      component: Video,
      params: true
    }
  ]
});
