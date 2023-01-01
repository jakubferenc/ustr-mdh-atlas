<template lang="pug">
.page
  .section.section-padding(data-component="section")

    template(v-if="objekt" )

      h1.typo-section-title.is-section-title
        span Detail objektu <br />
        small {{ objekt.id }}


      div.summary-container.summary-detail-container(:data-object-id="objekt.id")

        div.summary-item(v-if="objekt.id")
          span.title ID objektu
          span.content {{ objekt.id }}

        div.summary-item(v-if="objekt.id")
          span.title Uživatel
          span.content {{ objekt.user_email }}

        div.summary-item(v-for="polozkaKey in objektSorted")

          div(v-if="findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId)")

            div(v-if="findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'text' ")
              span.title {{findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
              span.content {{ objekt.data[polozkaKey] }}

            div(v-if="findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'array'")
              span.title {{findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
              .ui-widget
                .ui-widget__list-keywords.inline
                  span.ui-widget__keyword(v-for="(keyword, index) in objekt.data[polozkaKey]" :key="index" ) {{keyword}}

            div(v-if="findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'image' && hasPhotosForGivenExercise(polozkaKey)")
              span.title {{findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
              .image-container(v-for="(itemImageObj, index) in objekt.obrazky.filter((obr) => obr.id === polozkaKey)[0].items" :key="index")
                img(class="summary-item-photo-raw" :src="itemImageObj.realURL")

            div(v-if="findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).type === 'audio' && hasAudioForGivenExercise(polozkaKey)")
              span.title {{findObjectSlideDefinition(prochazka.mapovaniUkolu, polozkaKey, $config.separatorForDynamicSlideId).title}}
              .image-container(v-for="(recording, index) in objekt.audio.filter(audioObj => audioObj.id === polozkaKey)[0].items" :key="index")
                .recording-item__player
                  <audio controls>
                    <source :src="recording.realURL" type="audio/mpeg">
                  </audio>


        div.summary-item(v-if="objekt.timestamp")
          span.title Čas vyplnění
          span.content {{ objekt.timestamp }}


</template>

<style lang="sass">

.content-container
  padding-bottom: 60px

.audio-container
  margin-bottom: 1rem

.summary-container.summary-detail-container .image-container
  background: lightgray
  width: 50%

  img
    width: 100%
    height: auto
</style>

<script>
import prochazkyConfig from '~/prochazky.config';
import { findObjectSlideDefinition } from '@/utils/functions';

export default {
  async asyncData({ route, store }) {
    console.log(route.params.id);
    await store.dispatch('getObjekt', route.params.id);
    return {
      objekt: store.state.objekt_detail,
    };
  },
  data() {
    return {
      objekt: null,
    };
  },

  computed: {
    objektSorted() {
      return Object.keys(this.objekt.data).sort();
    },
    prochazka() {
      return this.getProchazkaById(this.objekt.prochazka_id);
    },
  },

  methods: {
    findObjectSlideDefinition,
    hasAudioForGivenExercise(polozkaKey) {
      return this.objekt.audio.filter((audioObj) => audioObj.id === polozkaKey)?.[0]
        ?.items;
    },
    hasPhotosForGivenExercise(polozkaKey) {
      return this.objekt.obrazky.filter((obr) => obr.id === polozkaKey)[0].items;
    },
    getProchazkaById(prochazkaId) {
      const prochazkaKey = Object.keys(prochazkyConfig).find(
        (prochazkaKey) => prochazkyConfig[prochazkaKey].id === prochazkaId
      );
      return prochazkyConfig[prochazkaKey];
    },
  },

  mounted() {},
  head() {
    return {
      htmlAttrs: {
        class: 'page--objekty',
      },
    };
  },
};
</script>
