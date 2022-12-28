<template lang="pug">

.content-container

  h1.typo-main-title {{ title }}

  .grid.grid-2.form-spacer
    .form-container-wrap
      FormLogin(
        @submit="submitLoginHandler"
      )
      p Nebo <nuxt-link to="/registrace">nemáte účet?</nuxt-link>

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
  data() {
    return {
      title: 'Přihlášení',
    };
  },
  created() { },

  methods: {
    errorHandler(error) {
      this.$store.dispatch('alert/message', { error: error.message });
    },
    async submitLoginHandler(payload) {
      try {
        const loginResponse = await this.$fire.auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      } catch (error) {
        console.error(error);
        this.$store.dispatch('alert/message', { error: error.message });
      }
    },
  },
};
</script>
