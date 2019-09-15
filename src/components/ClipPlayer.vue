<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
window.videojs = videojs;
require("videojs-offset");
export default {
  props: {
    start: Number,
    end: Number
  },
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
    let streamer = this.$route.params.streamer;
    let uuid = this.$route.params.uuid;
    let baseUrl = this.$endpoints[streamer];
    let start = this.start;
    let end = this.end;

    let clipUrl = `${process.env.VUE_APP_CLIP_URL}/clips/${streamer}/${uuid}?start=${start}&end=${end}`;
    this.options.sources[0].src = `${baseUrl}/streams/${streamer}/${uuid}/index-dvr.m3u8`;

    this.player = videojs(this.$refs.videoPlayer, this.options, function() {
      this.offset({ start: start, end: end });

      let Button = videojs.getComponent("Button");
      let clip = videojs.extend(Button, {
        constructor() {
          Button.apply(this, arguments);
        },
        handleClick: () => window.open(clipUrl),
        buildCSSClass: () => "vjs-control vjs-button vjs-menu-button vjs-icon-share"
      });
      videojs.registerComponent("clip", clip);

      let controlBar = this.controlBar;
      controlBar.addChild("clip");
      let insertedCLip = controlBar.getChild("clip").el();
      let speedRate = controlBar.getChild("playbackRateMenuButton").el();
      controlBar.el().insertBefore(insertedCLip, speedRate);
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
