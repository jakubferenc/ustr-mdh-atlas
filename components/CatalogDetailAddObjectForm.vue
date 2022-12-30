<template lang="pug">
.form-add-object-container

  NavigationBar(
    :slideContainerSelector="'.page-slider'"
    :slideContainerItemsSelector="'.slides'"
    :itemSelector="'.slide'"
  )

  .page-slider.slider
    .slides

      // Shared questions

      .slide(v-for="(ukolKey, index) in Object.keys(Prochazka.mapovaniUkolu)" :key="index")
        .content-container
          h1 {{Prochazka.mapovaniUkolu[ukolKey].title}}
          TaskTextovePole(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'text'"
            :Id="ukolKey"
          )
          TaskMoznosti(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'array'"
            :Id="ukolKey"
            :Zadani="false"
            :MoznostiContainer="Prochazka.mapovaniUkolu[ukolKey].itemsObj"
            :Inline="Prochazka.mapovaniUkolu[ukolKey].inline"
            :Limit="Prochazka.mapovaniUkolu[ukolKey].limit"
          )
          TaskVyfotFoto(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'image'"
            :Id="ukolKey"
            :PocetFotek="Prochazka.mapovaniUkolu[ukolKey].pocetFotek"
          )
          TaskAudio(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'audio'"
            :Id="ukolKey"
          )

      .slide
        .content-container
          h1 Shrnutí

          TaskShrnuti(
            :MapovaniUkolu="Prochazka.mapovaniUkolu"
            @submit="emitSubmitHandler"
          )

</template>

<style lang="sass" scoped>
.form-add-object-container
  padding-bottom: $top-bar-height
</style>

<script>
export default {
  props: {
    Prochazka: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      title: 'Přidej objekt',
    };
  },
  methods: {
    emitSubmitHandler(e) {
      this.$emit('submit');
    },
  },
  head() {
    return {
      title: `${this.title} — ${this.$config.name}`,
      htmlAttrs: {
        class: 'page--prochazka',
      },
    };
  },
};
</script>
