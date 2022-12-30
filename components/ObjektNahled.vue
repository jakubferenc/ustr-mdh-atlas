<template lang="pug">

.object-thumb.option.ui-widget__photo
  NuxtLink.ui-gallery__link.object-thumb-photo(:to="`/objekt/${Id}/`")
    .photo-ratio
      img(v-if="ObrazkyArray.length" :src="`${ObrazkyArray[0].realURL}`")
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

    img
      width: 100%
      height: 100%
      object-fit: cover
      position: absolute
      top: 0
      left: 0


  .object-thumb-photo
    background: lightgray
    position: relative
    display: block
    height: 0
    padding-top: 100%


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
  methods: {},
};
</script>
