<template lang="pug">
  .task.task__container.task__keywords.ui-widget(:class="classObject")
    .task__title.ui-widget__title #{Zadani}

    .task__options.ui-widget__list-keywords(v-if="MaId")
      a.option.ui-widget__keyword(@click="toggleKeyword($event)" href='#' v-for="keyword in KlicovaSlova" :key="keyword.id" :data-keyword-id="keyword.id" :data-keyword="keyword.title") {{keyword.title}}


    .task__options.ui-widget__list-keywords(v-else)
      a.option.ui-widget__keyword(@click="toggleKeyword($event)" href='#' v-for="(keyword, index) in KlicovaSlova" :key="keyword" :data-keyword-id="index" :data-keyword="keyword") {{keyword}}

</template>


<style lang="sass" scoped>





</style>

<script>
export default {
  props: ['Id', 'Zadani', 'Limit', 'Inline', 'KlicovaSlova', 'MaId'],
  computed: {

  },
  data() {
    return {
      classObject: {
        'inline': this.Inline
      },
      limitReal: this.Limit || this.KlicovaSlova.length,
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
