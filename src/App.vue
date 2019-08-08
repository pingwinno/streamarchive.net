<template>
  <v-app dark>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
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
.fill-width {
  width: 100%;
}
.sort-button {
  transition: all 500ms;
}
.inverted {
  transform: rotate(180deg);
}
.link {
  color: white;
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: grey;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
