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
                v-model="parameters.sortBy"
                label="Сортировать по"
                item-text="title"
                item-value="param"
              ></v-select>
              <div>
                <v-btn
                  @click="
                    parameters.sortingOrder === 'desc'
                      ? (parameters.sortingOrder = 'asc')
                      : (parameters.sortingOrder = 'desc')
                  "
                  fab
                  small
                  flat
                >
                  <v-icon class="sort-button" :class="{ inverted: parameters.sortingOrder === 'asc' }">
                    arrow_downward
                  </v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs7 md6 d-flex>
              <!--suppress CheckEmptyScriptTag -->
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
          :sequence="stream.animated_preview"
          :game="stream.game"
          :title="stream.title"
          :date="stream.date"
          :duration="stream.duration"
          :streamer="$route.params.streamer"
        ></preview>
      </v-layout>
      <div class="ma-3" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
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
        sortingOrder: "desc",
        sortBy: "date",
        skip: 0,
        limit: 20
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
  },
  created() {
    this.debouncedGetStreams = _.debounce(this.getStreams, 1000);
  },
  watch: {
    searchPhrase() {
      this.debouncedGetStreams();
    },
    "parameters.sortingOrder": function() {
      this.debouncedGetStreams();
    },
    "parameters.sortBy": function() {
      this.debouncedGetStreams();
    }
  },
  methods: {
    getStreams() {
      this.endOfList = false;
      this.parameters.skip = 0;
      this.streams = [];
      if (!this.searchPhrase) {
        this.$delete(this.parameters, "equalOperator");
        this.$delete(this.parameters, "equalsField");
        this.$delete(this.parameters, "equalsValue");
      } else {
        this.parameters.equalOperator = "text";
        this.parameters.equalsField = "ru";
        this.parameters.equalsValue = this.searchPhrase;
      }
      this.getList();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.getList();
      }, 1000);
    },
    getList() {
      if (!this.endOfList)
        this.$http
          .get(`${process.env.VUE_APP_URL}/db/streams/${this.$route.params.streamer}`, { params: this.parameters })
          .then(response => {
            if (response.body.length !== 0) {
              this.streams = [...this.streams, ...response.body];
              this.busy = false;
              this.parameters.skip += 20;
            } else this.endOfList = true;
          });
    }
  }
};
</script>
