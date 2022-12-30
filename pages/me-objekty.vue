<template lang="pug">

.page
  .section.section-padding(data-component="section")

    h1.typo-section-title.is-section-title  Mé objekty v aplikaci


    .section-category(v-for="(prochazkaObj, index) in prochazky" :key="index")
      h2.typo-subtitle.prochazka-title {{ getProchazkaById(prochazkaObj.prochazka_id).nazev }}

      <Catalog>
        <template v-slot:catalog-items>
          ObjektNahled(
            v-for="(objekt, index) in objekty"
            :key="objekt.id"
            :Id="objekt.id"
            :Timestamp="objekt.timestamp"
            :Uzivatel="objekt.user_email"
            :ObrazkyArray="objekt.obrazky[0].items"
          )
        </template>
      </Catalog>



</template>

<style lang="sass">
.prochazka-title
  margin-bottom: .5em

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
export default {
  async created() {
    await this.$store.dispatch('getMyObjects', {
      userId: this.currentLoggedUserId,
    });
  },

  mounted() { },

  methods: {
    getProchazkaById(prochazkaId) {
      const prochazkaKey = Object.keys(prochazkyConfig).find(
        (prochazkaKey) => prochazkyConfig[prochazkaKey].id === prochazkaId
      );
      return prochazkyConfig[prochazkaKey];
    },
  },

  computed: {
    currentLoggedUserId() {
      return this.$store.getters['auth/getCurrentUser']?.uid;
    },

    loading() {
      return this.$store.state.loading;
    },

    prochazky() {
      return this.objekty
        .map((objekt = ObjectProchazka) => {
          const { prochazka_id, prochazka_slug } = objekt;
          return {
            prochazka_id,
            prochazka_slug,
          };
        })
        .reduce((prevVal, currentVal) => {
          return [...prevVal, currentVal];
        }, []);
    },

    objekty() {
      return this.$store.state.objekty.filter(
        (item) => item.user_id === this.currentLoggedUserId
      );
    },
  },

  data() {
    return {
      title: '',
      prochazkyConfig,
    };
  },
};
</script>
