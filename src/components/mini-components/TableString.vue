<template>
  <h1 class="value-table">{{ tableValue }}</h1>
  <h1 class="icon-table">{{ tableIcon }}</h1>
</template>

<script>
export default {
  name: 'TableString',
  props: ['tableValue', 'tableIcon'],
};
</script>
