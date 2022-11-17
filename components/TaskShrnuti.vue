<template lang="pug">

.page-summary-container(v-if="currentUser.email && Object.keys(getNovyObjekt).length")
  div.summary-container
    .summary-item
      span.title Váš email
      span.content {{ currentUser.email }}
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


  button.button(@click="submitAddNewObject($event)" data-submit) Uložit objekt

</template>

<style lang="sass" scoped>

@import "~/assets/scss/bulma"
@import "~/assets/scss/variables"

.page-summary-container

  .button
    margin-top: 2rem
</style>

<script>
import { resize } from "../utils/functions";

export default {
  props: ["Id", "MapovaniUkolu"],

  computed: {
    currentUser() {
      return this.$store.getters["auth/getCurrentUser"];
    },
    getNovyObjekt() {
      return this.$store.state.novy_objekt;
    },
  },
  data() {
    return {};
  },
  mounted() {},

  watch: {},
  methods: {
    submitAddNewObject(e) {
      this.$store.dispatch("setLoading", { isLoading: true, message: "Načítám..." });

      /* :TODO: Upravit pro nahrání všech fotek */

      const localOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds

      const prepareDatabaseObject = {
        id: null,
        data: this.$store.state.novy_objekt,
        user_id: this.$store.getters["auth/getCurrentUser"]?.uid,
        user_email: this.$store.getters["auth/getCurrentUser"]?.email,
        misto: this.$store.state.novy_objekt.q01_01[0],
        timestamp: new Date(Date.now() - localOffset)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      };

      // save object to database

      const db = this.$fire.firestore;
      const batch = db.batch();

      const newDbObject = db.collection(this.$config.firebaseConfig.collectionID).doc();
      const newDbObjectId = newDbObject.id;

      prepareDatabaseObject.id = newDbObjectId;

      prepareDatabaseObject.audio = Object.keys(prepareDatabaseObject.data)
        .filter(
          (key) =>
            this.MapovaniUkolu.hasOwnProperty(key) &&
            this.MapovaniUkolu[key].type === "audio"
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: prepareDatabaseObject.data[key].map((audioObject, index) => {
              return {
                ...audioObject,
                realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${prepareDatabaseObject.uzivatelske_jmeno}/${newDbObjectId}/${audioObject.id}.mp3?alt=media`,
                realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.uzivatelske_jmeno}%2F${newDbObjectId}%2F${audioObject.id}.mp3?alt=media`,
              };
            }),
          };
        });

      /* Find images in the task and their attributes */
      // PLUS FILE URL FOR IMAGES!
      prepareDatabaseObject.obrazky = Object.keys(prepareDatabaseObject.data)
        .filter(
          (key) =>
            this.MapovaniUkolu.hasOwnProperty(key) &&
            this.MapovaniUkolu[key]["type"] === "image"
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: prepareDatabaseObject.data[key].map((imageObject) => {
              return {
                ...imageObject,
                ...{
                  realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${prepareDatabaseObject.uzivatelske_jmeno}/${newDbObjectId}/${imageObject.id}.webp?alt=media`,
                  realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.uzivatelske_jmeno}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                  realURLThumb: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.uzivatelske_jmeno}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                },
              };
            }),
          };
        });

      batch.set(newDbObject, prepareDatabaseObject);

      batch.commit().then(async () => {
        // upload file to firestore cloud

        for (const [index, audioObject] of prepareDatabaseObject.audio.entries()) {
          const file_extension = "mp3";

          try {
            // upload audio files
            ////////////////////////////////////////////////////////////////////////////////////////////////
            const items = audioObject.items;

            for (const audioObjectItem of items) {
              const response = await fetch(audioObjectItem.audioUrl);
              const audioBlob = await response.blob();

              this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${prepareDatabaseObject.uzivatelske_jmeno}/${newDbObjectId}/${audioObjectItem.id}.${file_extension}`
                )
                .put(audioBlob);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
          } catch (e) {
            console.log(e.message);
          }
        }

        for (const obrazekObjContainer of prepareDatabaseObject.obrazky) {
          try {
            // upload images
            ////////////////////////////////////////////////////////////////////////////////////////////////

            // obrazekObjContainer is an array of objects

            const items = obrazekObjContainer.items;

            for (const obrazekObj of items) {
              const response = await fetch(obrazekObj.url);

              const blob = await response.blob();

              // resize
              const resizedBlobImage = await resize(blob, this.$config.imageSizes.full);
              const resizedBlobImageThumb = await resize(
                blob,
                this.$config.imageSizes.thumb
              );

              //const file_extension = obrazekObj.type.split('/')[1];
              const file_extension = "webp";

              let storageRefFull = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${prepareDatabaseObject.uzivatelske_jmeno}/${newDbObjectId}/${obrazekObj.id}.${file_extension}`
                )
                .put(resizedBlobImage);

              let storageRefThumb = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${prepareDatabaseObject.uzivatelske_jmeno}/${newDbObjectId}/${obrazekObj.id}_thumb.${file_extension}`
                )
                .put(resizedBlobImageThumb);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
          } catch (e) {
            console.log(e.message);
          }
        }

        this.$store.dispatch("setLoading", {
          isLoading: true,
          message: "Nahrávám...",
        });

        // clean store new objekt
        this.$store.dispatch("removeNovyObjekt");

        const timeout = setTimeout(() => {
          this.$store.dispatch("setLoading", {
            isLoading: false,
            message: "",
          });

          // clean up URL resources

          document.querySelectorAll("img.output").forEach(($item) => {
            URL.revokeObjectURL($item.src); // free memory
          });

          // redirect to homepage
          this.$router.push("/");

          clearInterval(timeout);
        }, 2000);
      });
    },
  },
};
</script>
