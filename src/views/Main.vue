<template>
  <div>
    <v-parallax :src="headerImage" style="background: #202020">
      <v-layout align-center column justify-center>
        <v-layout fill-height align-center justify-center column>
          <h1 class="display-3 font-weight-thin mb-1 text-uppercase">{{ $route.params.streamer }}</h1>
          <router-link tag="h4" to="/" class="title font-weight-bold text-uppercase pointer link">
            StreamArchive
          </router-link>
        </v-layout>
        <v-spacer />
        <v-flex style="width: 100%" shrink>
          <v-layout wrap align-center>
            <v-flex xs5 md3 d-flex>
              <v-select
                :items="sortItems"
                v-model="parameters.order_by"
                label="Сортировать по"
                :disabled="!!searchPhrase"
                item-text="title"
                item-value="param"
              ></v-select>
              <div>
                <v-btn :disabled="!!searchPhrase" @click="toggleSort()" fab small flat>
                  <v-icon class="sort-button" :class="{ inverted: parameters.sort === 'asc' }">
                    arrow_downward
                  </v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs7 md6 d-flex>
              <v-text-field class="centered-input" text-center placeholder="search" v-model="searchPhrase" clearable />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-container fluid grid-list-md>
      <v-layout row wrap justify-center>
        <preview
          v-for="stream in streams"
          :key="stream._id"
          :id="stream._id"
          :game="stream.game"
          :title="stream.title"
          :date="stream.date"
          :duration="stream.duration"
        ></preview>
      </v-layout>
      <div class="loader" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <v-layout fill-height align-center justify-center v-if="busy && !endOfList">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
        <v-layout justify-center v-if="this.endOfList">
          Ну, в этой ситуации... мы просто... наше к это самое.... мы уже... здесь наши стримы всё. Окончены.
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import Preview from "@/components/Preview";
export default {
  components: { Preview },
  data() {
    return {
      busy: false,
      endOfList: false,
      sortItems: [
        { param: "date", title: "дате" },
        { param: "game", title: "игре" },
        { param: "title", title: "названию" }
      ],
      searchPhrase: "",
      streams: [],
      parameters: {
        streamer: this.$route.params.streamer,
        sort: "desc",
        order_by: "date",
        page: 0
      }
    };
  },
  computed: {
    headerImage() {
      try {
        return require(`@/assets/img/header/${this.$route.params.streamer}.jpg`);
      } catch (e) {
        return null;
      }
    }
  },
  created() {
    document.title = this.$route.params.streamer.toUpperCase() + " | StreamArchive - ЛУЧШИЙ АРХИВ ВО ВСЕЛЕННОЙ КСТА";
    this.debouncedGetStreams = _.debounce(this.getStreams, 1000);
  },
  watch: {
    searchPhrase() {
      this.debouncedGetStreams();
    },
    "parameters.sort": function() {
      this.debouncedGetStreams();
    },
    "parameters.order_by": function() {
      this.debouncedGetStreams();
    }
  },
  methods: {
    getStreams() {
      this.endOfList = false;
      this.parameters.page = 0;
      this.streams = [];
      this.getList();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => this.getList(), 1000);
    },
    getList() {
      let url = `${process.env.VUE_APP_URL}/streams`;
      let params = { params: this.parameters };
      if (this.searchPhrase) {
        url += "/search";
        params = { params: { query: this.searchPhrase, streamer: this.$route.params.streamer } };
      }
      if (!this.endOfList)
        axios.get(url, params).then(response => {
          if (this.searchPhrase) {
            this.streams = response.data;
            this.endOfList = true;
          } else if (response.data.length !== 0) {
            this.streams = [...this.streams, ...response.data];
            this.busy = false;
            this.parameters.page += 1;
          } else this.endOfList = true;
        });
    },
    toggleSort() {
      this.parameters.sort === "desc" ? (this.parameters.sort = "asc") : (this.parameters.sort = "desc");
    }
  }
};
</script>
