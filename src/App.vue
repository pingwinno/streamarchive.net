<template>
  <v-app dark>
    <router-view :key="$route.fullPath" />
    <div class="donation">
      <v-btn round class="donation" @click="openDonation"><v-icon>attach_money</v-icon>Donation</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    openDonation() {
      let win = window.open("https://www.donationalerts.com/r/morgan008", "_blank");
      win.focus();
    }
  }
};
</script>
