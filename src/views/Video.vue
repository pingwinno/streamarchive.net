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
              <video-player @info="updateInfo" />
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 md3 class="mb-4">
          <v-layout wrap>
            <v-flex xs8 md12 class="title">{{ stream.title }}</v-flex>
            <v-flex xs4 md12 class="subtitle-2 font-italic text-xs-right text-md-left">{{ stream.game }}</v-flex>
            <v-flex xs12 md12 class="subtitle-1">{{ dateString }}</v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer";
export default {
  components: { VideoPlayer },
  data() {
    return {
      stream: {},
      range: [0, 120]
    };
  },
  computed: {
    dateString() {
      let months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
      if (!this.stream.date) return;
      let [day, index, year] = this.stream.date
        .split("T")[0]
        .split("-")
        .reverse();
      return day + " " + months[index - 1] + " " + year;
    },
    headerImage() {
      try {
        return require("@/assets/" + this.$route.params.streamer + ".jpg");
      } catch (e) {
        return null;
      }
    }
  },
  methods: {
    updateInfo(info) {
      this.stream = info;
    }
  }
};
</script>
