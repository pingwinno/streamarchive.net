<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
window.videojs = videojs;
require("videojs-hotkeys");
require("../assets/js/thumbnails/videojs.thumbnails.css");
require("../assets/js/thumbnails/videojs.thumbnails");
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
        sources: [{ type: "application/x-mpegURL" }]
      }
    };
  },
  computed: {
    baseUrl() {
      return `${this.$endpoints[this.$route.params.streamer]}`;
    }
  },
  mounted() {
    let vm = this;
    this.options.sources[0].src = `${this.baseUrl}/streams/${this.$route.params.streamer}/${
      this.$route.params.uuid
    }/index-dvr.m3u8`;
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        alwaysCaptureHotkeys: true,
        enableModifiersForNumbers: false
      });

      let url = `/streams/${vm.$route.params.streamer}/${vm.$route.params.uuid}`;
      vm.$http.get(process.env.VUE_APP_URL + url).then(response => {
        vm.$emit("info", response.body);
        let thumbnails = {};
        for (let i = 0; i <= response.body.duration; i++) thumbnails[i * 10] = { src: `preview${i}.jpg` };
        this["thumbnails"](thumbnails, vm.baseUrl + url + "/timeline_preview/");
      });
    });
  },
  beforeDestroy() {
    if (this.player) this.player.dispose();
  }
};
</script>

<style>
@import "../assets/css/vsg-skin.css";
.video-js {
  width: 100%;
  height: 100%;
}

.video-js * {
  user-select: none;
  outline-style: none;
}
</style>
