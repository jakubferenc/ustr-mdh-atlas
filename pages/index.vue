<template lang="pug">

.content-container

  <MainMenu />

  h1.typo-main-title {{$t('title')}}:&nbsp;
    small {{$t('subtitle')}}

  .grid.grid-2.dashboard-container
    NuxtLink.ui-card(to="/pridat-objekt")
      span.text Přidat objekt (+)

    NuxtLink.ui-card(to="/me-objekty")
      span.text Seznam mých objektů

    NuxtLink.ui-card(to="/vsechny-objekty" v-show="zobrazitVsechnyObjekty")
      span.text Seznam všech objektů v aplikaci


</template>

<style lang="sass">

.dashboard-container
  margin: 2rem 0

  .ui-card
    font-size: clamp(1.5rem, 2vw, 2rem)
    color: black

.red
  color: red
</style>

<script>
export default {
  layout: "homepage",

  computed: {
    zobrazitVsechnyObjekty() {
      return this.$route.query.vse === "1";
    },
  },

  data() {
    return {
      title: "Hello world!!!",
    };
  },
};
</script>
