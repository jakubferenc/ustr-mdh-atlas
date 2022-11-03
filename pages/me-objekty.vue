<template lang="pug">

  .page-container

    <MainMenu />

    .content-container


      h1.page-title.typo-main-title Mé objekty v aplikaci

      .user-form

        input(type="text" placeholder="Vaše uživatelské jméno" v-model.trim="prihlaseny_uzivatel")

      .section-category()
        .list-container.columns.is-multiline
          ObjektNahled(
            v-for="(objekt, index) in objekty"
            :key="objekt.id"
            :Id="objekt.id"
            :Timestamp="objekt.timestamp"
            :Uzivatel="objekt.uzivatelske_jmeno"
            :ObrazkyArray="objekt.obrazky[0].items"
          )




</template>

<style lang="sass">


  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .section-category
    margin-bottom: 1.5em

  .user-form
    margin-bottom: 2rem
    input
      width: 100%
      height: 50px
      border: 1px solid black

      +from($tablet)


      +from($desktop)
        width: 50%

      +from($widescreen)

      +from($fullhd)


</style>

<script>

export default {

  // call fetch only on client-side
  fetchOnServer: false,


  async beforeMount() {
    await this.$store.dispatch('setLoading', {
      isLoading: true,
      message: 'Načítám...',
    });
    await this.$store.dispatch('getVsechnyObjekty');
    await this.$store.dispatch('setLoading', {
      isLoading: false,
      message: false,
    });
  },

  mounted() {

  },

  computed: {

    prihlaseny_uzivatel: {

      get () {
        return this.$store.state.prihlaseny_uzivatel;
      },

      set (value) {
        this.$store.dispatch('setPrihlasenyUzivatel', value)
      }

    },

    loading() {
      return this.$store.state.loading;
    },

    objekty() {

      return this.$store.state.objekty.filter(item => item.uzivatelske_jmeno === this.prihlaseny_uzivatel);


    }

  },

  data() {
    return {
      title: ''
    }
  }
}
</script>
