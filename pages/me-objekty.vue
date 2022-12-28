<template lang="pug">

  .page-container

    <MainMenu />

    .content-container


      h1.page-title.typo-main-title Mé objekty v aplikaci

      .section-category()
        .list-container.columns.is-multiline
          ObjektNahled(
            v-for="(objekt, index) in objekty"
            :key="objekt.id"
            :Id="objekt.id"
            :Timestamp="objekt.timestamp"
            :Uzivatel="objekt.user_email"
            :ObrazkyArray="objekt.obrazky[0].items"
          )




</template>

<style lang="sass">
.section-category
  margin-bottom: 1.5em

.user-form
  margin-bottom: 2rem
  input
    width: 100%
    height: 50px
    border: 1px solid black

    +from($tablet)


    +from($desktop)
      width: 50%

    +from($widescreen)

    +from($fullhd)
</style>

<script>
export default {
  async created() {
    await this.$store.dispatch("getVsechnyObjekty", {
      userId: this.currentLoggedUserId,
    });
  },

  mounted() {},

  computed: {
    currentLoggedUserId() {
      return this.$store.getters["auth/getCurrentUser"]?.uid;
    },

    loading() {
      return this.$store.state.loading;
    },

    objekty() {
      return this.$store.state.objekty.filter(
        (item) => item.user_id === this.currentLoggedUserId
      );
    },
  },

  data() {
    return {
      title: "",
    };
  },
};
</script>
