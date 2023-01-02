<template lang="pug">
.form-partial-container
  .input-container
    label(for="") Aktivovat sdílení procházky?
    FormInputToggle(
      ref="FormInputToggleShareProchazka"
      v-model="formData.toggleShareProchazka"
      ButtonFalseText="Vypnuto"
      ButtonTrueText="Zapnuto"
      @input="emitChangeHandler"
    )
  .input-container(v-if="formData.toggleShareProchazka")
    label Vygenerovaný odkaz pro sídlení <font-awesome-icon icon="fa fa-solid fa-link" />
    input(readonly :value="publicProchazkaShareLink")
</template>

<style lang="sass" scoped>
.form-partial-container
  width: 100%
.input-container
  margin-bottom: 2rem
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
  box-shadow: inset 0px 3px 6px #00000029
</style>

<script>
import { getPublicProchazkaShareLink } from '@/utils/functions';
export default {
  props: {
    ProchazkaId: {
      type: String,
      required: true,
    },
    UserProfilePublicItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      windowObjectLocation: null,
      formData: {
        toggleShareProchazka: this.UserProfilePublicItems.includes(this.ProchazkaId),
      },
    };
  },
  watch: {
    UserProfilePublicItems(newItems, oldItems) {
      this.formData.toggleShareProchazka = newItems.includes(this.ProchazkaId);
    },
  },
  created() {
    this.$emit('input', this.formData);
  },
  mounted() {
    this.windowObjectLocation = window.location.origin;
  },
  computed: {
    publicProchazkaShareLink() {
      if (!this.windowObjectLocation) return false;
      return this.getPublicProchazkaShareLink(
        this.windowObjectLocation,
        this.ProchazkaId,
        this.currentLoggedUserId
      );
    },
    currentLoggedUserId() {
      return this.$store.getters['auth/getCurrentUser']?.uid;
    },
  },
  methods: {
    getPublicProchazkaShareLink,
    emitChangeHandler(e) {
      this.$emit('input', this.formData);
    },
  },
};
</script>
