<template lang="pug">

.page()
  .section.section-padding(data-component="section")

    h1.typo-section-title.is-section-title  Mé objekty v aplikaci

    template(v-if="objekty.length")
      .section-category(v-for="(prochazkaObj, index) in prochazky" :key="index")
        h2.typo-subtitle.prochazka__title
          span.typo-hero-box-subtitle {{ getProchazkaById(prochazkaObj.id).nazev }}
        .prochazka__title__actions
          .button Sdílet  <font-awesome-icon icon="fa fa-solid fa-share" />

        Catalog(Type="objekty")
          template(v-slot:catalog-items)
            template(v-for="(objekt, index) in objekty")
              ObjektNahled(
                v-if="objekt.prochazka_id === prochazkaObj.id"
                :key="objekt.id"
                :Id="objekt.id"
                :Timestamp="objekt.timestamp"
                :Uzivatel="objekt.user_email"
                :ObrazkyArray="getObjectImages(objekt)"
            )
    div(v-if="!objekty.length && !isLoading && isLoaded")
      NotFound(Text="Nemáte uložené žádné objekty. Zkuste si je přidat v nějaké procházce." Link="/prochazky/")
</template>

<style lang="sass">
.button svg
  margin-left: .25em

.prochazka__title
  margin-bottom: .25em

.prochazka__title__actions
  display: block
  margin-bottom: 1.25em

  .button
    max-width: 150px
    min-width: 50px

.section-category
  margin-bottom: 1.5em

.user-form
  margin-bottom: 2rem
  input
    width: 100%
    height: 50px
    border: 1px solid black

    +from($tablet)


    +from($desktop)
      width: 50%

    +from($widescreen)

    +from($fullhd)
</style>

<script>
import ObjectProchazka from '~/models/ObjectProchazka';
import prochazkyConfig from '~/prochazky.config';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default {
  computed: {
    currentLoggedUserId() {
      return this.$store.getters['auth/getCurrentUser']?.uid;
    },

    loading() {
      return this.$store.state.loading;
    },

    prochazky() {
      const prochazkyFromUserObject = this.objekty
        .map((objekt = ObjectProchazka) => {
          const { prochazka_id, prochazka_slug } = objekt;
          return {
            id: prochazka_id,
            slug: prochazka_slug,
          };
        })
        .reduce((prevVal, currentVal) => {
          if (!prevVal.length) {
            return [...prevVal, currentVal];
          }
          const isExist = prevVal.filter(
            (item) => item.prochazka_id === currentVal.prochazka_id
          );
          if (isExist.length) return prevVal;
          return [...prevVal, currentVal];
        }, []);

      return prochazkyFromUserObject;
    },
    objekty() {
      return this.$store.state.objekty;
    },
  },

  data() {
    return {
      title: '',
      prochazkyConfig,
      faGithub,
    };
  },

  async created() {
    await this.$store.dispatch('getMyObjects', {
      userId: this.currentLoggedUserId,
    });
    this.isLoaded = true;
  },

  mounted() {},

  methods: {
    getObjectImages(objectProchazka = ObjectProchazka) {
      return objectProchazka?.obrazky?.[0]?.items?.length
        ? objectProchazka?.obrazky?.[0]?.items
        : [];
    },
    getProchazkaById(prochazkaId) {
      const prochazkaKey = Object.keys(prochazkyConfig).find(
        (prochazkaKey) => prochazkyConfig[prochazkaKey].id === prochazkaId
      );
      return prochazkyConfig[prochazkaKey];
    },
  },
};
</script>
