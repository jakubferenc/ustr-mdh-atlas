<template lang="pug">
.not-found
  .not-found__content
    .not-found__content-in
      .not-found__text {{ Text }}
      .not-found__link(v-if="Link")
        NuxtLink.button(:to="Link") Klikněte zde
</template>
<style lang="sass" scoped>
.not-found
  margin-left: auto
  margin-right: auto
  display: flex
  position: relative
  max-width: 1140px
  max-height: 1140px

  +from($desktop)
    width: 50%

  &__content
    padding-top: 100%
    width: 100%

  &__content-in
    padding: 15px
    background: lightgray
    justify-content: center
    align-items: center
    border-radius: 12px
    display: flex
    flex-direction: column
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  &__text
    text-align: center
    @extend %typo-subtitle
  &__link
    display: flex
    align-items: center
    justify-content: center
</style>
<script>
import { truncate } from 'lodash';
export default {
  props: ['Text', 'Link'],

  mounted() {},

  data() {
    return {};
  },

  head() {
    return {};
  },
};
</script>
