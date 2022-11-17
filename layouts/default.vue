<template lang="pug">

  .app-container

    .error-message(v-if="errorMessage") {{ errorMessage }}

    <Nuxt />

    #overlay-upload-progress.ui-widget__overlay.hidden
      .content

    <ProgressBar v-if="loading" :Zprava="loadingMsg" />

    .debug-bar.hidden


</template>
<style lang="sass" scoped>
.error-message
  display: flex
  margin: 15px
  height: 50px
  align-items: center
  justify-content: center
  background-color: #F08080
  border: 1px solid #B22222
  border-radius: 12px
</style>
<script>
export default {
  middleware: "auth",
  computed: {
    errorMessage() {
      return this.$store.state.alert.message;
    },
    loadingMsg() {
      return this.$store.state.loadingMsg;
    },

    loading() {
      return this.$store.state.loading;
    },
  },
  async beforeCreate() {
    console.log("hello from layout");
    const isUserSignedIn = this.$store.state.auth.user_logged?.uid;
    await this.$fire.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (!isUserSignedIn) {
          const uid = authUser.uid;
          console.log("test log in event", uid);
          this.$store.dispatch("auth/login", { authUser });
          this.$router.push("/");
        }
      } else {
        // user is logged out by firebase
        if (isUserSignedIn) {
          this.$store.dispatch("auth/logout");
          console.log("hello from logout");
          if (this.$route.path !== "/prihlaseni") {
            this.$router.push("/prihlaseni");
          }
        }
      }
    });
  },
};
</script>
