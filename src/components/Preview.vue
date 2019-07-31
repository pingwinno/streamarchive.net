<template>
  <v-flex xs6 md4 lg3>
    <router-link :to="{ name: 'video-player.vue', params: { uuid: id, streamer: streamer } }" tag="div" class="pointer">
      <v-img
        :aspect-ratio="16 / 9"
        :src="source"
        @mouseover="onHover()"
        @error="onMouseOut()"
        @mouseout="onMouseOut()"
        :lazy-src="require('@/assets/placeholder.jpg')"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
        <v-layout pa-2 column fill-height>
          <v-flex>
            <span class="pa-1 holder caption"> <v-icon small>play_arrow</v-icon> {{ durationString }} </span>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <span class="pa-1 right holder caption">{{ game }}</span>
          </v-flex>
        </v-layout>
      </v-img>
      <v-layout row nowrap>
        <v-flex row class="text-truncate">{{ title }}</v-flex>
        <v-spacer />
        <v-flex class="text-xs-right grey--text caption no-wrap">{{ dateString }}</v-flex>
      </v-layout>
    </router-link>
  </v-flex>
</template>

<script>
export default {
  props: {
    id: String,
    game: String,
    title: String,
    date: String,
    duration: Number,
    streamer: String
  },
  computed: {
    durationString() {
      let date = new Date(null);
      date.setSeconds(this.duration);
      return date.toISOString().substr(11, 8);
    },
    dateString() {
      /*let a = new Date();
      a.setTime(this.date);
      let months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      return date + " " + month + " " + year;*/
      return this.date;
    }
  },
  data() {
    return {
      defaultImage: `${this.$endpoints[this.$route.params.streamer]}/streams/${this.streamer}/${this.id}/preview.jpg`,
      previews: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
        return `${this.$endpoints[this.$route.params.streamer]}/streams/${this.streamer}/${
          this.id
        }/animated_preview/preview${item}.jpg`;
      }),
      source: `${this.$endpoints[this.$route.params.streamer]}/streams/${this.streamer}/${this.id}/preview.jpg`,
      loop: setTimeout(() => {}, 0),
      index: 1
    };
  },
  methods: {
    onHover() {
      this.index = 1;
      this.source = this.previews[0];
      this.circle();
    },
    onMouseOut() {
      clearInterval(this.loop);
      this.source = this.defaultImage;
      this.index = 1;
    },
    circle() {
      let vm = this;
      this.loop = setTimeout(() => {
        vm.source = vm.previews[this.index];
        this.index = (this.index + 1) % (vm.previews.length - 1);
        vm.circle();
      }, 750);
    }
  }
};
</script>

<style scoped>
.holder {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  user-select: none;
}
</style>
