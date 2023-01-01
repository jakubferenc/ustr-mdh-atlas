<template lang="pug">
.catalog
  .grid
    <slot name="catalog-items"></slot>
</template>

<style lang="sass" scoped>
.catalog
  .grid
    display: grid
    grid-template-columns: repeat(auto-fill,minmax(24rem,1fr))
    grid-auto-rows: minmax(27rem, auto)
    grid-gap: 1.25rem
</style>
<script>
export default {
  data() {
    return {};
  },
  computed: {},

  methods: {},
};
</script>
