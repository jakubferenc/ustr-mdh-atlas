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



input
  background-color: #fff
  border-radius: 12px
  width: 100%
  height: 65px
  border: none
  padding: 0 20px
  font-family: 'Roboto', sans-serif
  font-size: 1.3125rem
  outline: 0

  &:active,
  &:focus
    box-shadow: inset 0px 3px 6px #00000029
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
      this.$emit("submit", this.payloadLogin);
    },
  },
};
</script>
