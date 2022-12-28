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
  )
</template>

<style lang="sass"></style>

<script>
import { mapGetters } from 'vuex';

export default {
  async asyncData({ store, params }) {
    const slug = params.slug;

    store.dispatch('getProchazka', {
      slug,
    });

    return { slug };
  },

  created() {
    console.log('from created');
    this.checkMustInitProchazka(this.$route.query);
  },

  methods: {
    checkRouterParamsInitProchazka(queryParams = {}) {
      return queryParams.hasOwnProperty('start') && queryParams.start === 'true'
        ? true
        : false;
    },
    checkMustInitProchazka(queryParams) {
      console.log('from check must init', queryParams);

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
        console.log('from watcher handler', newData);
        this.checkMustInitProchazka(newData);
      },
    },
  },
  data() {
    return {
      isInitialized: false,
    };
  },
  computed: {
    ...mapGetters({
      prochazka: 'getProchazka',
    }),
  },

  head() {
    return {
      htmlAttrs: {
        class: 'page--prochazka',
      },
    };
  },
};
</script>
