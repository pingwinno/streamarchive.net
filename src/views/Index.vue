<template>
  <div class="d-inline-flex">
    <v-hover class="pointer" v-for="streamer in $streamers" :key="streamer" style="height: 100vh">
      <v-card
        slot-scope="{ hover }"
        :width="window.width / $streamers.length"
        style="height: 100vh; border-radius: 0"
        class="elevation-0"
      >
        <router-link :to="`/${streamer}`" tag="div" style="height: 100vh">
          <v-img :src="require(`@/assets/index/${streamer}.jpg`)" style="height: 100vh">
            <transition name="half-fade">
              <div v-if="!hover" class="grey overlap fill-height"></div>
            </transition>
            <transition name="fade">
              <div v-if="hover" class="fill-height text-xs-center fill-width pt-5">
                <span class="display-2 text-uppercase">{{ streamer }}</span>
              </div>
            </transition>
          </v-img>
        </router-link>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
};
</script>

<style>
.overlap {
  position: absolute;
  opacity: 0.5;
  width: 100%;
}

.half-fade-enter-active,
.half-fade-leave-active {
  opacity: 0.5;
  transition: opacity 0.5s;
}

.half-fade-enter,
.half-fade-leave-to {
  opacity: 0;
}
</style>
