<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 class="mb-4">
        <v-img :aspect-ratio="16 / 9">
          <v-layout column fill-height>
            <video-player @info="updateInfo" />
          </v-layout>
        </v-img>
      </v-flex>
      <v-flex xs12 class="mb-4">
        <v-layout wrap>
          <v-flex xs8 md12 class="title">{{ stream.title }}</v-flex>
          <v-flex xs4 md12 class="subtitle-2 font-italic text-xs-right text-md-left">{{ stream.game }}</v-flex>
          <v-flex xs12 md12 class="subtitle-1">{{ dateString }}</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'

export default {
  components: { VideoPlayer },
  data() {
    return {
      stream: {}
    }
  },
  computed: {
    dateString() {
      let months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      if (!this.stream.date) return
      let [day, index, year] = this.stream.date
        .split('T')[0]
        .split('-')
        .reverse()
      return day + ' ' + months[index - 1] + ' ' + year
    }
  },
  methods: {
    updateInfo(info) {
      this.stream = info
      const title = info.title
      document.title = `${title} | ${this.$route.params.streamer.toUpperCase()} | StreamArchive - ЛУЧШИЙ АРХИВ ВО ВСЕЛЕННОЙ КСТА`
    }
  }
}
</script>
