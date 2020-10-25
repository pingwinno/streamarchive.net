<template>
  <v-layout column fill-height align-center justify-center>
    <h1 class="display-4">404</h1>
    <h1>Ну и куда ты завернул? Тут нет такой страницы.</h1>
    <router-link to="/" class="link">Вернуться на главную</router-link>
  </v-layout>
</template>

<script>
export default {
  created() {
    document.title = 'Ничего не найдено на StreamArchive?! Не может быть!'
  }
}
</script>
