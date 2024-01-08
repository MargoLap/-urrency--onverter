<template>
  <h1 class="value-table">{{ tableValue }}</h1>
  <span class="icon-table" v-b-tooltip.hover :title="nameValute">{{
    tableIcon
  }}</span>
</template>

<script>
export default {
  name: 'TableString',
  props: ['tableValue', 'tableIcon', 'nameValute'],
};
</script>
