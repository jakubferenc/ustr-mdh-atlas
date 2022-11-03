<template lang="pug">

  .page-container

    <MainMenu />

    .content-container()


      h1.page-title.typo-main-title Všechny objekty v aplikaci

      .section-container(v-for="(typObjektuItem, index) in obsahAplikaceConfig.typObjektu.items" :key="index")

        h2.section-title {{typObjektuItem.title}}

        .list-container.columns.is-multiline
          <ObjektNahled v-if="objekt.misto === typObjektuItem.title " :Id="objekt.id" :Timestamp="objekt.timestamp" :Misto="objekt.misto" :Uzivatel="objekt.uzivatelske_jmeno" :ObrazekSrc="objekt.obrazky" v-for="(objekt, index) in objekty" :key="index" />



</template>

<style lang="sass">

</style>

<script>
import * as obsahAplikaceConfigObj from '../prochazky.config';

export default {

  async fetch ({store}) {
    await store.dispatch("getVsechnyObjekty");
  },

  mounted() {

  },

  computed: {

    obsahAplikaceConfig() {

      return obsahAplikaceConfigObj;

    },

    loading() {
      return this.$store.state.loading;
    },

    objekty() {
      return this.$store.state.objekty;
    }

  },

  data() {
    return {
      title: ''
    }
  }
}
</script>
