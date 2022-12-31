<template lang="pug">
.task.task__gallery.ui-widget(v-if="ZdrojeObjekt")
  .columns.is-multiline
    .column(v-for="(imageObj, index) in ZdrojeObjekt" :index="index" :class="['is-half-tablet', columnsClass]")
      .title(v-if="imageObj.title") {{imageObj.title}}
      img(
        v-if="ProchazkaPath"
        :src="`${ProchazkaPath}${imageObj.src}`"
        :alt="imageObj.title"
        :data-title="imageObj.title"
      )
      .desc(v-if="imageObj.desc && imageObj.desc != '' ") {{imageObj.desc}}
      .source(v-if="imageObj.source && imageObj.source != '' ") Zdroj: {{imageObj.source}}

</template>

<style lang="sass" scoped>
.source
  font-style: italic
  font-size: .9rem

.task__gallery
  margin-top: 1rem
</style>

<script>
export default {
  props: ['Id', 'ZdrojeObjekt', 'Sloupce', 'ProchazkaPath'],
  computed: {},

  data() {
    let classNameColumns = undefined;

    if (this.Sloupce == 2) {
      classNameColumns = 'is-half-desktop';
    } else if (this.Sloupce == 3) {
      classNameColumns = 'is-one-third-desktop';
    } else if (this.Sloupce == 4) {
      classNameColumns = 'is-one-quarter-desktop';
    } else if (this.Sloupce == 1) {
      classNameColumns = 'is-full-desktop';
    }

    return {
      columnsClass: classNameColumns,
    };
  },
  mounted() {},

  methods: {},
};
</script>
