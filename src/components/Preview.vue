<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card
      tile
      flat
      class="pointer transparent"
      :to="{ name: 'video-player.vue', params: { uuid: id, streamer: streamer } }"
    >
      <v-img :aspect-ratio="16 / 9" :src="source" @mouseover="onHover()" @error="onMouseOut()" @mouseout="onMouseOut()">
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0 class="smooth-back">
            <v-progress-circular indeterminate color="grey lighten-5" />
          </v-layout>
        </template>
        <v-layout pa-1 column fill-height>
          <v-flex>
            <span class="pa-1 holder caption"> <v-icon small>play_arrow</v-icon> {{ durationString }} </span>
          </v-flex>
          <v-spacer />
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
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    id: String,
    game: String,
    title: String,
    date: String,
    duration: Number
  },
  computed: {
    baseUrl() {
      return this.$endpoints[this.streamer]
    },
    defaultImage() {
      return `${this.baseUrl}/streams/${this.streamer}/${this.id}/preview.jpg`
    },
    previews() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
        item => `${this.baseUrl}/streams/${this.streamer}/${this.id}/animated_preview/preview${item}.jpg`
      )
    },
    durationString() {
      let date = new Date(null)
      date.setSeconds(this['duration'])
      return date.toISOString().substr(11, 8)
    },
    dateString() {
      let months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      let [day, index, year] = this.date
        .split('T')[0]
        .split('-')
        .reverse()
      return day + ' ' + months[index - 1] + ' ' + year
    }
  },
  data() {
    return {
      streamer: this.$route.params.streamer,
      loop: setTimeout(() => {}, 0),
      source: '',
      index: 1
    }
  },
  mounted() {
    this.source = `${this.baseUrl}/streams/${this.streamer}/${this.id}/preview.jpg`
  },
  methods: {
    onHover() {
      this.index = 1
      this.source = this['previews'][0]
      this.circle()
    },
    onMouseOut() {
      clearInterval(this.loop)
      this.source = this.defaultImage
      this.index = 1
    },
    circle() {
      let vm = this
      this.loop = setTimeout(() => {
        vm.source = vm.previews[this.index]
        this.index = (this.index + 1) % (vm.previews.length - 1)
        vm.circle()
      }, 750)
    }
  }
}
</script>
