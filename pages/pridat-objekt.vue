<template lang="pug">


.page-container

  <MainMenu />

  <NavigationBar :slideContainerSelector="'.page-slider'"  :slideContainerItemsSelector="'.slides'" :itemSelector="'.slide'" />

  .main-container


    .page-slider.slider
      .slides

        // Shared questions

        .slide
          .content-container
            h1 {{obsahAplikace.mapovaniUkolu['q00_01'].title}}
            <TaskTextovePole  :Id="'q00_01'" />

        // task
        .slide
          .content-container
            h1 {{obsahAplikace.mapovaniUkolu['q01_01'].title}}
            <TaskMoznosti :Id="'q01_01'" :Zadani="false" :MoznostiContainer="obsahAplikace.typObjektu" :Inline="false" :Limit="1" />

        // task

        .slide
          .content-container
            h1 {{obsahAplikace.mapovaniUkolu['q01_02'].title}}
            h2 Přečtěte si text, který předmět ve výstavě doprovází a v bodech si zapište poznámky o jeho účelu a minulosti.
            <TaskTextovePole  :Id="'q01_02'" />


        .slide
          .content-container
            h1 {{obsahAplikace.mapovaniUkolu['q01_03'].title}}
            h2 udělejte jednu fotku předmětu jako celku a pokud potřebujete přidejte fotky detailů (max 3 snímky)
            <TaskVyfotFoto  Id="q01_03" PocetFotek="3" />


        .slide
          .content-container
            h1 Shrnutí

            <TaskShrnuti :MapovaniUkolu="obsahAplikace.mapovaniUkolu" />



</template>

<style lang="sass">

</style>

<script>
import * as obsahAplikaceConfig from '../prochazky.config';

export default {

  layout: 'default',


  computed: {

    getSelectedMistoId () {

      if (this.$store.state.novy_objekt['q01_01']) {
        return obsahAplikaceConfig.typObjektu.items.filter(item => item.title == this.$store.state.novy_objekt?.['q01_01']?.[0])[0].id ;
      } else {
        return;
      }

    },


    getSelectedMistoTitle () {

      if (this.$store.state.novy_objekt['q01_01']) {
        return this.$store.state.novy_objekt?.['q01_01']?.[0];
      } else {
        return;
      }

    },

    // getGenderRoleIntentions() {
    //   return this.$store.state.novy_objekt['q01_06'];
    // },

    // getSelectedIntentionKeywords() {
    //   return this.$store.state.novy_objekt['q01_07'];
    // },

  },
  watch: {


    getSelectedIntentionKeywords (newData, oldData) {

      this.$nuxt.$emit('refresh-navigation');

      return newData;
    }
  },
  mounted() {


  },
  data() {
    return {
      title: 'Přidej objekt',
      obsahAplikace: obsahAplikaceConfig,
    }
  },
  head () {
    return {
      title: `${this.title} — ${this.$config.name}`,
      htmlAttrs: {
        class: 'with-top-nav'
      }
    }
  }
}
</script>
