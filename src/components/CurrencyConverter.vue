<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <button class="to-another-page" @click="$router.push({ name: 'Table' })">
    К ТАБЛИЦЕ
  </button>
  <br class="clearer" />
  <div class="converter-strings">
    <h1 class="value-converter">90.5059</h1>
    <h1 class="icon-converter">RUB</h1>
    <div class="arrows">
      <div class="arrow-1">
        <div></div>
      </div>
      <div class="arrow-2">
        <div></div>
      </div>
    </div>
    <h1 class="value-converter">1</h1>
    <h1 class="icon-converter">USD</h1>
  </div>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  components: {},
};
</script>
