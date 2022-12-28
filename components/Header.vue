<template lang="pug">
header.header-main()
  .logo-nav
    .logo
    nav.breadcrumbs
      NuxtLink(to="/").item
        span.logo Atlas&nbsp;
        span Muzea dělnického hnutí v 21. století

  <MainMenu />

  nav.user-actions-nav
    NuxtLink.item(v-if="currentLoggedUserId" to="/odhlaseni/") Odhlásit
    NuxtLink.item(v-if="!currentLoggedUserId" to="/prihlaseni/") Přihlásit

  .toggle-mobile-menu
    NuxtLink(to="#") Menu
</template>
<style lang="sass">
.logo
  font-weight: bold
  text-transform: uppercase
  color: #000

.header-main
  display: flex
  justify-content: space-between
  align-items: center
  position: fixed
  top: 0
  left: 0
  width: 100%
</style>

<script>
export default {
  computed: {
    currentLoggedUserId() {
      return this.$store.getters['auth/getCurrentUser']?.uid;
    },

    zobrazitVsechnyObjekty() {
      return this.$route.query.vse === '1';
    },
  },
};
</script>
