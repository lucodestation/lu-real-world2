<template>
  <div id="app">
    <app-header />

    <router-view></router-view>

    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppHeader: () => import('@/layouts/AppHeader.vue'),
    AppFooter: () => import('@/layouts/AppFooter.vue')
  }
};
</script>
