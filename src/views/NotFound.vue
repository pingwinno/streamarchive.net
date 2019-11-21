<template>
  <v-img src="https://picsum.photos/id/172/1920/1080" class="fill-width page-height">
    <template v-slot:placeholder>
      <v-layout fill-height align-center justify-center ma-0 pa-0>
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </template>
    <v-layout column fill-height align-center justify-center class="text-xs-center">
      <h1 class="display-4">404</h1>
      <h1>Ну и куда ты завернул? Тут нет такой страницы.</h1>
      <router-link to="/" tag="div" class="pointer link">Вернуться на главную</router-link>
    </v-layout>
  </v-img>
</template>

<script>
export default {
  created() {
    document.title = "Ничего не найдено на StreamArchive?! Не может быть!";
  }
};
</script>
