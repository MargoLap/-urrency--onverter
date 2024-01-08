<template>
  <button class="to-another-page" @click="$router.push({ name: 'Converter' })">
    КОНВЕРТЕР
  </button>
  <button class="update-button"></button>
  <br class="clearer" />
  <span v-if="loading" class="loader"></span>
  <div v-else class="table-strings">
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
  </div>
</template>

<script>
import TableString from './mini-components/TableString.vue';

export default {
  name: 'CurrencyTable',
  components: { TableString },
  props: ['loading'],
};
</script>

<!-- <template>
  <button class="to-another-page" @click="$router.push({ name: 'Converter' })">
    КОНВЕРТЕР
  </button>
  <button class="update-button"></button>
  <br class="clearer" />
  <section v-if="errored">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </section>
  <section v-else>
    <span v-if="loading" class="loader"></span>
    <div v-else class="table-strings">
      <div v-for="currency in info" :key="currency.id">
        <TableString
          :tableValue="currency.Value"
          :tableIcon="currency.CharCode"
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
</script> -->
