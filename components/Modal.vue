<template lang="pug">
aside.u-modal
  .u-modal__wrapper
    .u-modal__in
      .u-modal__body
        header.u-modal__body__header
          h5.u-modal__title.typo-subtitle(v-if="Title") {{ Title }}
        .u-modal__body__content
          <slot name="form" :checkChanged="checkChanged"></slot>
        footer.u-modal__body__footer
          .button.button-short(@click="closeModalHandler") Zavřít
          .button.button-short.button-ok.desaturated(@click="submitModalHandler") Potvrdit
</template>
<style lang="sass" scoped>
.u-modal
  background-color: rgba(0,0,0,.1)
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  z-index: 9
  display: flex
  align-items: center
  justify-content: center

  .u-modal__wrapper
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 75%
    +from($desktop)
      width: 50%
    +from($widescreen)
      width: 33%

  .u-modal__in
    padding-top: 100%
  .u-modal__body
    background-color: #fff
    position: absolute
    top: 0
    left: 0
    width: 100%
    border-radius: 12px
    overflow: hidden
    box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 12%)
    display: flex
    justify-content: space-between
    flex-direction: column
    min-height: 100%

  .u-modal__body__header
    height: 4rem
    display: flex
    align-items: center
    justify-content: center
    border-bottom: 1px solid rgba(0,0,0,.2)
    flex-direction: column
    padding: 0 15px
    .u-modal__title
      text-align: center
      color: rgba(0,0,0,.35)
  .u-modal__body__content
    padding: 15px
    display: flex
    justify-content: flex-start
    align-items: flex-start
    flex: 1
  .u-modal__body__footer
    padding: 15px
    display: flex
    justify-content: space-between
</style>
<script>
import { truncate } from 'lodash';
export default {
  props: {
    Title: {
      type: String,
      required: false,
      default: '',
    },
  },
  async asyncData({ params, error, payload, store }) {},
  mounted() {},
  methods: {
    checkChanged(newFormData) {
      this.formData = newFormData;
      this.$emit('input', this.formData);
    },
    closeModalHandler(e) {
      this.$emit('close');
    },
    submitModalHandler(e) {
      this.$emit('submit', this.formData);
    },
  },
  data() {
    return {
      formData: {},
    };
  },

  head() {
    return {};
  },
};
</script>
