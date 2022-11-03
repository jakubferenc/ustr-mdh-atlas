<template lang="pug">

  .app-container

    <Nuxt />

    #overlay-upload-progress.ui-widget__overlay.hidden
      .content

    <ProgressBar v-if="loading" :Zprava="loadingMsg" />

    .debug-bar.hidden


</template>


<script>
export default {

  computed: {

    loadingMsg() {
      return this.$store.state.loadingMsg;
    },

    loading() {
      return this.$store.state.loading;
    },

  },

}
</script>

