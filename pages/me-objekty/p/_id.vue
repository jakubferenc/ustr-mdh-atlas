<template lang="pug">

.page()
  .section.section-padding(data-component="section")
    .prochazka-detail(v-if="prochazka")
      h1.typo-section-title.is-section-title  {{prochazka.nazev}}

      .section-category()
        .prochazka__title__actions
          .button Sdílet  <font-awesome-icon icon="fa fa-solid fa-link" />

        Catalog(
          Type="objekty"
        )
          template(v-slot:catalog-items)
            template(v-for="(objekt, index) in objekty")
              ObjektNahled(
                :key="objekt.id"
                :Id="objekt.id"
                :Timestamp="objekt.timestamp"
                :Uzivatel="objekt.user_email"
                :ObrazkyArray="getObjectImages(objekt)"
            )

    NotFound(
      v-if="!objekty && !isLoading && isLoaded"
      Text="Nemáte uložené žádné objekty. Zkuste si je přidat v nějaké procházce."
    )

    NotFound(
      v-if="!prochazka && isLoaded"
      Text="Procházka nebyla nalezena. Můžete se vrátit na hlavní stránku aplikace."
      Type="error"
      Link="/"
    )
</template>

<style lang="sass"></style>

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

    prochazka() {
      return this.getProchazkaById(this.$route.params.id);
    },
    objekty() {
      return this.$store.state.objekty_prochazka_detail[this.$route.params.id];
    },
  },

  data() {
    return {
      title: '',
      faGithub,
    };
  },

  async created() {
    await this.$store.dispatch('getMyObjectsByProchazkaId', {
      userId: this.currentLoggedUserId,
      prochazkaId: this.$route.params.id,
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
  head() {
    return {
      htmlAttrs: {
        class: 'page--objekty',
      },
    };
  },
};
</script>
