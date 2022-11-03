<template lang="pug">
  nav.main-menu(role="navigation" aria-label="Primary")
    NuxtLink.item(to="/") Hlavní stránka
    NuxtLink.item(to="/me-objekty") Mé objekty
    NuxtLink.item(to="/vsechny-objekty" v-show="zobrazitVsechnyObjekty") Všechny objekty
</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

  .main-menu
    text-align: center
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    background: #eee
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    z-index: 9

    .item
      margin-left: 10px
      border-left: 1px solid black
      padding-left: 10px

      &:first-child
        border-left: none
        padding-left: 0

</style>

<script>
export default {
    computed: {


      zobrazitVsechnyObjekty() {

        return this.$route.query.vse === '1';
      },

    },
}
</script>
