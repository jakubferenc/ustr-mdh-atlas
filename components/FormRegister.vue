<template lang="pug">
.form-container.form--login-form
  .input-container
    label(for="form-email") Váš Email
    input(@keyup.enter.prevent="submitForm" type="email" id="form-email" name="email"  v-model="formData.email")
  .input-container
    label(for="form-password") Heslo
    input(ref="inputPassword" @keyup.enter.prevent="submitForm" :type="passwordShow ? 'text' : 'password' " id="form-password" name="form-password" v-model="formData.password")
  .input-container
    label(for="form-password-again") Heslo znovu
    input(ref="inputPasswordAgain" @keyup.enter.prevent="submitForm" :type="passwordShow ? 'text' : 'password' " id="form-password-again" name="form-password-again" v-model="formData.passwordAgain")
  .input-container
    label(for="toggle-password") Zobrazit heslo
    input(type="checkbox" id="toggle-password" @click="togglePasword")
  .input-container
    h3 Pravidla pro heslo:
    p &mdash; Heslo musí obsahovat aspoň jednu číslici
  .input-container.input-container--submit
    button.button.button-submit(@click="submitForm") Registrovat
</template>

<style lang="sass" scoped>
#toggle-password
  margin-left: .5em
.input-container
  input[type="text"],
  input[type="password"],
  input[type="email"]
    background-color: #fff
    border-radius: 12px
    width: 100%
    height: 65px
    border: 1px solid transparent
    padding: 0 20px
    font-family: 'Roboto', sans-serif
    font-size: 1.3125rem
    outline: 0

    &:active,
    &:focus
      box-shadow: inset 0px 3px 6px #00000029
</style>

<script>
import { passwordStrength } from 'check-password-strength';

export default {
  data() {
    return {
      passwordShow: false,
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
      return this.$route.query.vse === '1';
    },
  },

  methods: {
    togglePasword() {
      this.passwordShow = !this.passwordShow;
    },
    submitForm() {
      if (this.payloadRegister.password !== this.payloadRegister.passwordAgain) {
        this.$emit('error', { message: 'Hesla se neshodují' });
        return;
      }
      if (!passwordStrength(this.payloadRegister.password).contains.includes('number')) {
        this.$emit('error', {
          message: 'Heslo je příliš slabé. Heslo musí obsahovat aspoň jednu číslici.',
        });
        return;
      }
      this.$emit('submit', this.payloadRegister);
    },
  },
};
</script>
