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
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
    <TableString />
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
