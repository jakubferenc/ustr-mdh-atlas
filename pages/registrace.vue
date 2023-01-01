<template lang="pug">

.content-container

  h1.typo-main-title {{$t('title')}}:&nbsp;
    small {{ subtitle }}

  .grid.grid-2.form-spacer
    .form-container-wrap
      FormRegister(
        @submit="submitRegistration"
        @error="errorHandler"
      )
      p Nebo <NuxtLink to="/prihlaseni/">máte účet?</NuxtLink>
</template>

<style lang="sass" scoped>

.dashboard-container
  margin: 2rem 0

  .ui-card
    font-size: clamp(1.5rem, 2vw, 2rem)
    color: black

.red
  color: red
</style>

<script>
import FormRegister from '~/components/FormRegister.vue';

export default {
  data() {
    return {
      subtitle: 'Registrace',
    };
  },
  created() {},

  methods: {
    errorHandler(error) {
      this.$store.dispatch('alert/error', { error: error.message });
    },
    async submitRegistration(payload) {
      this.$store.dispatch('alert/error', { error: false });
      await this.$store.dispatch('auth/register', {
        email: payload.email,
        password: payload.password,
      });
    },
  },
  components: { FormRegister },
};
</script>
