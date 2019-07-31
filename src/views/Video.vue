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
      <v-layout wrap>
        <v-flex xs12 md9 class="mb-4">
          <v-img :aspect-ratio="16 / 9">
            <v-layout column fill-height>
              <video-player />
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 md3 class="mb-4">
          <!--{{ temp.title }} <br />
          {{ temp.game }} <br />
          {{ temp.date }}-->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer";
export default {
  components: { VideoPlayer },
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
