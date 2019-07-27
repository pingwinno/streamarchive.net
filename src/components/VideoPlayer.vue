<template>
  <video style="width: 100%; height: 100%" ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import("videojs-contrib-dash");
import("dashjs");

require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");

require("videojs-hotkeys");

window.videojs = videojs;
require("../assets/thumbnails/videojs.thumbnails.css");
require("../assets/thumbnails/videojs.thumbnails");
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    let vm = this;
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      this.httpSourceSelector();
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        alwaysCaptureHotkeys: true,
        enableModifiersForNumbers: false
      });
      vm.$http
        .get(`https://storage.streamarchive.net/db/streams/${vm.$route.params.streamer}/${vm.$route.params.uuid}`)
        .then(response => {
          this.thumbnails(
            response.body[0]["timeline_preview"],
            `https://storage.streamarchive.net/streams/${vm.$route.params.streamer}/${
              vm.$route.params.uuid
            }/timeline_preview/`
          );
        });
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style>
@import "../assets/vsg-skin.css";
</style>
