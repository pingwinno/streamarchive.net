<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title>
        <router-link to="/" class="font-weight-bol text-uppercase white--text">
          StreamArchive
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title>
        <router-link :to="`/${$route.params.streamer}`" class="text-uppercase subheading grey--text text--lighten-1">
          {{ $route.params.streamer }}
        </router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view :key="$route.fullPath" />
    </v-content>
    <div class="donation">
      <v-btn round href="https://boosty.to/morgan008" target="_blank">
        <v-icon>attach_money</v-icon>
        Donation
      </v-btn>
    </div>
  </v-app>
</template>
