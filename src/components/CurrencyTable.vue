<template>
  <button class="to-another-page" @click="$router.push({ name: 'Converter' })">
    КОНВЕРТЕР
  </button>
  <button class="update-button"></button>
</template>

<script>
export default {
  name: 'CurrencyTable',
};
</script>
