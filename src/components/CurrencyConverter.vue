<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <button class="to-another-page" @click="$router.push({ name: 'Table' })">
    К ТАБЛИЦЕ
  </button>
</template>

<script>
export default {
  name: 'CurrencyConverter',
};
</script>
