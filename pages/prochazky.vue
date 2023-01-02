<template lang="pug">

.page
  .section.section-padding(data-component="section")

    h1.typo-section-title.is-section-title Seznam procházek

    .typo-subtitle.is-section-title Nabízíme Vám několik příkladů práce s aplikací. v prostředí konkrétních lokalit. Aktivity v prostředí ulic měst jsme prohloubili přidáním historických pramenů vztahujících se k jednotlivým artefaktům ve veřejném prostoru. Práce s nimi vede skrze dílčí úkoly k objevování širšího kontextu zkoumaných reliktů minulosti a umožňuje uživatelům bádat nad konkrétními historickými problémy. Naleznete zde také verzi umožňující naší aplikaci využít v muzejních expozicích.

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
            Type="prochazka"
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

  },

  data() {
    return {
      title: 'Procházky',
    };
  },
  head() {
    return {
      title: `${this.title} — ${this.$config.globalTitle}`,
      htmlAttrs: {
        class: '',
      },
    };
  },
};
</script>
