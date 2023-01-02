<template lang="pug">
.form-partial-container
  .input-container
    label(for="form-email") Aktivovat sdílení procházky?
    FormInputToggle(
      ref="FormInputToggleShareProchazka"
      v-model="formData.toggleShareProchazka"
      ButtonFalseText="Vypnuto"
      ButtonTrueText="Zapnuto"
      @input="emitChangeHandler"
    )
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
export default {
  data() {
    return {
      formData: {
        toggleShareProchazka: false,
      },
    };
  },
  computed: {},
  methods: {
    emitChangeHandler(e) {
      this.$emit('input', this.formData);
    },
  },
};
</script>
