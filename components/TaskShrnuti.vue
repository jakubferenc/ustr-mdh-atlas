<template lang="pug">

.page-summary-container(v-if="Object.keys(novy_objekt).length")
  div.summary-container
    .summary-item
      span.title Váš email
      span.content {{ currentUser?.email || 'test' }}
    div.summary-item(v-for="polozkaKey in Object.keys(novy_objekt)")

      div(v-if="findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId)")

        div(v-if="findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'text' ")
          span.title {{findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
          span.content {{ novy_objekt[polozkaKey] }}

        div(v-if="findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'array' && novy_objekt[polozkaKey] ")
          span.title {{findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
          .ui-widget
            .ui-widget__list-keywords.inline
              span.ui-widget__keyword(v-for="(keyword, index) in novy_objekt[polozkaKey]" :key="index" ) {{keyword}}

        div(v-if="findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'image' ")
          span.title {{findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
          .image-container(v-for="(itemImageObj, index) in novy_objekt[polozkaKey]" :key="index")
            img(class="summary-item-photo-raw" :src="itemImageObj.url")

        div(v-if="findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'audio' ")
          span.title {{findObjectSlideDefinition(MapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
          .image-container(v-for="(recording, index) in novy_objekt[polozkaKey]" :key="index")
            .recording-item__player
              <audio controls>
                <source :src="recording.audioUrl" type="audio/mpeg">
              </audio>


  button.button.button-ok(v-if="!IsTestMode" @click="emitSubmit()" data-submit) Uložit objekt

</template>

<style lang="sass" scoped>

.page-summary-container

  .button
    margin-top: 2rem
</style>

<script>
import { mapGetters, mapState } from 'vuex';
import { findObjectSlideDefinition } from '@/utils/functions';

export default {
  props: ['Id', 'MapovaniUkolu', 'IsTestMode'],

  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser',
    }),

    ...mapState({
      novy_objekt: 'novy_objekt',
    }),
  },
  data() {
    return {};
  },
  mounted() {},

  watch: {},
  methods: {
    findObjectSlideDefinition,
    emitSubmit() {
      this.$emit('submit');
    },
  },
};
</script>
