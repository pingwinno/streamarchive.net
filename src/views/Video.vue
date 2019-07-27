<template>
  <div>
    <v-parallax height="300" :src="headerImage" style="background: #202020">
      <v-layout fill-height align-center column justify-center>
        <router-link
          tag="h1"
          :to="`/${$route.params.streamer}`"
          class="display-3 font-weight-thin mb-1 text-uppercase pointer link"
        >
          {{ $route.params.streamer }}
        </router-link>
        <router-link tag="h4" to="/" class="title font-weight-bold text-uppercase pointer link">
          StreamArchive
        </router-link>
      </v-layout>
    </v-parallax>
    <v-container fluid grid-list-md>
      <v-flex xs12 md9 class="mb-4">
        <v-img :aspect-ratio="16 / 9">
          <v-layout column fill-height>
            <video-player :options="videoOptions" />
          </v-layout>
        </v-img>
      </v-flex>
    </v-container>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer";
export default {
  components: { VideoPlayer },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          pictureInPictureToggle: false
        },
        sources: [
          {
            src: `https://storage.streamarchive.net/streams/${this.$route.params.streamer}/${
              this.$route.params.uuid
            }/index.mpd`,
            type: "application/dash+xml"
          }
        ],
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
        plugins: { httpSourceSelector: { default: "auto" } }
      }
    };
  },
  computed: {
    headerImage() {
      try {
        return require("@/assets/" + this.$route.params.streamer + ".jpg");
      } catch (e) {
        return null;
      }
    }
  }
};
</script>
