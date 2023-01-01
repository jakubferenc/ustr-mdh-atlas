<template lang="pug">

article.u-card(data-component="list-map-item" :class="thisComponentStyles" :style="`background-color: ${Color}`")
  a(:href="`/prochazka/${Slug}/`")
    figure.u-card__figure
      <img :src="require(`@/prochazky/${Slug}/${Image}`)" :alt="Name" />
      nav.list-map-nav.list-map-nav-symbols

      nav.list-map-nav.list-map-nav-actions.is-hidden
        .map-item-symbol
          //- img(src="~/assets/images/icons/icon-bookmark-large.svg")
    header.u-card__header
      h3.typo-subtitle.list-map-item-title
        a(:href="`/prochazka/${Slug}/`") {{Name}}

      .u-card__authors(v-if="Authors")
        p autoři: {{ getAuthorsAsString(Authors) }}


      .u-card__description(v-if="Description")
        p {{ truncate(this.Description, {length: 150, omission: '...', separator: ' '})}}


</template>
<style lang="sass" scoped>
.u-card
  position: relative
  transition: color .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease
  will-change: transform,box-shadow
  border-radius: 12px
  overflow: hidden
  background: rgb(78,83,94)

  &:hover
    box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 62%)
    -webkit-transform: translate3d(0,-0.5333333333rem,0)
    transform: translate3d(0,-0.5333333333rem,0)

  &__header
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: flex-end
    padding: .75rem

    &, a
      color: rgba(255,255,255,.95)

  &__authors,
  &__description
    font-size: .8rem

  &__authors
    margin-bottom: 1em
    margin-top: .25em
    p
      margin-bottom: 0

  figure
    width: 100%
    height: 100%
    object-fit: cover
    border-radius: 12px
    overflow: hidden
    opacity: .2
    max-height: 350px
</style>
<script>
import { truncate } from 'lodash';
export default {
  props: ['Id', 'Slug', 'Name', 'Image', 'Description', 'Authors', 'Color', 'Type'],

  async asyncData({ params, error, payload, store }) {},

  mounted() {},
  methods: {
    getAuthorsAsString(authorsArray) {
      return authorsArray.join(', ');
    },
  },
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
