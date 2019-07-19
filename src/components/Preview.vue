<template>
  <v-flex xs6 md4 lg3>
    <v-img :aspect-ratio="16 / 9" :src="'https://cdn.vuetifyjs.com/images/parallax/material.jpg'">
      <v-layout pa-2 column fill-height>
        <v-flex>
          <span class="pa-1" style="background: rgba(0,0,0,.6); border-radius:4px">
            <v-icon small>play_arrow</v-icon> длительность
          </span>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex shrink>
          <span class="pa-1 right" style="background: rgba(0,0,0,.6); border-radius:4px">время</span>
        </v-flex>
      </v-layout>
    </v-img>
  </v-flex>
</template>

<script>
export default {
  props: {
    id: String,
    previewSequence: Array,
    game: String,
    title: String,
    date: Number,
    duration: Number
  },
  data() {
    return {
      test: "test"
    };
  }
};
</script>
