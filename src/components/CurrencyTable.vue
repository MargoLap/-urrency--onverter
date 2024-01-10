<template>
  <button class="to-another-page" @click="$router.push({ name: 'Converter' })">
    КОНВЕРТЕР
  </button>
  <button class="update-button" @click="$router.go()"></button>
  <br class="clearer" />
  <section v-if="errored === true">
    <p class="error">
      К сожалению, в данный момент мы не можем получить эту информацию,
      повторите попытку позже
    </p>
  </section>
  <section v-else>
    <p class="message">КУРСЫ ВАЛЮТ В RUB</p>
    <span v-if="loading === true" class="loader"></span>
    <div v-else class="table-strings">
      <div v-for="currency in info" :key="currency.id">
        <TableString
          :tableValue="currency.Value"
          :tableNominal="currency.Nominal"
          :tableIcon="currency.CharCode"
          :nameValute="currency.Name"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TableString from './mini-components/TableString.vue';

export default {
  name: 'CurrencyTable',
  components: { TableString },
  props: ['loading', 'info', 'errored'],
};
</script>

<style scoped>
/*---- кнопка обновления ----*/
.update-button {
  width: 140px;
  height: 100px;
  margin-top: 50px;
  margin-right: 20px;
  float: right; /* прижать вправо */
  background-image: url('../pictures/update.png'); /* картинка на фон */
  background-position: center; /* отцентрировать фон */
  background-repeat: no-repeat; /* не повторять картинку фона для заполнения всего объема кнопки */
}

/*---- блок со строками валют в таблице ----*/
.table-strings {
  margin-top: 50px;
  margin-left: 17%;
  margin-bottom: 250px;
  display: grid; /* задает сетку */
  grid-template-columns: 570px 520px; /* задает количество и ширину столбцов */
}
</style>
