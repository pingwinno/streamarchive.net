<template>
  <div>
    <v-toolbar>
      <!--      <v-toolbar-title>Title</v-toolbar-title>-->
      <!--      <v-spacer></v-spacer>-->
      <!--      <v-toolbar-items> </v-toolbar-items>-->
      <!--      <template v-slot:extension>-->
      <!--        <v-toolbar-title class="white&#45;&#45;text">Title</v-toolbar-title>-->
      <!--      </template>-->
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap justify-center>
        <preview
          v-for="stream in streams"
          :key="stream._id"
          :id="stream._id"
          :sequence="stream.animated_preview"
          :game="stream.game"
          :title="stream.title"
          :date="stream.date"
          :duration="stream.duration"
        ></preview>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Preview from "@/components/Preview";
export default {
  components: { Preview },
  data() {
    return {
      searchWord: "",
      streams: [],
      parameters: {
        sortingOrder: "desc",
        sortBy: "date",
        skip: 0,
        limit: 100
      }
    };
  },
  created() {
    this.$http
      .get(`https://storage.streamarchive.net/db/streams/olyashaa`, { params: this.parameters })
      .then(response => (this.streams = response.body));
  }
};
</script>
