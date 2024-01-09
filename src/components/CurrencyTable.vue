<template>
  <button class="to-another-page" @click="$router.push({ name: 'Converter' })">
    КОНВЕРТЕР
  </button>
  <button class="update-button" @click="$router.go()"></button>
  <br class="clearer" />
  <section v-if="errored === true">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </section>
  <section v-else>
    <p class="message">КУРСЫ ВАЛЮТ В RUB</p>
    <span v-if="loading === true" class="loader"></span>
    <div v-else class="table-strings">
      <div v-for="currency in info" :key="currency.id">
        <TableString
          :tableValue="currency.Value"
          :tableIcon="currency.CharCode"
          :nameValute="currency.Name"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TableString from './mini-components/TableString.vue';

export default {
  name: 'CurrencyTable',
  components: { TableString },
  props: ['loading', 'info', 'errored'],
};
</script>
