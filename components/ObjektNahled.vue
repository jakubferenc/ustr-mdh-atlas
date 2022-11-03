<template lang="pug">

  .object-thumb.option.ui-widget__photo.column.is-half.is-one-third-desktop.is-one-quarter-fullhd
    NuxtLink.ui-gallery__link.object-thumb-photo(:to="`/objekt/${Id}/`")
      img(v-if="ObrazkyArray.length" :src="`${ObrazkyArray[0].realURL}`")
    .header
      span.title {{Misto}}
    .metadata
      span.username {{Uzivatel}} |&nbsp;
      span.timestamp {{Timestamp}}
    span.actions.hidden
      input(type='checkbox').select


</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

  $object_thumb_size: 300px

  .object-thumb

    .object-thumb-photo
      background: lightgray
      width: $object_thumb_size
      height: $object_thumb_size
      display: block

      img
        width: 100%
        height: 100%
        object-fit: cover

    .title
      font-weight: bold


</style>

<script>
export default {
    props: ['Misto', 'Uzivatel', 'ObrazkyArray', 'Timestamp', 'Id'],


    computed: {

    },
    data() {
      return {
        answer: ''
      }
    },
    mounted() {

    },

  watch: {

  },
  methods: {



  }


}
</script>
