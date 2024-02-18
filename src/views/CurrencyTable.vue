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
    <div v-else class="table-valute">
      <table>
        <tr class="title-table1">
          <th>ЦЕНА В RUB</th>
          <th>ВАЛЮТА</th>
        </tr>
        <tr
          v-for="currency in info"
          :key="currency.id"
          :class="{ 'hide-string': !DistrToColumns(currency.SerialNum) }"
        >
          <td v-if="DistrToColumns(currency.SerialNum)" class="value-table">
            {{
              (
                Math.floor((currency.Value / currency.Nominal) * 100000) /
                100000
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
          <th>ЦЕНА В RUB</th>
          <th>ВАЛЮТА</th>
        </tr>
        <tr
          v-for="currency in info"
          :key="currency.id"
          :class="{ 'hide-string': DistrToColumns(currency.SerialNum) }"
        >
          <td v-if="!DistrToColumns(currency.SerialNum)" class="value-table">
            {{
              (
                Math.floor((currency.Value / currency.Nominal) * 100000) /
                100000
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
</template>

<script>
export default {
  name: 'CurrencyTable',
  props: ['loading', 'info', 'errored'],
  methods: {
    DistrToColumns(ind) {
      if (ind <= Object.keys(this.info).length / 2) return true;
      else return false;
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

  .update-button:hover {
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
    border-spacing: 10px 15px;
  }
  /*---- заголовки ----*/
  .title-table1 {
    font-size: 120%;
    color: #afff4e;
    text-align: center;
  }
  .title-table2 {
    font-size: 120%;
    color: #afff4e;
    text-align: center;
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
}
</style>
