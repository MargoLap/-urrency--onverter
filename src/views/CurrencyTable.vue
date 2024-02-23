<template>
  <!-- нормальная переадресация через <a> -->
  <div class="button-block">
    <button class="update-button" @click="$router.go()"></button>
    <a class="to-another-page" href="/converter">КОНВЕРТЕР</a>
  </div>
  <div v-if="errored">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </div>
  <div v-else>
    <span v-if="loading" class="loader"></span>
    <div v-else>
      <h1 class="advice">ВЫБЕРЕТЕ ВАЛЮТУ</h1>
      <div class="valute-selection">
        <select
          class="icon-valute"
          :value="valute.CharCode"
          @change="(e) => changeValute(e)"
        >
          <option
            class="option-valute"
            v-for="currency in info"
            :key="currency.id"
            :value="currency.CharCode"
            v-b-tooltip.hover
            :title="currency.Name"
          >
            {{
              isSingleCurrencySelected(currency)
                ? currency.CharCode
                : `${currency.CharCode} ${currency.Name}`
            }}
          </option>
        </select>
      </div>
      <div class="table-valute">
        <table>
          <tr class="title-table1">
            <th>{{ `ЦЕНА В ${valute.CharCode}` }}</th>
            <th>ВАЛЮТА</th>
          </tr>
          <tr
            v-for="currency in info"
            :key="currency.id"
            :class="{
              'hide-string':
                !DistrToColumns(currency.SerialNum) ||
                CheckValute(currency.CharCode),
            }"
          >
            <td v-if="DistrToColumns(currency.SerialNum)" class="value-table">
              {{
                (
                  Math.floor(
                    ((1 * currency.Nominal * currency.Value) /
                      (valute.Nominal * valute.Value)) *
                      100000
                  ) / 100000
                ).toFixed(5)
              }}
            </td>
            <td
              v-if="DistrToColumns(currency.SerialNum)"
              v-b-tooltip.d5
              :title="currency.Name"
              class="icon-table"
            >
              {{ currency.CharCode }}
            </td>
          </tr>
        </table>
        <table>
          <tr class="title-table2">
            <th>{{ `ЦЕНА В ${valute.CharCode}` }}</th>
            <th>ВАЛЮТА</th>
          </tr>
          <tr
            v-for="currency in info"
            :key="currency.id"
            :class="{
              'hide-string':
                DistrToColumns(currency.SerialNum) ||
                CheckValute(currency.CharCode),
            }"
          >
            <td v-if="!DistrToColumns(currency.SerialNum)" class="value-table">
              {{
                (
                  Math.floor(
                    ((1 * currency.Nominal * currency.Value) /
                      (valute.Nominal * valute.Value)) *
                      100000
                  ) / 100000
                ).toFixed(5)
              }}
            </td>
            <td
              v-if="!DistrToColumns(currency.SerialNum)"
              v-b-tooltip.d5
              :title="currency.Name"
              class="icon-table"
            >
              {{ currency.CharCode }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyTable',
  props: ['loading', 'info', 'errored'],
  data() {
    return {
      valute: {
        ID: 'R09409F',
        NumCode: '673',
        CharCode: 'RUB',
        Nominal: 1,
        Name: 'Российский рубль',
        Value: 1,
        Previous: 1,
        SerialNum: 44,
      },
    };
  },
  methods: {
    DistrToColumns(ind) {
      //чтобы второй столбец содержал меньше валют (так логичнее)
      if (this.valute.SerialNum <= Object.keys(this.info).length / 2) {
        if (ind <= Object.keys(this.info).length / 2 + 1) return true;
        else return false;
      } else {
        if (ind <= Object.keys(this.info).length / 2) return true;
        else return false;
      }
    },
    changeValute(e) {
      for (let key in this.info) {
        if (e.target.value === this.info[key].CharCode) {
          this.valute = this.info[key]; // смена валюты
        }
      }
    },
    CheckValute(e) {
      if (e == this.valute.CharCode) {
        return true;
      } else return false;
    },
    isSingleCurrencySelected(currency) {
      return this.valute.CharCode === currency.CharCode;
    },
  },
};
</script>

<style scoped>
@media (min-width: 1200px) {
  /*---- кнопка обновления ----*/
  .update-button {
    width: 10%;
    height: auto;
    margin-right: 1%;
    background-image: url('../assets/update.png'); /* картинка на фон */
    background-position: center; /* отцентрировать фон */
    background-repeat: no-repeat; /* не повторять картинку фона для заполнения всего объема кнопки */
    background-color: transparent; /* прозрачный фон */
    border: 3px solid #b6f865; /* рамка */
    border-radius: 25px; /* скругление рамки */
    box-shadow: 0px 0px 6px 0px #b6f865; /* свечение */
    cursor: pointer; /* смена курсора при наведении */
  }

  .update-button:hover {
    box-shadow: 0px 0px 20px 0px #b6f865; /* свечение */
  }

  /*---- блок с таблицей ----*/
  .table-valute {
    margin-top: 5%;
    margin-bottom: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  table {
    border-spacing: 40px 20px;
  }
  /*---- заголовки ----*/
  .title-table1 {
    font-size: 45px;
    color: #afff4e;
    text-align: center;
  }

  .title-table2 {
    font-size: 45px;
    color: #afff4e;
    text-align: center;
  }

  .value-table {
    width: 100%;
    height: 90px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 35px;
    text-align: center;
    cursor: default;
    color: #1e1e1e;
    font-weight: bold;
  }

  .hide-string {
    display: none;
  }

  .icon-table {
    width: 50%;
    border-radius: 25px;
    background-color: rgba(217, 217, 217, 0.5);
    font-size: 50px;
    color: #afff4e;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    cursor: default;
    text-align: center;
  }

  .advice {
    margin-top: 6%;
    text-align: center;
    font-size: 300%;
    color: #afff4e;
  }

  .valute-selection {
    margin-top: 1%;
    display: flex;
    justify-content: center;
  }

  .icon-valute {
    width: 25%;
    height: 100px;
    position: center;
    border-radius: 25px;
    background: #d9d9d9;
    font-size: 300%;
    font-weight: bold;
    color: #afff4e;
    background-color: rgba(217, 217, 217, 0.5);
    cursor: pointer;
    text-align: center;
    appearance: none; /* убрать стрелку у выбора валют */
  }

  .icon-valute:focus {
    outline: none;
    border-color: #a2ff30;
    border-width: 3px;
    /* text-align: left; */
  }

  .option-valute {
    color: #7a7a7a;
    background-color: #1e1e1e;
    font-size: 100%;
  }
}

@media (min-width: 300px) and (max-width: 1199.98px) {
  /*---- кнопка обновления ----*/
  .update-button {
    width: 15%;
    height: auto;
    margin-right: 3%;
    background-image: url('../assets/update.png'); /* картинка на фон */
    background-size: 100%;
    background-position: center; /* отцентрировать фон */
    background-repeat: no-repeat; /* не повторять картинку фона для заполнения всего объема кнопки */
    background-color: transparent; /* прозрачный фон */
    border: 2px solid #b6f865; /* рамка */
    border-radius: 15px; /* скругление рамки */
    box-shadow: 0px 0px 5px 0px #b6f865; /* свечение */
    cursor: pointer; /* смена курсора при наведении */
  }

  .update-button:active {
    box-shadow: 0px 0px 15px 0px #b6f865; /* свечение */
  }

  /*---- блок с таблицей ----*/
  .table-valute {
    margin-top: 5%;
    margin-bottom: 20%;
    margin-right: 15%;
    margin-left: 15%;
  }

  table {
    border-spacing: 10px;
    border-collapse: separate;
    margin: -10px;
  }

  /*---- заголовки ----*/
  .title-table1 {
    font-size: 105%;
    color: #afff4e;
    text-align: center;
  }
  .title-table2 {
    display: none;
  }

  .value-table {
    width: 35%;
    border-radius: 15px;
    margin-left: 20%;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 130%;
    text-align: center;
    cursor: default;
    color: #1e1e1e;
    font-weight: bold;
  }

  .hide-string {
    display: none;
  }

  .icon-table {
    width: 20%;
    height: 60px;
    border-radius: 15px;
    background-color: rgba(217, 217, 217, 0.5);
    font-size: 200%;
    color: #afff4e;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    cursor: default;
    text-align: center;
    align-items: center;
  }

  .advice {
    margin-top: 6%;
    text-align: center;
    font-size: 150%;
  }

  .valute-selection {
    margin-top: 1%;
    display: flex;
    justify-content: center;
  }

  .icon-valute {
    width: 50%;
    height: 65px;
    position: center;
    border-radius: 15px;
    background: #d9d9d9;
    font-size: 200%;
    font-weight: bold;
    color: #afff4e;
    background-color: rgba(217, 217, 217, 0.5);
    cursor: pointer;
    text-align: center;
    appearance: none; /* убрать стрелку у выбора валют */
  }

  .icon-valute:focus {
    outline: none;
    border-color: #a2ff30;
    border-width: 2px;
  }

  .option-valute {
    color: #7a7a7a;
    background-color: #1e1e1e;
  }
}
</style>
