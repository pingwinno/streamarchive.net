<template>
  <div>
    <div class="d-inline-flex" style="position: relative">
      <v-btn absolute fab flat class="toInfo" @click="slideToInfo()"><v-icon>arrow_downward</v-icon></v-btn>
      <router-link
        :to="`/${streamer}`"
        tag="div"
        class="pointer"
        v-for="streamer in $streamers"
        :key="streamer"
        :style="{ width: window.width / $streamers.length + 'px' }"
      >
        <v-img :src="indexImage(streamer)" class="page-height">
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>
          <div class="fill-height text-xs-center fill-width pt-5 index-tab">
            <span class="display-2 text-uppercase index-tab-title">{{ streamer }}</span>
          </div>
        </v-img>
      </router-link>
    </div>
    <v-container fluid id="info">
      <div class="headline text-xs-center font-weight-bold text-uppercase fill-width">StreamArchive</div>
      <span class="display-1 d-block">О проекте</span>
      <span class="body-1 d-block pb-3">
        Всем драсьте. Мы - маленькая команда OpenStreamArchive. Месяцы работы, тонны перекопанного кода (спасибо твичу)
        и вот он - StreamArchive. Идея проекта родилась когда мы потеряли звук части стрима с распаковкой альбома с
        пожеланиями от Утиной Армии. Теперь за новыми стримами следит специальный сервер и автоматически записывает их
        на лету, тем самым сохраняя всё. Конечно мы не можем гарантировать 100% надёжности как из-за того что проект
        создан любителями (но мы над этим работаем и стараемся сохранить всё), так и из-за того что сервер собран из
        говна и палок, лежавших без дела.
      </span>

      <span class="display-1 d-block">Вставка для экспертов IT</span>
      <span class="body-1 d-block pb-3">
        Заливать на youtube бесполезно. Мы проверяли. 43 страйка из них 3 блокировки на 5 часовой стрим. И разгребать
        весь контент, что-то подменять и вырезать вручную при таких объемах вряд ли реализуемо в адекватные сроки.
        Google Photos - приличная часть видео не доступна в одном из старых архивов. VK - доступен не всем. Выделенный
        сервер, подходящий под нужды архива ~100$/месяц. Если у вас есть конкретные предложения - мы с радостью вас
        выслушаем.
      </span>

      <span class="display-1 d-block">Зачем это всё нужно?</span>
      <span class="body-1 d-block pb-3">
        Потому что Твич хранит стримы 60 дней по партнёрке и 15 без неё. Так же в сохраненных видео у стримера могут
        быть пропущены фрагменты звука из-за прав на музыку.
      </span>

      <span class="display-1 d-block">Зачем нам деньги?</span>
      <span class="body-1 d-block pb-3">
        Нужен нормальный ИБП. Так же на свет (100кв⋅ч в месяц) и интернет (ибо канал 400мб/c для личного пользования не
        нужен) примерно 30$. И банально на пиво и прочие личные расходы, ибо времени уходит прилично, но это уже на
        сдачу с железа.
      </span>

      <span class="display-1 d-block">Вопросы и предложения</span>
      <span class="body-1 d-block pb-3">
        <span class="d-block">
          Вопросы и пожелания вы можете пистать в лс -
          <a href="https://t.me/ohhHiMark" target="_blank" class="link bold">ohhHiMark</a>
        </span>
        <span class="d-block">Если вы хотите добавить стримера на хаб пишите ему же.</span>
        <span class="d-block">Рекордер/бэкэнд - DedKim</span>
        <span class="d-block">Фронтэнд - ohhHiMark, peyoter</span>
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
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    document.title = "StreamArchive - ЛУЧШИЙ АРХИВ ВО ВСЕЛЕННОЙ КСТА";
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    indexImage(streamer) {
      try {
        return require(`@/assets/img/main/${streamer}.jpg`);
      } catch (e) {
        return "https://picsum.photos/id/1011/1024";
      }
    },
    slideToInfo() {
      this.$vuetify.goTo("#info");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
};
</script>
