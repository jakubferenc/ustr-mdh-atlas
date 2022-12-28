<template lang="pug">

.ui-widget__overlay
  .content {{Zprava}}

</template>

<style lang="sass" scoped></style>

<script>
export default {
  props: ["Zprava"],

  computed: {},
  data() {
    return {
      answer: "",
    };
  },
  mounted() {},

  watch: {},
  methods: {},
};
</script>
