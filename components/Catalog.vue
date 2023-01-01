<template lang="pug">
.catalog(:class="{[Type]: true}")
  .grid
    <slot name="catalog-items"></slot>
</template>

<style lang="sass" scoped>
.catalog
  .grid
    display: grid
    grid-auto-rows: minmax(24rem, auto)
    grid-gap: 1.25rem
    grid-template-columns: repeat(auto-fill,minmax(24rem,1fr))

  &.objekty
    .grid
      +until($desktop)
        grid-template-columns: repeat(auto-fill,minmax(18rem,1fr))
        grid-auto-rows: minmax(18rem, auto)
</style>
<script>
export default {
  props: {
    Type: {
      type: [Boolean, String],
      required: false,
      default: 'general',
    },
  },
  data() {
    return {};
  },
  computed: {},

  methods: {},
};
</script>
