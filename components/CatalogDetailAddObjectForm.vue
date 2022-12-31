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

      .slide(
        v-for="(ukolKey, index) in Object.keys(Prochazka.mapovaniUkolu)"
        v-if="refreshKey && validateToShow(ukolKey, Prochazka.mapovaniUkolu[ukolKey])"
        :key="index"
      )
        .content-container
          h1 {{Prochazka.mapovaniUkolu[ukolKey].title}}
          h2(v-if="hasSubtitle(Prochazka.mapovaniUkolu[ukolKey])")
            small {{ Prochazka.mapovaniUkolu[ukolKey].subtitle }}
          TaskGalerie(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'gallery'"
            :ZdrojeObjekt="Prochazka.mapovaniUkolu[ukolKey].sources"
            :Sloupce="Prochazka.mapovaniUkolu[ukolKey].columns"
            :Id="ukolKey"
          )
          TaskTextovePole(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'text'"
            @value="updateStore"
            :Id="ukolKey"
          )
          TaskMoznosti(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'array'"
            :Id="ukolKey"
            :Zadani="false"
            :MoznostiContainer="Prochazka.mapovaniUkolu[ukolKey].itemsObj"
            :Inline="Prochazka.mapovaniUkolu[ukolKey].inline"
            :Limit="Prochazka.mapovaniUkolu[ukolKey].limit"
            @value="updateStore"
          )
          TaskVyfotFoto(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'image'"
            :Id="ukolKey"
            :PocetFotek="Prochazka.mapovaniUkolu[ukolKey].photoCount"
            @value="updateStore"
          )
          TaskAudio(
            v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'audio'"
            :Id="ukolKey"
            @value="updateStore"
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
import { mapState } from 'vuex';
import TaskGalerie from './TaskGalerie.vue';

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
      refreshKey: 1,
    };
  },
  computed: {
    ...mapState({
      novy_objekt: 'novy_objekt',
    }),
  },
  watch: {
    novy_objekt: {
      initialize: true,
      handler(newVal) {
        newVal;
        this.refreshKey++;
      },
    },
  },
  methods: {
    updateStore({ id, answer }) {
      this.$store.dispatch('setNovyObjekt', {
        [id]: answer,
      });
    },
    emitSubmitHandler(e) {
      this.$emit('submit');
    },
    hasSubtitle(objectSlideDefinition) {
      return objectSlideDefinition?.subtitle;
    },
    validateToShow(ukolKey, objectSlideDefinition) {
      // if the slide is not conditioned by anything, show it

      let validations = [true];

      if (!objectSlideDefinition.hasOwnProperty('conditions')) {
        return true;
      }

      if (!Array.isArray(objectSlideDefinition.conditions))
        throw new Error('Conditions field for the slide definition must be an array');

      objectSlideDefinition.conditions.forEach((conditionObject) => {
        // the question ID is not in the vuex yet
        if (!this.novy_objekt[conditionObject.question]) {
          validations.push(false);
          return;
        }

        if (conditionObject.operator === 'not') {
          validations.push(
            this.novy_objekt[conditionObject.question] !== conditionObject.value
          );
          return;
        }
        if (conditionObject.operator === 'equal') {
          validations.push(
            this.novy_objekt[conditionObject.question] === conditionObject.value
          );
          return;
        }
        if (conditionObject.operator === 'in') {
          validations.push(
            this.novy_objekt[conditionObject.question].includes(conditionObject.value)
          );
          return;
        }
        if (conditionObject.operator === 'not_in') {
          validations.push(
            !this.novy_objekt[conditionObject.question].includes(conditionObject.value)
          );
          return;
        }
      });

      console.log('validations', validations);

      const makeUniqueValues = new Set(validations);

      // return true only if the validations were all true
      return !makeUniqueValues.has(false);
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
  components: { TaskGalerie },
};
</script>
