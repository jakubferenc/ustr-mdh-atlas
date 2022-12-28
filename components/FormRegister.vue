<template lang="pug">
.form-container.form--login-form
  .input-container
    label(for="form-email") Váš Email
    input(@keyup.enter.prevent="submitForm" type="email" id="form-email" name="email"  v-model="formData.email")
  .input-container
    label(for="form-email") Heslo
    input(@keyup.enter.prevent="submitForm" type="password" id="form-password" name="form-password" v-model="formData.password")
    .input-container
    label(for="form-email") Heslo znovu
    input(@keyup.enter.prevent="submitForm" type="password" id="form-password-again" name="form-password-again" v-model="formData.passwordAgain")

  .input-container.input-container--submit
    button.button.button-submit(@click="submitForm") Registrovat
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
import { passwordStrength } from "check-password-strength";

export default {
  data() {
    return {
      formData: {
        email: null,
        password: null,
        passwordAgain: null,
      },
    };
  },
  computed: {
    payloadRegister() {
      return {
        email: this.formData.email,
        password: this.formData.password,
        passwordAgain: this.formData.passwordAgain,
      };
    },
    zobrazitVsechnyObjekty() {
      return this.$route.query.vse === "1";
    },
  },

  methods: {
    submitForm() {
      if (this.payloadRegister.password !== this.payloadRegister.passwordAgain) {
        this.$emit("error", { message: "Hesla se neshodují" });
        return;
      }
      if (passwordStrength(this.payloadRegister.password).value !== "Strong") {
        this.$emit("error", { message: "Heslo je příliš slabé" });
        return;
      }
      this.$emit("submit", this.payloadRegister);
    },
  },
};
</script>
