<template lang="pug">

</template>

<style lang="sass"></style>

<script>
export default {
  data() {
    return {
      subtitle: 'Odhlášení',
    };
  },

  async created() {
    const isUserSignedIn = this.$store.getters['auth/getCurrentUser']?.uid;

    if (isUserSignedIn) {
      await this.$store.dispatch('auth/logout');
      setTimeout(() => {
        this.$router.push('/prihlaseni/');
      }, 1000);
    } else {
      this.$router.push('/prihlaseni/');
    }
  },
};
</script>
