<template lang="pug">

.page

  .hero-box.homepage.section-padding(data-component="hero-box")

    .title-container.columns

      .column.is-half-desktop
        h1.app-title Atlas
        p.app-subtitle Muzea dělnického hnutí v 21. století

      .column.is-half-desktop
        p.typo-subtitle Tato sada interaktivních map je výsledkem bádání ve fondech <a href="https://www.mdh21.cz/stranka/o-sbirce-mdh/">Sbírky Muzea dělnického hnutí v Národním muzeu</a>. Jednotlivé mapy vizualizují dějinná témata, jež byla podstatná pro kulturní politiku v Československu v období 1948-1989. Kromě jednotlivých muzeí, památníků a artefaktů mapy zachycují i dynamiku našeho vzpomínání. Objevujte s námi místa paměti, na která postupně zapomínáme.

    .footer-container

      .columns.is-mutiline-mobile.is-desktop

        .footer-container-section.footer-container-section-goals.column.is-half-desktop
          h2.typo-hero-box-subtitle O projektu

          .content
            p(v-html="$config.obsah.about.aboutText")




    .background

</template>

<style lang="sass">

.dashboard-container
  margin: 2rem 0

  .ui-card
    font-size: clamp(1.5rem, 2vw, 2rem)
    color: black

.red
  color: red
</style>

<script>
export default {
  layout: "homepage",

  computed: {
    zobrazitVsechnyObjekty() {
      return this.$route.query.vse === "1";
    },
  },

  data() {
    return {
      title: "Hello world!!!",
    };
  },
};
</script>
