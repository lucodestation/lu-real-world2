<template>
  <span
    @click="favoriteEvent"
    class="btn btn-sm pull-xs-right"
    :class="[
      article.favorited ? 'btn-primary' : 'btn-outline-primary',
      {
        disabled: favoriteLoading
      }
    ]"
  >
    <i class="ion-heart"></i>
    {{ this.article.favoritesCount }}
  </span>
</template>

<script>
import api from '@/utils/api.js';

export default {
  name: 'ArticleFavoritesButton',
  props: ['article'],
  data() {
    return {
      favoriteLoading: false
    };
  },
  methods: {
    async favoriteEvent() {
      if (!this.$store.state.isLoggedIn) {
        this.$router.push('/register');
        return;
      }

      this.favoriteLoading = true;

      // 判断是收藏还是取消收藏
      const prop = this.article.favorited
        ? 'deleteFavoriteArticle'
        : 'favoriteArticle';

      const result = await api[prop](this.article.slug);

      if (result) {
        this.$emit('updateArticle', result.article);
      }
      this.favoriteLoading = false;
    }
  }
};
</script>
