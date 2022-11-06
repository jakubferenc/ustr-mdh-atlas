<template lang="pug">


.page-container

  <NavigationBar :slideContainerItemsSelector="false" :itemSelector="false" :startPosition="false" :isNavigationBack="true" />

  <MainMenu />

  .content-container

    div.summary-container.summary-detail-container(v-if="objekt" :data-object-id="objekt.id")

      div.summary-item(v-if="objekt.id")
        span.title ID objektu
        span.content {{ objekt.id }}

      div.summary-item(v-if="MapovaniUkolu[polozkaKey]" v-for="polozkaKey in objectSorted" )

        div(v-if="MapovaniUkolu[polozkaKey].type === 'text' " :data-type="MapovaniUkolu[polozkaKey].type" :data-path="`['data']['${polozkaKey}']`")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          span.content {{ objekt.data[polozkaKey] }}

        div(v-if="MapovaniUkolu[polozkaKey].type === 'array' " :data-type="MapovaniUkolu[polozkaKey].type" :data-path="`['data']['${polozkaKey}']`")
          span.title {{MapovaniUkolu[polozkaKey].title}}
          .ui-widget
            .ui-widget__list-keywords.inline
              span.ui-widget__keyword(v-for="(keyword, index) in objekt.data[polozkaKey]" :key="index" ) {{keyword}}


        div(v-if="MapovaniUkolu[polozkaKey].type === 'image' " :data-type="MapovaniUkolu[polozkaKey].type" :data-path="`['data']['${polozkaKey}']`")
          span.title {{MapovaniUkolu[polozkaKey].title}}

          .image-container(v-for="obrazekObj in objekt.obrazky.filter(obr => obr.id === polozkaKey)[0].items" :key="obrazekObj.id")
            img(class="summary-item-photo-raw" :src="obrazekObj.realURL" :data-id="obrazekObj.id")

        div(v-if="MapovaniUkolu[polozkaKey].type === 'audio' " :data-type="MapovaniUkolu[polozkaKey].type" :data-path="`['data']['${polozkaKey}']`")
          span.title {{MapovaniUkolu[polozkaKey].title}}

          .audio-container(v-for="(recording, index) in objekt.audio.filter(audioObj => audioObj.id === polozkaKey)[0].items" :key="index")
            .recording-item__player
              <audio controls>
                <source :src="recording.realURL" type="audio/ogg">
                Your browser does not support the audio tag.
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
import * as obsahAplikaceConfig from '../../prochazky.config';

export default {


  async asyncData({route, store}) {

    console.log(route.params.id);

    await store.dispatch('getObjekt', route.params.id);

    const obsahAplikace = obsahAplikaceConfig;

    return {
      objekt: store.state.objekt_detail,
      MapovaniUkolu: obsahAplikace.mapovaniUkolu,
    }

  },

  data() {
    return {
      MapovaniUkolu: obsahAplikaceConfig.mapovaniUkolu,
      objekt: null,
    };
  },

  computed: {

    objectSorted() {

      return Object.keys(this.objekt.data).sort();

    },

  },

  mounted() {},

  head() {
    return {
      htmlAttrs: {
        class: 'with-top-nav',
      },
    };
  },

}
</script>
