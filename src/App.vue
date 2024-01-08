<template>
  <div id="app">
    <RouterView loading="loading" />
  </div>
</template>

<script>
import './style.css';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
};
</script>
