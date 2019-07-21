<template>
  <v-app dark>
    <router-view :key="$route.fullPath" />
    <div class="donation">
      <v-btn round class="donation" @click="openDonation"><v-icon>attach_money</v-icon> Donation </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    openDonation() {
      let win = window.open("https://www.donationalerts.ru/r/pingwinno", "_blank");
      win.focus();
    }
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
}
.centered-input input {
  text-align: center;
}
.donation {
  position: fixed;
  bottom: 0;
  right: 0;
  button {
    background: linear-gradient(to bottom right, purple, black) !important;
  }
}

.sort-button {
  transition: all 500ms;
}
.inverted {
  transform: rotate(180deg);
}

.link {
  transition: color 0.5s;
  &:hover {
    color: grey;
  }
}
</style>
