<template lang="pug">
  .task.task__container.task__textfield.ui-widget
    .task__title.ui-widget__title(v-if="Nadpis") {{Nadpis}}
    .task__answer.ui-widget__textfield
      input(@input="updateStore()" type="text" :id="Id" :placeholder="Placeholder" v-model.trim="answer")

</template>

<style lang="sass" scoped></style>

<script>
export default {
  props: ['Id', 'Zadani', 'Nadpis', 'Inline', 'Placeholder'],
  computed: {},

  data() {
    return {
      answer: '',
    };
  },
  mounted() {},

  watch: {
    answer() {
      this.updateStore();
    },
  },
  methods: {
    updateStore() {
      this.$emit('value', { id: this.Id, answer: this.answer });
    },
  },
};
</script>
