<template>
  <div class="col-md-3">
    <div class="sidebar">
      <p>热门标签</p>

      <div class="tag-list">
        <span v-show="isLoading">正在加载标签 <i class="ion-load-a"></i></span>

        <span v-show="!tags.length && !isLoading">没有标签</span>

        <a
          v-for="(tag, index) in tags"
          :key="index"
          :data-tag="tag"
          @click="tagEvent"
          href="javascript:"
          class="tag-pill tag-default"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api.js';

export default {
  name: 'HomeTags',
  data() {
    return {
      tags: [],
      isLoading: false
    };
  },
  async mounted() {
    this.isLoading = true;

    const result = await api.getTagList();

    if (result && result.tags.length) {
      this.tags = result.tags;
    }

    this.isLoading = false;
  },
  methods: {
    async tagEvent(event) {
      this.$emit('tagArticles', event.target.dataset.tag);
    }
  }
};
</script>
