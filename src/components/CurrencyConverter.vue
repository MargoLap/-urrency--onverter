<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <button class="to-another-page" @click="$router.push({ name: 'Table' })">
    К ТАБЛИЦЕ
  </button>
  <br class="clearer" />
  <section v-if="errored === true">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </section>
  <section v-else>
    <span v-if="loading" class="loader"></span>
    <div v-else class="converter-strings">
      <input class="value-converter" />
      <h1 class="icon-converter">RUB</h1>
      <div class="arrows">
        <div class="arrow-1">
          <div></div>
        </div>
        <div class="arrow-2">
          <div></div>
        </div>
      </div>
      <input class="value-converter" />
      <h1 class="icon-converter">USD</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  props: ['loading', 'info', 'errored'],
};
</script>

<style scoped>
/*---- блок с конвертером ----*/
.converter-strings {
  height: 300px;
  margin-top: 10%;
  margin-left: 8%;
}

/*---- поле цены ----*/
.value-converter {
  width: 360px;
  height: 120px;
  padding-top: 35px;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 60px;
  display: inline-block;
  cursor: default;
  color: #1e1e1e;
}

/*---- поле валюты ----*/
.icon-converter {
  width: 200px;
  height: 120px;
  padding-top: 35px;
  margin-right: 15px;
  border-radius: 25px;
  background: #d9d9d9;
  font-size: 60px;
  display: inline-block;
  color: #afff4e;
  background-color: rgba(217, 217, 217, 0.5);
}

/*---- стрелки ----*/
.arrows {
  display: inline-block;
}

.arrow-1 {
  width: 80px;
  margin: 20px;
}

.arrow-1 div {
  position: absolute;
  width: 90px;
  height: 10px;
  background-color: rgba(122, 122, 122, 1);
}
.arrow-1 div::after {
  /* верхняя часть стрелки */
  content: '';
  position: absolute;
  width: 40px;
  height: 10px;
  top: -11px;
  right: -8px;
  background-color: rgba(122, 122, 122, 1);
  transform: rotate(45deg);
}
.arrow-1 div::before {
  /* нижняя часть стрелки */
  content: '';
  position: absolute;
  width: 40px;
  height: 10px;
  top: 11px;
  right: -8px;
  background-color: rgba(122, 122, 122, 1);
  transform: rotate(-45deg);
}

.arrow-2 {
  width: 80px;
  margin: 20px;
  margin-top: 80px;
}

.arrow-2 div {
  position: absolute;
  width: 90px;
  height: 10px;
  background-color: rgba(122, 122, 122, 1);
}
.arrow-2 div::after {
  /* нижняя часть стрелки */
  content: '';
  position: absolute;
  width: 40px;
  height: 10px;
  top: 11px;
  right: 58px;
  background-color: rgba(122, 122, 122, 1);
  transform: rotate(45deg);
}
.arrow-2 div::before {
  /* верхняя часть стрелки */
  content: '';
  position: absolute;
  width: 40px;
  height: 10px;
  top: -11px;
  right: 58px;
  background-color: rgba(122, 122, 122, 1);
  transform: rotate(-45deg);
}
</style>
