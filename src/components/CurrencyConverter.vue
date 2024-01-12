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
      <input
        class="value-converter"
        placeholder="0"
        @click="() => (calc1 = '')"
        @keyup="(e) => calcInput_1(e)"
        :value="calc1"
      />
      <form class="icon">
        <select
          class="icon-converter"
          :value="valute1"
          @change="(e) => onChange1(e)"
        >
          <option v-b-tooltip.hover title="Российский рубль">RUB</option>
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
      <button class="arrows" @click="swapValute()">
        <div class="arrow-1">
          <div></div>
        </div>
        <div class="arrow-2">
          <div></div>
        </div>
      </button>
      <input
        class="value-converter"
        placeholder="0"
        @click="() => (calc2 = '')"
        @keyup="(e) => calcInput_2(e)"
        :value="calc2"
      />
      <form class="icon">
        <select
          class="icon-converter"
          :value="valute2"
          @change="(e) => onChange2(e)"
        >
          <option
            v-for="currency in info"
            :key="currency.id"
            :value="currency.CharCode"
            v-b-tooltip.hover
            :title="currency.Name"
          >
            {{ currency.CharCode }}
          </option>
          <option v-b-tooltip.hover title="Российский рубль">RUB</option>
        </select>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  props: ['loading', 'info', 'errored'],
  data() {
    return {
      valute1: 'RUB',
      valute2: 'USD',
      calc1: '',
      calc2: '',
      firstInputSelected: true,
    };
  },

  methods: {
    onChange1(e) {
      this.valute1 = e.target.value; // смена валюты
      if (this.calc1 !== '') this.calcInput_1(this.calc1); // перерасчет, если это не первый выбор валюты
    },
    onChange2(e) {
      this.valute2 = e.target.value;
      if (this.calc2 !== '') this.calcInput_2(this.calc2);
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
    calcInput_1: function (e) {
      this.firstInputSelected = true; // введено в первый инпут
      this.calculate(e); // конвертируем значение для второго инпута
    },
    calcInput_2: function (e) {
      this.firstInputSelected = false; // введено во второй инпут
      this.calculate(e); // конвертируем значение для первого инпута
    },
    calculate: function (e) {
      if (e === this.calc1) {
        // если производится перерасчет
        var valueInput = this.calc1;
      } else if (e === this.calc2) {
        // если производится перерасчет
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
        // если ввлд в 1-ый инпут
        this.calc1 = valueInput;
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
      } else {
        // если ввлд во 2-ый инпут
        this.calc2 = valueInput;
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
  border: none;
  box-shadow: none;
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
