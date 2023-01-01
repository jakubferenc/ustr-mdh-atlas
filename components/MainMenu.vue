<template lang="pug">
nav.main-nav(:class="CssClasses" role="navigation" aria-label="Primary")
  NuxtLink(to="/").item Hlavní stránka
  NuxtLink(to="/prochazky/").item.item--prochazky Procházky
  NuxtLink(to="/me-objekty/" ).item.item--objekty Mé objekty
  NuxtLink(to="/o-projektu/" ).item O projektu
</template>

<style lang="sass" scoped>
html.page--objekty .item--objekty,
html.page--prochazka .item--prochazky
  text-decoration: underline
</style>

<script>
export default {
  props: ['CssClasses'],
};
</script>
