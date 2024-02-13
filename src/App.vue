<template>
  <router-view :loading="loading" :info="info" :errored="errored" />
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
        let count = 1;
        for (const cur in this.info) {
          this.info[cur].SerialNum = count;
          count += 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>
