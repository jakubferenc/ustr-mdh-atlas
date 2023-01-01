<template lang="pug">

.page
  .section.section-padding(data-component="section")

    h1.typo-section-title.is-section-title Seznam procházek

    .typo-subtitle.is-section-title Na jednotlivých interaktivních mapách najdete objekty, které lze třídit pomocí typu a kategorie. Můžete si zobrazit všechny objekty najednou, nebo si vytřídit ty, které chcete. Mapy dále pro uživatele nabízí tři způsoby pohledu na data. Lze si zobrazit pouze objekty, pouze mapu, anebo vše dohromady.

    .list-in-section(data-component="list-map")

      <Catalog>
        <template v-slot:catalog-items>
          Card(
            v-for="key in Object.keys(prochazky)"
            :key="key"
            :Id="key"
            :Name="prochazky[key].nazev"
            :Slug="prochazky[key].slug"
            :Authors="prochazky[key].autori"
            :Image="prochazky[key].obrazky.thumb"
            :Description="prochazky[key].popis"
            :Color="prochazky[key].barva"
          )
        </template>
      </Catalog>

//- .page
//-   h1.typo-main-title {{$t('title')}}:&nbsp;
//-     small {{$t('subtitle')}}

//-   .section.section-walks
//-     .thumb-walk Testovací nadpis
//-     .thumb-walk Testovací nadpis 2
//-     .thumb-walk Testovací nadpis 3
//-     .thumb-walk Testovací nadpis 4


//-   .grid.grid-2.dashboard-container
//-     NuxtLink.ui-card(to="/pridat-objekt")
//-       span.text Přidat objekt (+)

//-     NuxtLink.ui-card(to="/me-objekty")
//-       span.text Seznam mých objektů

//-     NuxtLink.ui-card(to="/vsechny-objekty" v-show="zobrazitVsechnyObjekty")
//-       span.text Seznam všech objektů v aplikaci

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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      prochazky: "getProchazky",
    }),

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
