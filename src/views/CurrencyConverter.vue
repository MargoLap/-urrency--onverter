<template>
  <!-- при нажатии на кнопку вызывается метод роутера который переходит по адресу объекта с именем Table -->
  <!-- нормальная переадресация через <a> -->
  <div class="button-block">
    <a href="/"> К ТАБЛИЦЕ </a>
  </div>
  <div>
    <div v-if="errored">
      <p class="error">
        К сожалению, в данный момент мы не можем получить эту информацию,
        повторите попытку позже
      </p>
    </div>
    <div v-else>
      <span v-if="loading" class="loader"></span>
      <div v-else class="converter-block">
        <div class="valute1">
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
        </div>
        <button class="arrows" @click="swapValute()"></button>
        <div class="valute2">
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
      </div>
    </div>
  </div>
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
@media (min-width: 1200px) {
  /*---- блок с конвертером ----*/
  .converter-block {
    margin-top: 10%;
    display: flex;
    justify-content: center;
  }

  .valute1 {
    display: flex;
    justify-content: flex-end;
  }

  /*---- поле цены ----*/
  .value-converter {
    width: 50%;
    height: 152px;
    margin: 0% 0% 0% 1%;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 60px;
    color: #1e1e1e;
    text-align: center;
    border-color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
  }

  .value-converter:focus {
    outline: none;
    border-color: #a2ff30;
    border-width: 3px;
  }

  /*---- поле валюты ----*/
  .icon-converter {
    width: 35%;
    height: 155px;
    margin: 0% 1% 0% 1%;
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
    border: none;
    width: 15%;
    box-shadow: none;
    background-image: url('../assets/reverse.png');
    background-size: contain;
    background-color: transparent;
    background-position: center;
    cursor: pointer;
    outline: none;
    background-repeat: no-repeat;
  }
}

@media (min-width: 300px) and (max-width: 1199.98px) {
  /*---- блок с конвертером ----*/
  .converter-block {
    margin-top: 20%;
    margin-left: 10%;
    margin-right: 10%;
  }

  /*---- поле цены ----*/
  .value-converter {
    width: 60%;
    height: 76px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 170%;
    color: #1e1e1e;
    text-align: center;
    border-color: #ffffffcc;
    font-weight: bold;
  }

  .value-converter:focus {
    outline: none;
    border-color: #a2ff30;
    border-width: 1.5px;
  }

  .valute1 {
    display: flex;
    justify-content: center;
  }

  .valute2 {
    display: flex;
    justify-content: center;
  }

  /*---- поле валюты ----*/
  .icon-converter {
    width: 30%;
    height: 80px;
    margin: 0% 0% 0% 5%;
    border-radius: 15px;
    background: #d9d9d9;
    font-size: 240%;
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
    border: none;
    width: 90px;
    height: 81px;
    margin-left: 70%;
    margin-top: 3%;
    margin-bottom: 3%;
    box-shadow: none;
    background-image: url('../assets/reverse.png');
    transform: rotate(90deg);
    background-size: contain;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    background-repeat: no-repeat;
  }
}
</style>
