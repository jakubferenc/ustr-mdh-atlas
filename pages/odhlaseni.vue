<template lang="pug">

</template>

<style lang="sass"></style>

<script>
export default {
  data() {
    return {
      subtitle: "Odhlášení",
    };
  },

  async beforeCreate() {
    await this.$fire.auth.signOut();

    const isUserSignedIn = this.$store.state.auth.user_logged?.uid;
    if (isUserSignedIn) {
      this.$store.dispatch("auth/logout");
      console.log("hello from logout");
      if (this.$route.path !== "/prihlaseni") {
        setTimeout(() => {
          this.$router.push("/prihlaseni");
        }, 2000);
      }
    }
  },
};
</script>
