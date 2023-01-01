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
import ObjectProchazka from '~/models/ObjectProchazka';

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
    async submitAddNewObject(e) {
      /* :TODO: Upravit pro nahrání všech fotek */
      const localOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds

      const prepareDatabaseObject = {
        id: null,
        data: { ...this.$store.state.novy_objekt },
        prochazka_id: this.prochazka.id,
        prochazka_slug: this.prochazka.slug,
        user_id: this.currentUser?.uid,
        user_email: this.currentUser?.email,
        timestamp: new Date(Date.now() - localOffset)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
      };

      if (this.$store.state.novy_objekt.q01_01?.[0]) {
        prepareDatabaseObject.misto = this.$store.state.novy_objekt.q01_01[0];
      }

      const newObjectInstance = new ObjectProchazka(prepareDatabaseObject);

      await this.$store.dispatch('addNewObject', {
        objectPayload: newObjectInstance.getDataForApi(),
        prochazka: this.prochazka,
      });

      const timeout = setTimeout(() => {
        // clean up URL resources
        document.querySelectorAll('img.output').forEach(($item) => {
          URL.revokeObjectURL($item.src); // free memory
        });

        // redirect to homepage
        this.$router.push('/');

        clearInterval(timeout);
      }, 2000);
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
      this.$router.push({ path: this.$route.path, query: { start: true, trial: true } });
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
