<template>
  <h1 class="value-table">
    {{ (Math.floor((tableValue / tableNominal) * 100000) / 100000).toFixed(5) }}
  </h1>
  <span class="icon-table" v-b-tooltip.hover :title="nameValute">{{
    tableIcon
  }}</span>
</template>

<script>
export default {
  name: 'TableString',
  props: ['tableValue', 'tableNominal', 'tableIcon', 'nameValute'],
  methods: {
    // fixLenght(value, nominal) {
    //   let result = (value / nominal).toString();
    //   return result.replace(/^[0-9.]+$/);
    // },
  },
};
</script>

<style scoped>
.value-table {
  width: 300px;
  height: 71px;
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 20px;
  font-size: 35px;
  display: inline-block;
  cursor: default;
  color: #1e1e1e;
}

.icon-table {
  width: 180px;
  height: 81px;
  margin-top: 25px;
  margin-left: 30px;
  margin-bottom: 25px;
  border-radius: 25px;
  background-color: rgba(217, 217, 217, 0.5);
  padding-top: 10px;
  position: absolute;
  font-size: 50px;
  color: #afff4e;
  display: inline-block;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}
</style>
