<template lang="pug">
nav.main-nav(:class="CssClasses" role="navigation" aria-label="Primary")
  NuxtLink(to="/").item Hlavní stránka
  NuxtLink(to="/prochazky/").item.item--prochazky Procházky
  NuxtLink(v-if="currentLoggedUserId" to="/me-objekty/" ).item.item--objekty Mé objekty
  NuxtLink(to="/o-projektu/" ).item O projektu
  NuxtLink(v-if="!currentLoggedUserId" to="/prihlaseni/").item.item--mobile-only Přihlásit / Registrovat
  NuxtLink(v-if="currentLoggedUserId" to="/prihlaseni/").item.item--mobile-only  Odhlásit

</template>

<style lang="sass" scoped>
html.page--objekty .item--objekty,
html.page--prochazka .item--prochazky
  text-decoration: underline
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['CssClasses'],

  computed: {
    ...mapGetters({
      currentLoggedUser: 'auth/getCurrentUser',
    }),
    currentLoggedUserId() {
      return this.currentLoggedUser?.uid;
    },
  },
};
</script>
