<template>
  <div>
    <div class="headline text-xs-center pt-2">Наши стримеры</div>

    <v-container fluid class="card-list">
      <v-card
        v-for="([streamer, url], index) in streamers"
        :key="index"
        width="250"
        height="250"
        class="streamer-card"
        :to="`/${streamer}`"
      >
        <v-img :src="`${url}/img/${streamer}/main.jpg`" v-on:error="handleImageError(index)" width="250" height="250">
          <v-container fluid pa-2 class="streamer-title headline">{{ streamer }}</v-container>
        </v-img>
      </v-card>
    </v-container>

    <v-container>
      <h2 class="display-1 d-block main-page-subtitle">О проекте</h2>
      <span class="body-1 d-block pb-3">
        Всем драсьте. Мы - маленькая команда OpenStreamArchive. Месяцы работы, тонны перекопанного кода (спасибо твичу)
        и вот он - StreamArchive. Идея проекта родилась когда мы потеряли звук части стрима с распаковкой альбома с
        пожеланиями от Утиной Армии. Теперь за новыми стримами следит специальный сервер и автоматически записывает их
        на лету, тем самым сохраняя всё. Конечно мы не можем гарантировать 100% надёжности как из-за того что проект
        создан любителями (но мы над этим работаем и стараемся сохранить всё), так и из-за того что сервер собран из
        говна и палок, лежавших без дела.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Вставка для экспертов IT</h2>
      <span class="body-1 d-block pb-3">
        Заливать на youtube бесполезно. Мы проверяли. 43 страйка из них 3 блокировки на 5 часовой стрим. И разгребать
        весь контент, что-то подменять и вырезать вручную при таких объемах вряд ли реализуемо в адекватные сроки.
        Google Photos - приличная часть видео не доступна в одном из старых архивов. VK - доступен не всем. Выделенный
        сервер, подходящий под нужды архива ~100$/месяц. Если у вас есть конкретные предложения - мы с радостью вас
        выслушаем.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Зачем это всё нужно?</h2>
      <span class="body-1 d-block pb-3">
        Потому что Твич хранит стримы 60 дней по партнёрке и 15 без неё. Так же в сохраненных видео у стримера могут
        быть пропущены фрагменты звука из-за прав на музыку.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Зачем нам деньги?</h2>
      <span class="body-1 d-block pb-3">
        Поскольку схема с хранением записей на домашнем сервере оказалась ненадёжной, было принято решение арендовать
        сервер с большим объёмом хранилища. В общей сложности сейчас это стоит около €80/мес и по мере накопления
        записей стоимость будет расти.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Вопросы и предложения</h2>
      <span class="body-1 d-block pb-3">
        <span class="d-block">
          Вопросы и пожелания вы можете пистать в лс -
          <a href="https://t.me/de_morgan" target="_blank" class="link bold">de_morgan</a>
        </span>
        <span class="d-block">Если вы хотите добавить стримера на хаб пишите ему же.</span>
        <span class="d-block">Рекордер/бэкэнд - DedKim</span>
        <span class="d-block">Фронтэнд - ohhHiMark, peyoter, Ejento</span>
        <span class="d-block">DevOps - sadmonad, DedKim</span>
        <span class="d-block">Дизайн - Anulyev, Bathammer, ohhHiMark</span>
        <span class="d-block">Тестирование - iamien1993, de_morgan</span>
        <span class="d-block">Отдельное спасибо: </span>
        <span class="d-block">wmw за помощь с API твича для стриминга видео</span>
        <span class="d-block">MyLittleZi за два 6TB винта и RAID контроллер</span>
        <span class="d-block">DrZoidberg, Olyashaa и мгогим другим, кто поддержал финансово</span>
        <span class="d-block">Ваша помощь неоценима.</span>
        <span class="d-block">Если тоже хотите помочь нам - перейдите на DA по кнопке в правом нижнем углу </span>
      </span>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    streamers: []
  }),
  created() {
    document.title = 'StreamArchive - ЛУЧШИЙ АРХИВ ВО ВСЕЛЕННОЙ КСТА'
    this.streamers = Object.entries(this.$endpoints)
  },
  methods: {
    handleImageError(index) {
      this.streamers = this.streamers.slice(index, 1)
    }
  }
}
</script>
