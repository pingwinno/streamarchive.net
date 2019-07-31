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
  data() {
    return {
      player: null,
      options: {
        autoplay: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
        sources: [
          {
            src: `https://storage.streamarchive.net/streams/${this.$route.params.streamer}/${
              this.$route.params.uuid
            }/index-dvr.m3u8`,
            type: "application/x-mpegURL"
          }
        ]
      }
    };
  },
  mounted() {
    let vm = this;
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        alwaysCaptureHotkeys: true,
        enableModifiersForNumbers: false
      });

      let url = `https://storage.streamarchive.net/db/streams/${vm.$route.params.streamer}/${vm.$route.params.uuid}`;
      let url2 = `https://storage.streamarchive.net/streams/${vm.$route.params.streamer}/${
        vm.$route.params.uuid
      }/timeline_preview/`;
      vm.$http.get(url).then(response => {
        this["thumbnails"](response.body[0]["timeline_preview"], url2);
      });

      this.httpSourceSelector();
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
