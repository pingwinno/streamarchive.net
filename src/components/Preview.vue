<template>
  <v-flex xs6 md4 lg3>
    <router-link to="/45" tag="div">
      <v-img
        :aspect-ratio="16 / 9"
        :src="source"
        @mouseover="onHover()"
        @error="onMouseOut()"
        @mouseout="onMouseOut()"
        style="cursor: pointer"
        lazy-src="https://picsum.photos/id/11/100/60"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
        <v-layout pa-2 column fill-height>
          <v-flex>
            <span class="pa-1" style="background: rgba(0,0,0,.6); border-radius:4px">
              <v-icon small>play_arrow</v-icon> {{ duration }}
            </span>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <span class="pa-1 right" style="background: rgba(0,0,0,.6); border-radius:4px">{{ game }}</span>
          </v-flex>
        </v-layout>
      </v-img>
      <v-layout row nowrap>
        <v-flex row style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">{{ title }}</v-flex>
        <v-spacer />
        <v-flex class="text-xs-right">{{ date }}</v-flex>
      </v-layout>
    </router-link>
  </v-flex>
</template>

<script>
export default {
  props: {
    id: String,
    sequence: Array,
    game: String,
    title: String,
    date: Number,
    duration: Number
  },
  data() {
    return {
      defaultImage: `${process.env.VUE_APP_URL}/streams/olyashaa/${this.id}/preview.jpg`,
      previews: this.sequence.map(item => {
        return `${process.env.VUE_APP_URL}/streams/olyashaa/${this.id}/animated_preview/${item.src}`;
      }),
      source: `${process.env.VUE_APP_URL}/streams/olyashaa/${this.id}/preview.jpg`,
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
