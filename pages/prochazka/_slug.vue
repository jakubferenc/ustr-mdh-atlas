<template lang="pug">
.page-container
  CatalogDetailDashboard(
    v-if="prochazka"
    :Prochazka="prochazka"
  )
</template>

<style lang="sass"></style>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ store, params }) {
    const slug = params.slug;

    store.dispatch("getProchazka", {
      slug,
    });

    return { slug };
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      prochazka: "getProchazka",
    }),
    slug() {
      this.params;
    },
  },

  head() {
    return {
      htmlAttrs: {
        class: "page--prochazka",
      },
    };
  },
};
</script>
