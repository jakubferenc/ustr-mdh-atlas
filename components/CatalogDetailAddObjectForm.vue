<template lang="pug">
.form-add-object-container

  NavigationBar(
    v-if="slidesContainerElement"
    :sliderContainerRef="$refs.sliderContainer"
    :slideContainerItemsRef="$refs.slidesContainer"
    :itemSelector="'.slide'"
    :size="novyObjektSize"
  )

  .page-slider.slider(ref="sliderContainer")
    .slides(ref="slidesContainer")

      // Shared questions
      template(v-for="(ukolKey, index) in Object.keys(Prochazka.mapovaniUkolu)")

        .slide(
          v-if="refreshKey && !isDynamic(Prochazka.mapovaniUkolu[ukolKey]) && validateToShow(ukolKey, Prochazka.mapovaniUkolu[ukolKey])"
        )
          .content-container
            h1 {{Prochazka.mapovaniUkolu[ukolKey].title}}
            h2(v-if="hasSubtitle(Prochazka.mapovaniUkolu[ukolKey])")
              small {{ Prochazka.mapovaniUkolu[ukolKey].subtitle }}
            TaskGalerie(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'gallery'"
              :ZdrojeObjekt="Prochazka.mapovaniUkolu[ukolKey].sources"
              :Sloupce="Prochazka.mapovaniUkolu[ukolKey].columns"
              :ProchazkaPath="`/prochazky/${Prochazka.slug}`"
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

        .slide(
          v-if="refreshKey && isDynamic(Prochazka.mapovaniUkolu[ukolKey], ukolKey) && Array.isArray([Prochazka.mapovaniUkolu[ukolKey].dynamicBasedOn]) && validateToShow(ukolKey, Prochazka.mapovaniUkolu[ukolKey])"
          v-for="(dynamicValue, indexDynamicKey) in novy_objekt[Prochazka.mapovaniUkolu[ukolKey].dynamicBasedOn]"
        )
          .content-container
            h1 {{Prochazka.mapovaniUkolu[ukolKey].title}}: {{ dynamicValue }}
            h2(v-if="hasSubtitle(Prochazka.mapovaniUkolu[ukolKey])")
              small {{ Prochazka.mapovaniUkolu[ukolKey].subtitle }}
            TaskGalerie(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'gallery'"
              :ZdrojeObjekt="Prochazka.mapovaniUkolu[ukolKey].sources"
              :Sloupce="Prochazka.mapovaniUkolu[ukolKey].columns"
              :ProchazkaPath="`/prochazky/${Prochazka.slug}`"
              :Id="`${ukolKey}${$config.separatorForDynamicSlideId}${indexDynamicKey}`"
            )
            TaskTextovePole(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'text'"
              @value="updateStore"
              :Id="`${ukolKey}${$config.separatorForDynamicSlideId}${indexDynamicKey}`"
            )
            TaskMoznosti(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'array'"
              :Id="`${ukolKey}${$config.separatorForDynamicSlideId}${indexDynamicKey}`"
              :Zadani="false"
              :MoznostiContainer="Prochazka.mapovaniUkolu[ukolKey].itemsObj"
              :Inline="Prochazka.mapovaniUkolu[ukolKey].inline"
              :Limit="Prochazka.mapovaniUkolu[ukolKey].limit"
              @value="updateStore"
            )
            TaskVyfotFoto(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'image'"
              :Id="`${ukolKey}${$config.separatorForDynamicSlideId}${indexDynamicKey}`"
              :PocetFotek="Prochazka.mapovaniUkolu[ukolKey].photoCount"
              @value="updateStore"
            )
            TaskAudio(
              v-if="Prochazka.mapovaniUkolu[ukolKey].type === 'audio'"
              :Id="`${ukolKey}${$config.separatorForDynamicSlideId}${indexDynamicKey}`"
              @value="updateStore"
            )

      .slide()
        .content-container
          h1(v-if="currentLoggedUserId") Shrnutí
          h1(v-if="!currentLoggedUserId") Konec testovacího režimu

          TaskShrnuti(
            :MapovaniUkolu="Prochazka.mapovaniUkolu"
            :IsTestMode="!currentLoggedUserId"
            @submit="emitSubmitHandler"
          )

</template>

<style lang="sass" scoped>
.form-add-object-container
  padding-bottom: $top-bar-height
</style>

<script>
import { mapState, mapGetters } from 'vuex';
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
      slidesContainerElement: null,
    };
  },
  computed: {
    ...mapGetters({
      currentLoggedUser: 'auth/getCurrentUser',
    }),
    ...mapState({
      novy_objekt: 'novy_objekt',
    }),
    currentLoggedUserId() {
      return this.currentLoggedUser?.uid;
    },
    novyObjektSize() {
      this.refreshKey;
      if (!this.slidesContainerElement) return 0;
      const countSlideElements = Array.from(
        this.slidesContainerElement.querySelectorAll('.slide')
      );
      return countSlideElements.length;
    },
  },
  mounted() {
    this.slidesContainerElement = this.$refs.slidesContainer;
    console.log('test from mounted', this.slidesContainerElement);
  },
  watch: {
    novy_objekt: {
      initialize: true,
      deep: true,
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
    isDynamic(objectSlideDefinition, ukolKey = '') {
      return objectSlideDefinition.hasOwnProperty('dynamicBasedOn');
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
