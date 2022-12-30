<template lang="pug">

article.u-card(data-component="list-map-item" :class="thisComponentStyles")
  figure
    a(:href="`/prochazka/${Slug}/`")
      <img :src="require(`@/prochazky/${Slug}/${Image}`)" :alt="Name" />
    nav.list-map-nav.list-map-nav-symbols

    nav.list-map-nav.list-map-nav-actions.is-hidden
      .map-item-symbol
        //- img(src="~/assets/images/icons/icon-bookmark-large.svg")

  h3.typo-subtitle.list-map-item-title
    a(:href="`/prochazka/${Slug}/`") {{Name}}

  .u-card__description(v-if="Description")
    p {{ truncate(this.Description, {length: 150, omission: '...', separator: ' '})}}


</template>
<style lang="sass" scoped>
.u-card
  figure
    transition: color .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease
    will-change: transform,box-shadow

  &:hover
    figure
      box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 62%)
      -webkit-transform: translate3d(0,-0.5333333333rem,0)
      transform: translate3d(0,-0.5333333333rem,0)
</style>
<script>
import { truncate } from 'lodash';
export default {
  props: ['Id', 'Slug', 'Name', 'Image', 'Description'],

  async asyncData({ params, error, payload, store }) {},

  mounted() {},

  data() {
    return {
      thisComponentStyles: {},
      truncate,
    };
  },

  head() {
    return {};
  },
};
</script>
