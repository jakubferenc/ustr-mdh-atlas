<template lang="pug">
  .task.task__container.task__keywords.ui-widget(:class="classObject")
    .task__title.ui-widget__title #{Zadani}

    .task__options.ui-widget__list-keywords
      a.option.ui-widget__keyword(@click="toggleKeyword($event)" href='#' v-for="(keyword, index) in moznostiPrepared" :key="keyword.id" :data-keyword-id="keyword.id" :data-keyword="keyword.title") {{keyword.title}}

</template>


<style lang="sass" scoped>





</style>

<script>
export default {
  props: ['Id', 'Zadani', 'Limit', 'Inline', 'MoznostiContainer'],
  computed: {

    moznostiPrepared() {

      if (this.MoznostiContainer.autoGenerateId && this.MoznostiContainer.autoGenerateId == 'true') {

        if (!this.MoznostiContainer.slug) {
          throw new Exception('For autogenerating IDs, you need to pass the "Slug" variable into the component');
        }

        return this.MoznostiContainer.items.map((item, index) => {

          return {

            id: `${this.Id}-${this.MoznostiContainer.slug}-${index}`,
            title: title,

          }

        });

      } else {

        return this.MoznostiContainer.items;

      }

    },

  },
  data() {
    return {
      classObject: {
        'inline': this.Inline
      },
      limitReal: this.Limit || this.MoznostiContainer.items.length,
      selectedItems: [],
      activeClass: 'active',
      $uiWidgetKeywords: [],
    }
  },
  mounted() {


    this.$uiWidgetKeywords = this.$el.querySelectorAll('.ui-widget__keyword');



  },
  methods: {

    updateStore() {


      this.$store.dispatch("setNovyObjekt", {


        [this.Id]: this.selectedItems


      });

    },

    toggleKeyword(e) {

      e.preventDefault();


      if (this.limitReal) {

        if (this.limitReal == 1) {


          // this is purely for a better user experience
          // when the limit is set to 1, we want the user not to toggle off the active item and then select another one
          // instead, we want the selected item automatically be selected (highlighted) and the current active one to be automatically deselected
          if (!e.target.classList.contains(this.activeClass)) {


            Array.from(this.$uiWidgetKeywords)
              .filter(item => item.classList.contains(this.activeClass))
              .forEach(item => item.classList.remove(this.activeClass));

            e.target.classList.add(this.activeClass);

          }


        } else {

          if (this.selectedItems.length < this.limitReal) {

            e.target.classList.toggle(this.activeClass)

          } else {

            if (e.target.classList.contains(this.activeClass)) {
              e.target.classList.toggle(this.activeClass);
            }

          }

        }


      } else {
        e.target.classList.toggle(this.activeClass)
      }


      this.selectedItems = Array.from(this.$uiWidgetKeywords)
        .filter(item => item.classList.contains(this.activeClass))
        .map((item) => item.dataset.keyword);


      this.updateStore();

    },

  }


}
</script>
