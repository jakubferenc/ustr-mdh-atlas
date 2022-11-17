<template lang="pug">
.form-container.form--login-form
  .input-container
    label(for="form-email") Váš Email
    input(@keyup.enter.prevent="submitForm" type="email" id="form-email" name="email"  v-model="formData.email")
  .input-container
    label(for="form-email") Heslo
    input(@keyup.enter.prevent="submitForm" type="password" id="form-password" name="form-password" v-model="formData.password")

  .input-container.input-container--submit
    button.button.button-submit(@click="submitForm") Přihlásit
</template>

<style lang="sass" scoped>

@import "~/assets/scss/bulma"
@import "~/assets/scss/variables"
</style>

<script>
export default {
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    payloadLogin() {
      return {
        email: this.formData.email,
        password: this.formData.password,
      };
    },
    zobrazitVsechnyObjekty() {
      return this.$route.query.vse === "1";
    },
  },

  methods: {
    submitForm() {
      console.log("click on submit form");
      this.$emit("submit", this.payloadLogin);
    },
  },
};
</script>
