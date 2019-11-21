<template>
  <v-app dark>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <div class="donation">
      <v-btn round class="donation" @click="openDonation"><v-icon>attach_money</v-icon>Donation</v-btn>
    </div>
    <v-snackbar v-model="snackbar" :bottom="true" :timeout="snackbarTimeout">{{ snackbarText }}</v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 2000
    };
  },
  created() {
    this.$bus.on("showAlert", this.showAlert);
  },
  methods: {
    openDonation() {
      window.open("https://www.donationalerts.ru/r/pingwinno", "_blank").focus();
    },
    showAlert(alertData) {
      this.snackbarText = alertData.text ? alertData.text : "";
      this.snackbarTimeout = alertData.timeout ? alertData.timeout : 20000;
      this.snackbar = true;
    }
  }
};
</script>
<style lang="scss">
@import "./assets/css/styles";
</style>
