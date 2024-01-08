<template>
  <div id="app">
    <!-- <RouterView loading="loading" info="info" errored="errored" /> -->
    <RouterView loading="loading" />
    <p>{{ info }}</p>
  </div>
</template>

<script>
import './style.css';

const axios = require('axios').default;

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      info: null,
      // errored: false,
    };
  },
  mounted() {
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => (this.info = response.data.Valute));
    // .catch((error) => {
    //   console.log(error);
    //   this.errored = true;
    // })
    // .finally(() => (this.loading = false));
  },
};
</script>
