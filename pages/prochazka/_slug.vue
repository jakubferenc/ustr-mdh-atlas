<template lang="pug">
.page-container
  CatalogDetailDashboard(
    v-if="prochazka && !isInitialized"
    :Prochazka="prochazka"
    @initProchazka="initProchazkaHandler"
    @initTrialProchazka="initTrialProchazkaHandler"
  )
  CatalogDetailAddObjectForm(
    v-if="prochazka && isInitialized"
    :Prochazka="prochazka"
    @submit="submitAddNewObject"
  )
</template>

<style lang="sass">
html.page--prochazka
  .main-container
    padding-bottom: 100px
</style>

<script>
import { mapGetters, mapState } from 'vuex';
import { resize } from '@/utils/functions';

export default {
  async asyncData({ store, params }) {
    const slug = params.slug;

    store.dispatch('getProchazka', {
      slug,
    });

    return { slug };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser',
      prochazka: 'getProchazka',
    }),
    ...mapState({
      newObject: 'novy_objekt',
      navPosition: 'novy_objekt_nav_pozice',
    }),
  },
  created() {
    this.checkMustInitProchazka(this.$route.query);
  },

  methods: {
    submitAddNewObject(e) {
      this.$store.dispatch('setLoading', { isLoading: true, message: 'Načítám...' });

      /* :TODO: Upravit pro nahrání všech fotek */

      const localOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds

      const prepareDatabaseObject = {
        id: null,
        data: this.$store.state.novy_objekt,
        prochazka_id: this.prochazka.id,
        prochazka_slug: this.prochazka.slug,
        user_id: this.currentUser?.uid,
        user_email: this.currentUser?.email,
        timestamp: new Date(Date.now() - localOffset)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
      };

      if (this.$store.state.novy_objekt.q01_01[0]) {
        prepareDatabaseObject.misto = this.$store.state.novy_objekt.q01_01[0];
      }

      // save object to database

      const db = this.$fire.firestore;
      const batch = db.batch();

      const newDbObject = db.collection(this.$config.firebaseConfig.collectionId).doc();
      const newDbObjectId = newDbObject.id;

      prepareDatabaseObject.id = newDbObjectId;

      prepareDatabaseObject.audio = Object.keys(prepareDatabaseObject.data)
        .filter(
          (key) =>
            this.prochazka.mapovaniUkolu.hasOwnProperty(key) &&
            this.prochazka.mapovaniUkolu[key].type === 'audio'
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: prepareDatabaseObject.data[key].map((audioObject, index) => {
              return {
                ...audioObject,
                realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${prepareDatabaseObject.user_id}/${newDbObjectId}/${audioObject.id}.mp3?alt=media`,
                realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.user_id}%2F${newDbObjectId}%2F${audioObject.id}.mp3?alt=media`,
              };
            }),
          };
        });

      /* Find images in the task and their attributes */
      // PLUS FILE URL FOR IMAGES!
      prepareDatabaseObject.obrazky = Object.keys(prepareDatabaseObject.data)
        .filter(
          (key) =>
            this.prochazka.mapovaniUkolu.hasOwnProperty(key) &&
            this.prochazka.mapovaniUkolu[key]['type'] === 'image'
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: prepareDatabaseObject.data[key].map((imageObject) => {
              return {
                ...imageObject,
                ...{
                  realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${prepareDatabaseObject.user_id}/${newDbObjectId}/${imageObject.id}.webp?alt=media`,
                  realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.user_id}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                  realURLThumb: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${prepareDatabaseObject.user_id}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                },
              };
            }),
          };
        });

      batch.set(newDbObject, prepareDatabaseObject);

      batch.commit().then(async () => {
        // upload file to firestore cloud

        for (const [index, audioObject] of prepareDatabaseObject.audio.entries()) {
          const file_extension = 'mp3';

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
                  `${this.$config.name}/${prepareDatabaseObject.user_id}/${newDbObjectId}/${audioObjectItem.id}.${file_extension}`
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
              const file_extension = 'webp';

              let storageRefFull = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${prepareDatabaseObject.user_id}/${newDbObjectId}/${obrazekObj.id}.${file_extension}`
                )
                .put(resizedBlobImage);

              let storageRefThumb = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${prepareDatabaseObject.user_id}/${newDbObjectId}/${obrazekObj.id}_thumb.${file_extension}`
                )
                .put(resizedBlobImageThumb);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
          } catch (e) {
            console.log(e.message);
          }
        }

        this.$store.dispatch('setLoading', {
          isLoading: true,
          message: 'Nahrávám...',
        });

        // clean store new objekt
        this.$store.dispatch('removeNovyObjekt');

        const timeout = setTimeout(() => {
          this.$store.dispatch('setLoading', {
            isLoading: false,
            message: '',
          });

          // clean up URL resources

          document.querySelectorAll('img.output').forEach(($item) => {
            URL.revokeObjectURL($item.src); // free memory
          });

          // redirect to homepage
          this.$router.push('/');

          clearInterval(timeout);
        }, 2000);
      });
    },

    checkRouterParamsInitProchazka(queryParams = {}) {
      return queryParams.hasOwnProperty('start') && queryParams.start === 'true'
        ? true
        : false;
    },
    checkMustInitProchazka(queryParams) {
      if (this.checkRouterParamsInitProchazka(queryParams)) {
        this.isInitialized = true;
      } else {
        this.isInitialized = false;
      }
    },
    initProchazkaHandler() {
      this.$router.push({ path: this.$route.path, query: { start: true } });
    },
    initTrialProchazkaHandler() {
      return true;
    },
  },
  watch: {
    '$route.query': {
      initialize: true,
      handler(newData) {
        this.checkMustInitProchazka(newData);
      },
    },
    navPosition: {
      initialize: true,
      handler(newVal) {
        if (!this.isInitialized) return;
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, page: newVal + 1 },
        });
      },
    },

    isInitialized(newVal, oldVal) {
      if (newVal) {
        this.htmlClasses = [...this.htmlClasses, 'has--ui-nav'];
      } else {
        this.htmlClasses = this.htmlClasses.splice(
          this.htmlClasses.indexOf('has--ui-nav'),
          1
        );
      }
    },
  },
  data() {
    return {
      isInitialized: false,
      htmlClasses: ['page--prochazka'],
    };
  },
  head() {
    return {
      htmlAttrs: {
        class: this.htmlClasses,
      },
    };
  },
};
</script>
