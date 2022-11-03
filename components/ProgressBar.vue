<template lang="pug">

    .ui-widget__overlay
      .content {{Zprava}}

</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

</style>

<script>
export default {
    props: ['Zprava'],


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
