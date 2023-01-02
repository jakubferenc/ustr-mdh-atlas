<template lang="pug">
.form-input__toggle(
  :data-toggled="componentValue.toString()"
  @click="toggleInputState($event)"
)
  .form-input__toggled-state-bg()
  .form-input__options
    .form-input__option.false() Vypnuto
    .form-input__option.true() Zapnuto
</template>

<style lang="sass" scoped>
.form-input__toggle
  border-radius: 12px
  overflow: hidden
  background: lightgray
  height: 4rem
  min-width: 15rem
  position: relative
  cursor: pointer
  box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 10%)

  &[data-toggled="false"]
    .form-input__toggled-state-bg
      transform: translate3d(0,0,0)

  &[data-toggled="true"]
    .form-input__option.true
      color: rgba(255,255,255,.8)
      font-weight: bold
    .form-input__toggled-state-bg
      transform: translate3d(100%,0,0)
      background-color: $ok-color-desaturated

    &:hover
      .form-input__toggled-state-bg
        background-color: $ok-color-hover

.form-input__toggled-state-bg
  transition: background .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease
  position: absolute
  top: 0
  left: 0
  width: 50%
  height: 100%
  background: gray
.form-input__options
  display: flex
  flex-direction: row
  position: relative
  z-index: 1
  height: 100%

.form-input__option
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  flex: 1
  user-select: none
</style>

<script>
export default {
  props: {
    value: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    ButtonFalseText: {
      type: [Boolean, String],
      required: false,
      default: 'Vypnuto',
    },
    ButtonTrueText: {
      type: [Boolean, String],
      required: false,
      default: 'Zapnuto',
    },
  },
  data() {
    return {
      componentValue: null,
    };
  },
  created() {
    this.componentValue = this.value;
  },
  computed: {},

  methods: {
    toggleInputState(e) {
      this.componentValue = !this.componentValue;
      this.$emit('input', this.componentValue);
    },
  },
};
</script>
