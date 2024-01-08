<template>
  <div id="app">
    <MyLoader v-if="loading" />
    <RouterView v-else />
  </div>
</template>

<script>
import './style.css';
import MyLoader from './components/MyLoader.vue';

export default {
  name: 'App',
  data: () => ({
    loading: true,
    currency: null,
  }),
  components: { MyLoader },
};
</script>
