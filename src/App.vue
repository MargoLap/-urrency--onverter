<template>
  <div id="app">
    <CurrencyTable />
  </div>
</template>

<script>
import CurrencyTable from './components/CurrencyTable.vue';

import './style.css';

export default {
  name: 'App',
  components: { CurrencyTable },
};
</script>
