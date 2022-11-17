<template lang="pug">

.content-container

  h1.typo-main-title {{$t('title')}}:&nbsp;
      small {{ subtitle }}
  .grid.grid-2.form-spacer

    FormLogin(
      @submit="submitLoginHandler"
    )

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
import { translateAuth } from "@/utils/translate";

export default {
  data() {
    return {
      subtitle: "Prihlášení",
    };
  },

  created() {},

  methods: {
    async submitLoginHandler(payload) {
      console.log("from submit login handler");
      try {
        const loginResponse = await this.$fire.auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      } catch (error) {
        console.error(error);
        this.$store.dispatch("alert/message", { error: error.message });
      }
    },
  },
};
</script>
