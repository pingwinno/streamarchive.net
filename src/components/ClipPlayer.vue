<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
window.videojs = videojs;
require("videojs-offset");
export default {
  name: "ClipsPlayer",
  data() {
    return {
      player: null,
      options: {
        autoplay: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [{ type: "application/x-mpegURL" }]
      }
    };
  },
  mounted() {
    this.baseUrl = this.$endpoints[this.$route.params.streamer];
    this.options.sources[0].src = `${this.baseUrl}/streams/${this.$route.params.streamer}/${this.$route.params.uuid}/index-dvr.m3u8`;
    this.player = videojs(this.$refs.videoPlayer, this.options, function() { this.offset({ start: 0, end: 120 }); });
  },
  beforeDestroy() { if (this.player) this.player.dispose(); }
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
