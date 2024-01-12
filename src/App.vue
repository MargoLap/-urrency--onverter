<template>
  <div id="app">
    <RouterView :loading="loading" :info="info" :errored="errored" />
  </div>
</template>

<script>
import './style.css';

const axios = require('axios').default;

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      info: null,
      errored: false,
    };
  },
  mounted() {
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => {
        // Добавляем новую валюту
        // TODO: Зачем если я сказал к доллару, ну можно и так вроде все правильно
        const CurRub = {
          ID: 'R09409F',
          NumCode: '673',
          CharCode: 'RUB',
          Nominal: 1,
          Name: 'Российский рубль',
          Value: 1,
          Previous: 1,
        };
        this.info = response.data.Valute;
        this.info = { ...response.data.Valute, RUB: CurRub };
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<!-- TODO: URIError: Failed to decode param '/%=%20BASE_URL%20%%3Efavicon.png' 
иконка сайта не грузиться
-->
