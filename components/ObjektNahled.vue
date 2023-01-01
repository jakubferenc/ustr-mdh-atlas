<template lang="pug">

.object-thumb.option.ui-widget__photo
  NuxtLink.ui-gallery__link.object-thumb-photo(:to="`/objekt/${Id}/`")
    .photo-ratio
      img(v-if="hasImages()" :src="`${ObrazkyArray[0].realURL}`")
  .header
    span.title {{Misto}}
  .metadata
    .username {{Uzivatel}}
    .timestamp {{Timestamp}}
  .actions.hidden
    input(type='checkbox').select


</template>

<style lang="sass" scoped>


.object-thumb
  .photo-ratio
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  .object-thumb-photo
    background: lightgray
    position: relative
    display: block
    height: 0
    padding-top: 100%
    will-change: transform,box-shadow
    border-radius: 12px
    transition: color .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease

    &:hover
      box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 62%)
      -webkit-transform: translate3d(0,-0.5333333333rem,0)
      transform: translate3d(0,-0.5333333333rem,0)

    img
      width: 100%
      height: 100%
      object-fit: cover
      position: absolute
      top: 0
      left: 0
      border-radius: 12px


  .title
    font-weight: bold
</style>

<script>
export default {
  props: ['Misto', 'Uzivatel', 'ObrazkyArray', 'Timestamp', 'Id'],

  computed: {},
  data() {
    return {
      answer: '',
    };
  },
  mounted() {},

  watch: {},
  methods: {
    hasImages() {
      return this.ObrazkyArray.length;
    },
  },
};
</script>
