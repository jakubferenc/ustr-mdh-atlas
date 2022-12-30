<template lang="pug">

.app-container

  <Header />

  main.main-container(role="main")
    .alert-message(v-if="isShowAlert")
      .error-message(v-if="errorMessage")
        span.message {{ errorMessage }}
      .success-message(v-if="successMessage")
        span.message {{ successMessage }}
      span.close(@click="closeMessage") Zavřít
    <Nuxt />


  #overlay-upload-progress.ui-widget__overlay.hidden
    .content

  <ProgressBar v-if="loading" :Zprava="loadingMsg" />

  .debug-bar(v-show="this.$config.dev")

  <Footer />

</template>
<style lang="sass" scoped>
.alert-message
  margin: 15px
  height: 50px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 12px
  position: relative
  .error-message,
  .success-message
    display: flex
    align-items: center
    justify-content: center
    width: 100%
  .success-message
    background-color: #80f080
    border: 1px solid #22b222
  .error-message
    background-color: #F08080
    border: 1px solid #B22222
  .message
    margin-bottom: 0
    background: none
  .close
    position: absolute
    right: 15px
    cursor: pointer
</style>
<script>
export default {
  data() {
    return {
      isShowAlert: false,
    };
  },
  middleware: 'auth',
  watch: {
    errorMessage(newVal, oldVal) {
      this.isShowAlert = true;
    },
    successMessage(newVal, oldVal) {
      this.isShowAlert = true;
    },
  },
  computed: {
    errorMessage() {
      return this.$store.state.alert.error;
    },
    successMessage() {
      return this.$store.state.alert.message;
    },
    loadingMsg() {
      return this.$store.state.loadingMsg;
    },

    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    closeMessage() {
      this.isShowAlert = false;
    },
  },
  async beforeCreate() {
    const isUserSignedIn = this.$store.getters['auth/getCurrentUser']?.uid;
    await this.$fire.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (!isUserSignedIn) {
          const uid = authUser.uid;
          this.$store.dispatch('auth/login', { authUser });
          this.$router.push('/');
        }
      } else {
        // user is logged out by firebase
        if (isUserSignedIn) {
          this.$store.dispatch('auth/logout');
        }
      }
    });
  },
};
</script>
