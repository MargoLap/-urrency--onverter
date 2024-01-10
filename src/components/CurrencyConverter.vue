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
      <input class="value-converter" type="string" placeholder="0" />
      <form class="icon">
        <select class="icon-converter">
          <option
            v-for="currency in info"
            :key="currency.id"
            :value="currency.CharCode"
            v-b-tooltip.hover
            :title="currency.Name"
          >
            {{ currency.CharCode }}
          </option>
        </select>
      </form>
      <div class="arrows">
        <div class="arrow-1">
          <div></div>
        </div>
        <div class="arrow-2">
          <div></div>
        </div>
      </div>
      <input class="value-converter" type="string" placeholder="0" />
      <form class="icon">
        <select class="icon-converter">
          <option
            v-for="currency in info"
            :key="currency.id"
            :value="currency.CharCode"
            v-b-tooltip.hover
            :title="currency.Name"
          >
            {{ currency.CharCode }}
          </option>
        </select>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  props: ['loading', 'info', 'errored'],
  data() {},
  methods: {},
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
  height: 150px;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 60px;
  display: inline-block;
  color: #1e1e1e;
  text-align: center;
  border-color: rgba(255, 255, 255, 0.8);
  display: inline-block;

  font-weight: bold;
}

.value-converter:focus {
  outline: none;
  border-color: #a2ff30;
  border-width: 3px;
}

/*---- поле валюты ----*/
.icon {
  display: inline-block;
}
.icon-converter {
  width: 200px;
  height: 155px;
  margin-right: 15px;
  border-radius: 25px;
  background: #d9d9d9;
  font-size: 60px;
  font-weight: bold;
  color: #afff4e;
  background-color: rgba(217, 217, 217, 0.5);
  cursor: pointer;
  text-align: center;
  appearance: none; /* убрать стрелку у выбора валют */
}

.icon-converter:focus {
  outline: none;
  border-color: #a2ff30;
  border-width: 3px;
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
