<template lang="pug">

.page-summary-container(v-if="Object.keys(getNovyObjekt).length")
  div.summary-container
    .summary-item
      span.title Váš email
      span.content {{ currentUser?.email || 'test' }}
    div.summary-item(v-for="polozkaKey in Object.keys(getNovyObjekt)")

      div(v-if="MapovaniUkolu[polozkaKey]")

        div(v-if="MapovaniUkolu[polozkaKey].type === 'text' ")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          span.content {{ getNovyObjekt[polozkaKey] }}

        div(v-if="MapovaniUkolu[polozkaKey].type === 'array' && getNovyObjekt[polozkaKey] ")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          .ui-widget
            .ui-widget__list-keywords.inline
              span.ui-widget__keyword(v-for="(keyword, index) in getNovyObjekt[polozkaKey]" :key="index" ) {{keyword}}

        div(v-if="MapovaniUkolu[polozkaKey].type === 'image' ")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          .image-container(v-for="(itemImageObj, index) in getNovyObjekt[polozkaKey]" :key="index")
            img(class="summary-item-photo-raw" :src="itemImageObj.url")

        div(v-if="MapovaniUkolu[polozkaKey].type === 'audio' ")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          .image-container(v-for="(recording, index) in getNovyObjekt[polozkaKey]" :key="index")
            .recording-item__player
              <audio controls>
                <source :src="recording.audioUrl" type="audio/mpeg">
              </audio>


  button.button(@click="emitSubmit()" data-submit) Uložit objekt

</template>

<style lang="sass" scoped>

.page-summary-container

  .button
    margin-top: 2rem
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['Id', 'MapovaniUkolu'],

  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser',
    }),

    getNovyObjekt() {
      return this.$store.state.novy_objekt;
    },
  },
  data() {
    return {};
  },
  mounted() { },

  watch: {},
  methods: {
    emitSubmit() {
      this.$emit('submit');
    },
  },
};
</script>
