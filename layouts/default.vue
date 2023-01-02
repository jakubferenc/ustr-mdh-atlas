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
    background-color: $ok-color
    border: 1px solid $ok-color-desaturated-hover
    color: rgba(255,255,255,.9)
  .error-message
    background-color: $warn-color
    border: 1px solid $warn-color-desaturated-hover
    color: rgba(255,255,255,.9)
  .message
    margin-bottom: 0
    background: none
  .close
    position: absolute
    right: 15px
    cursor: pointer
    color: rgba(255,255,255,.9)
</style>
<script>
export default {
  data() {
    return {
      isShowAlert: false,
      messageTimer: null,
      messageTimerInterval: 5000,
    };
  },
  middleware: 'auth',
  watch: {
    errorMessage(newVal, oldVal) {
      if (!newVal) return;
      this.isShowAlert = true;

      this.messageTimer = setTimeout(() => {
        this.closeMessage();
      }, this.messageTimerInterval);
    },
    successMessage(newVal, oldVal) {
      if (!newVal) return;
      this.isShowAlert = true;
      this.messageTimer = setTimeout(() => {
        this.closeMessage();
      }, this.messageTimerInterval);
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
      this.$store.dispatch('alert/reset');
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
