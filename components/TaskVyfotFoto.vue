<template lang="pug">

  .task-photo-container

    .task.task__container.task__camera.ui-widget(v-for="n in parseInt(PocetFotek)" :key="n")

      .task__answer.ui-widget__camera.aspect-ratio-padding

        .aspect-ratio-container

          input(@change="previewImage($event)" type='file' :data-id="`${Id}_${n}`" :name="`photo-${Id}_${n}`" accept='image/*'  class='file-input')

          .output-container
            .message-to-upload Kliknutím zde vyberete nebo vyfotíte fotografii
            img.output

      .task__title.ui-widget__title {{Zadani}}


</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"



  .task__camera.ui-widget
    position: relative
    cursor: pointer

    .task__title.ui-widget__title
      position: absolute
      top: 100%


    .aspect-ratio-padding
      height: 0
      padding-top: 100%
      background-color: #eee
      border: 2px dashed #333
      border-radius: 15px
      overflow: hidden


    .aspect-ratio-container
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0

    input
      font-size: 12px
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 2
      opacity: 0
      cursor: pointer


    .output-container
      text-align: center
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1

      .message-to-upload
        width: 100%
        position: absolute
        top: 40%
        z-index: 1

      .output
        position: relative
        z-index: 2


    .output-container,
    .output
      height: 100%

    .output
      object-fit: contain
      border: none




</style>

<script>
export default {
    props: ['Id', 'Zadani', 'PocetFotek', 'NadpisUkolu'],
    computed: {

    },
    data() {
      return {
        arrayOfImageObjects: []
      }
    },
    mounted() {

    },

  watch: {

  },
  methods: {

    updateStore() {

      this.$store.dispatch("setNovyObjekt", {

          [this.Id]: this.arrayOfImageObjects

      });

    },

    async previewImage(e) {

      const files = e.target.files;

      const $thisImagePreview = e.target.closest('.task__camera').querySelector('img.output');

      if (files) {

        const blobURLObj = URL.createObjectURL(files[0]);

        $thisImagePreview.src = blobURLObj;


        this.arrayOfImageObjects = [...this.arrayOfImageObjects, {
          id:  e.target.dataset.id,
          url: blobURLObj,
          type: files[0].type,
          name: files[0].name,
        }];

        this.updateStore();

      }

    }


  }


}
</script>
