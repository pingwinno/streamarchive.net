<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <preview></preview>
    </v-layout>
  </v-container>
</template>

<script>
import Preview from "@/components/Preview";
export default {
  components: { Preview },
  data() {
    return {
      searchWord: ""
    };
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_URL}/db/streams/olyashaa`, {
        params: {
          sortingOrder: "desc",
          sortBy: "date",
          skip: 0,
          limit: 20
        }
      })
      .then(response => {
        console.log(response.body);
      });
  },
  methods: {
    getStreams() {
      this.endOfList = false;
      this.parameters.skip = 0;
      this.streamArray = [];
      if (this.searchWord.trim() === "" || this.searchWord.trim().length === 0 || this.searchWord.trim() === null) {
        this.$delete(this.parameters, "equalOperator");
        this.$delete(this.parameters, "equalsField");
        this.$delete(this.parameters, "equalsValue");
      } else {
        this.parameters.equalOperator = "text";
        this.parameters.equalsField = "ru";
        this.parameters.equalsValue = this.searchWord;
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
      if (!this.endOfList) {
        this.$http
          .get(`https://storage.streamarchive.net/db/streams/${this.$streamer}`, { params: this.parameters })
          .then(response => {
            if (response.data.length !== 0) {
              this.streamArray = [...this.streamArray, ...response.data];
              this.busy = false;
              this.parameters.skip += 20;
            } else this.endOfList = true;
          });
      }
    }
  }
};
</script>
