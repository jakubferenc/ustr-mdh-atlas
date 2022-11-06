<template lang="pug">


.page-container

  <MainMenu />

  <NavigationBar :slideContainerSelector="'.page-slider'"  :slideContainerItemsSelector="'.slides'" :itemSelector="'.slide'" />

  .main-container


    .page-slider.slider
      .slides

        // Shared questions

        .slide(v-for="(ukolKey, index) in Object.keys(obsahAplikace.mapovaniUkolu)" :key="index")
          .content-container
            h1 {{obsahAplikace.mapovaniUkolu[ukolKey].title}}
            TaskTextovePole(
              v-if="obsahAplikace.mapovaniUkolu[ukolKey].type === 'text'"
              :Id="ukolKey"
            )
            TaskMoznosti(
              v-if="obsahAplikace.mapovaniUkolu[ukolKey].type === 'array'"
              :Id="ukolKey"
              :Zadani="false"
              :MoznostiContainer="obsahAplikace.mapovaniUkolu[ukolKey].itemsObj"
              :Inline="obsahAplikace.mapovaniUkolu[ukolKey].inline"
              :Limit="obsahAplikace.mapovaniUkolu[ukolKey].limit"
            )
            TaskVyfotFoto(
              v-if="obsahAplikace.mapovaniUkolu[ukolKey].type === 'image'"
              :Id="ukolKey"
              :PocetFotek="obsahAplikace.mapovaniUkolu[ukolKey].pocetFotek"
            )
            TaskAudio(
              v-if="obsahAplikace.mapovaniUkolu[ukolKey].type === 'audio'"
              :Id="ukolKey"
            )

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

  watch: {

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
