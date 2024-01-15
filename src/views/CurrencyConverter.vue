<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <!-- нормальная переадресация через <a> -->
  <a class="to-another-page" href="/"> К ТАБЛИЦЕ </a>
  <br class="clearer" />
  <section v-if="errored">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </section>
  <section v-else>
    <span v-if="loading" class="loader"></span>
    <div v-else class="converter-strings">
      <input
        type="text"
        class="value-converter"
        placeholder="0"
        @keyup="(e) => calcInput1(e)"
        :value="calc1"
        @input="filterInput1"
        maxlength="8"
      />
      <select
        class="icon-converter"
        :value="valute1"
        @change="(e) => changeValute1(e)"
      >
        <option
          class="option-valute"
          v-for="currency in info"
          :key="currency.id"
          :value="currency.CharCode"
          v-b-tooltip.hover
          :title="currency.Name"
        >
          {{ currency.CharCode }}
        </option>
      </select>
      <button class="arrows" @click="swapValute()"></button>
      <input
        type="text"
        class="value-converter"
        placeholder="0"
        @keyup="(e) => calcInput2(e)"
        @input="filterInput2"
        maxlength="8"
        :value="calc2"
      />
      <select
        class="icon-converter"
        :value="valute2"
        @change="(e) => changeValute2(e)"
      >
        <option
          class="option-valute"
          v-for="currency in info"
          :key="currency.id"
          :value="currency.CharCode"
          v-b-tooltip.hover
          :title="currency.Name"
        >
          {{ currency.CharCode }}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  props: ['loading', 'info', 'errored'],
  data() {
    return {
      valute1: 'USD',
      valute2: 'RUB',
      calc1: '',
      calc2: '',
      firstInputSelected: true,
    };
  },

  methods: {
    // нормальные имена функций
    changeValute1(e) {
      this.valute1 = e.target.value; // смена валюты
      if (this.calc1 !== '') this.calcInput1(this.calc1); // перерасчет, если это не первый выбор валюты
    },
    changeValute2(e) {
      this.valute2 = e.target.value;
      if (this.calc2 !== '') this.calcInput2(this.calc2);
    },
    swapValute() {
      // меняем местави валюты вместе с их значениями
      let tmp = this.valute1;
      this.valute1 = this.valute2;
      this.valute2 = tmp;
      tmp = this.calc1;
      this.calc1 = this.calc2;
      this.calc2 = tmp;
    },
    calcInput1: function (e) {
      this.firstInputSelected = true; // введено в первый инпут
      this.calculate(e); // конвертируем значение для второго инпута
    },
    calcInput2: function (e) {
      this.firstInputSelected = false; // введено во второй инпут
      this.calculate(e); // конвертируем значение для первого инпута
    },
    calculate: function (e) {
      if (e === this.calc1) {
        // если производится перерасчет для другой валюты
        var valueInput = this.calc1;
      } else if (e === this.calc2) {
        // если производится перерасчет для другой валюты
        valueInput = this.calc2;
      } else {
        valueInput = e.target.value; // значение которое ввели в input
      }
      if (isNaN(valueInput)) {
        this.calc2 = '';
        this.calc1 = '';
        return;
      }
      if (this.firstInputSelected) {
        // если ввод в 1-ый инпут
        this.calc1 = valueInput;
        if (this.calc1 === '')
          //чтобы при пустом вводе на соседнем поле не появлялось значение ноль
          this.calc2 = '';
        else {
          for (let elem1 in this.info) {
            if (this.info[elem1].CharCode === this.valute1) {
              // определяем первую валюту
              for (let elem2 in this.info) {
                if (this.info[elem2].CharCode === this.valute2) {
                  // определяем вторую валюту
                  let c =
                    (valueInput *
                      this.info[elem1].Nominal *
                      this.info[elem1].Value) /
                    (this.info[elem2].Nominal * this.info[elem2].Value);

                  this.calc2 = Math.floor(c * 100) / 100;
                }
              }
            }
          }
        }
      } else {
        // если ввод во 2-ый инпут
        this.calc2 = valueInput;
        if (this.calc2 === '')
          //чтобы при пустом вводе на соседнем поле не появлялось значение ноль
          this.calc1 = '';
        else {
          for (let elem1 in this.info) {
            if (this.info[elem1].CharCode === this.valute1) {
              for (let elem2 in this.info) {
                if (this.info[elem2].CharCode === this.valute2) {
                  let c =
                    (valueInput *
                      this.info[elem2].Nominal *
                      this.info[elem2].Value) /
                    (this.info[elem1].Nominal * this.info[elem1].Value);
                  this.calc1 = Math.floor(c * 100) / 100;
                }
              }
            }
          }
        }
      }
    },
    filterInput1: function (e) {
      if (this.calc1 === '') {
        if (e.target.value.match(/[^1-9]/g)) {
          e.target.value = e.target.value.replace(/[^1-9]/g, '');
        }
      } else {
        if (e.target.value.match(/[^0-9]/g)) {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
      }
    },
    filterInput2: function (e) {
      if (this.calc2 === '') {
        if (e.target.value.match(/[^1-9]/g)) {
          e.target.value = e.target.value.replace(/[^1-9]/g, '');
        }
      } else {
        if (e.target.value.match(/[^0-9]/g)) {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
      }
    },
  },
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

.option-valute {
  color: #7a7a7a;
  background-color: #1e1e1e;
}

/*---- стрелки ----*/
.arrows {
  width: 200px;
  height: 150px;
  border: none;
  box-shadow: none;
  background-color: transparent;
  background-image: url('../assets/reverse.png');
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
