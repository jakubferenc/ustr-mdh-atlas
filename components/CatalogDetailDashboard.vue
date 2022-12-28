<template lang="pug">
.catalog-detail__dashboard

  .catalog-detail__dashboard__body.container-fluid
    .catalog-detail__dashboard__body__box
      .catalog-detail__dashboard__title
        h1.typo-main-title {{Prochazka.nazev}}
      .catalog-detail__dashboard__meta

        .catalog-detail__dashboard__meta__authors(data-caption="Authoři procházky")
          span {{Prochazka.autori.join(', ')}}

        .catalog-detail__dashboard__meta__documents(data-caption="Metodika")
          a(:href="require(`~/prochazky/${Prochazka.slug}/${Prochazka.metodika}`)" download)
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" class="svg-inline--fa fa-file-alt fa-w-12 fa-sm " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>
            span.icon-title Stáhnout


      .catalog-detail__dashboard__description
        p.typo-subtitle Cvičení pracuje s fotografií a novinovou zprávou o protestech proti otevření provozovny McDonald's v Praze v roce 1992. Žáci odhadují, co se děje na fotografii a posléze s pomocí zprávy upravují svou hypotézu. Cvičení seznamuje žáky s projevy transformace Československa po roce 1989 a ukazuje nové problémy, s nimiž se společnost vyrovnávala.

  .catalog-detail__dashboard__buttons

    .catalog-detail__dashboard__buttons__inside

      .actions-bar__title
        h3 Spustění procházky

      .actions-bar__buttons
        .button.button-ok.desaturated Spustit procházku

      .actions-bar__or
        span Nebo

      .actions-bar__try
        .button Vyzkoušet procházku

  .catalog-detail__dashboard__background
    <img :src="require(`@/prochazky/${Prochazka.slug}/${Prochazka.obrazky.intro}`)" :alt="Prochazka.nazev" />
</template>
<style lang="sass" scoped>
.catalog-detail__dashboard
  position: relative
  height: calc(100vh - #{$header-main-height})

  .catalog-detail__dashboard__body
    position: relative
    z-index: 1
    color: #fff
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    flex-direction: column

  .catalog-detail__dashboard__body__box
    display: flex
    align-items: center

    flex-direction: column
    row-gap: 1.5rem
    min-height: 20rem
    margin-top: -5vh
    justify-content: flex-start

    +from($desktop)
      justify-content: center

  .catalog-detail__dashboard__title

    +from($desktop)
      text-align: center
      width: 75%
      margin: 0 auto


  .catalog-detail__dashboard__meta

    display: grid
    grid-template-areas: "authors documents"

    [data-caption]
      border-top: 1px solid rgba(250,245,245,.25)
      border-bottom: 1px solid rgba(250,245,245,.25)
      padding: .5rem
      &::before
        content: attr(data-caption)
        display: block
        font-size: 12px
        margin-bottom: .25em

    &__authors
      grid-area: authors
      border-left: none
      border-right: 1px solid rgba(250,245,245,.25)

    &__documents
      grid-area: documents
      border-right: none
      a
        color: $warn-color

  .catalog-detail__dashboard__description,
  .catalog-detail__dashboard__meta
    width: 100%

    +from($desktop)
        width: 75%

    +from($fullhd)
      width: 50%

  .catalog-detail__dashboard__description
    p
      font-weight: bold


  .catalog-detail__dashboard__buttons
    position: sticky
    bottom: 1.5rem
    width: 100%
    z-index: 2
    display: flex
    align-items: center
    justify-content: center
    margin-top: calc(-1.5rem - 170px)

    .catalog-detail__dashboard__buttons__inside
      background-color: rgba(28,19,18,.6)
      box-shadow: 0 0 1.6rem rgb(28 19 18 / 62%)
      padding: 1.6rem
      color: rgba(255,255,255,.8)
      align-items: center
      min-height: 170px
      width: 100%

      +until($desktop)
        display: flex
        flex-direction: column
        row-gap: 1rem

      +from($desktop)
        height: 170px
        width: 75%
        border-radius: 0.8rem

        display: grid
        grid-template-areas: "heading . ." "buttons orText try"
        grid-column-gap: 1.6rem
        -webkit-column-gap: 1.6rem
        column-gap: 1.6rem
        grid-row-gap: 0.2rem
        row-gap: 0.2rem


      .actions-bar__title
        grid-area: heading

      .actions-bar__buttons
        grid-area: buttons

      .actions-bar__or
        grid-area: orText
        justify-self: center

      .actions-bar__try
        grid-area: try
        justify-self: flex-end


  .catalog-detail__dashboard__background
    position: absolute
    top: 0
    left: 0
    z-index: 0
    width: 100%
    height: calc(100vh - #{$header-main-height})
    background-color: rgb(62, 62, 62)
    img
      object-fit: cover
      object-position: center right
      width: 100%
      height: 100%
      opacity: .25
      filter: blur(10px)
</style>
<script>
export default {
  props: {
    Prochazka: {
      type: Object,
      require: true,
    },
  },

  created() {},

  data() {
    return {
      thisComponentStyles: {},
    };
  },

  head() {
    return {};
  },
};
</script>
