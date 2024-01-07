<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <button class="to-another-page" @click="$router.push({ name: 'Table' })">
    К ТАБЛИЦЕ
  </button>
  <div class="converter-strings">
    <ConverterString />
  </div>
</template>

<script>
import ConverterString from './mini-components/ConverterString.vue';

export default {
  name: 'CurrencyConverter',
  components: { ConverterString },
};
</script>
