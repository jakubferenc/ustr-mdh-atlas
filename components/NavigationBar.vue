<template lang="pug">
  .top-bar
    .main-navigation.ui-navigation(role="navigation" aria-label="Primary" v-if="!isNavigationBack")
      a.button-prev.ui-navigation__item(href="#" :class="{invisible: this.position < 1}") Předchozí
      a.button-next.ui-navigation__item(href="#" :class="{invisible: this.size && this.size < 1}") Další
    .main-navigation.ui-navigation(role="navigation" aria-label="Primary" v-else)
      a.ui-navigation__item(@click="historyBack($event)" href="#") Zpět
</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

.top-bar
  line-height: $top-bar-height
  height: $top-bar-height
  background: #eee
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 2

.ui-navigation
  display: flex
  align-items: center
  flex-flow: row wrap
  justify-content: space-between
  width: 100%
  .ui-navigation__item
    display: inline-block
    padding: 0 .5rem
    background: #ccc
    text-align: center
    min-width: 5rem
    &.previous
    &.next

</style>

<script>
export default {
    props: ['slideContainerItemsSelector', 'itemSelector', 'startPosition', 'isNavigationBack'],

    data() {
      return {
        selectedItemSelector: 'active',
        previousButtonSelector: 'button-prev',
        nextButtonSelector: 'button-next',
        position: this.startPosition || 0,
        debugMode: false,
        $next: null,
        $prev: null,
        $containerItemsSelector: null,
        $items: null,
        size: null,
        position: 0,

      }
    },
    created() {
      this.$nuxt.$on('refresh-navigation', () => {

        this.$nextTick(() => {

          this._refreshNavigation();

        });

      });
    },
    beforeDestroy(){
      this.$nuxt.$off('refresh-navigation')
    },
    mounted() {

      if (this.isNavigationBack) {
        return;
      }


      this.$prev = this.$el.getElementsByClassName(this.previousButtonSelector)[0];
      this.$next = this.$el.getElementsByClassName(this.nextButtonSelector)[0];
      this.$containerItemsSelector = document.querySelector(this.slideContainerItemsSelector);

      this.$items = this.$containerItemsSelector.querySelectorAll(this.itemSelector);
      this.size = this.$items.length;


      this.$prev.addEventListener('click', (e) => {
        e.preventDefault();
        this.prev();
      });

      this.$next.addEventListener('click', (e) => {
        e.preventDefault();

        this.next();
      });

      // keyboard event
      document.addEventListener('keydown', (e) => {

        const keyCode = e.keyCode;

        if (keyCode === 37) {
          this.prev();
        }

        if (keyCode === 39) {
          this.next();
        }

      });


    },
  methods: {

    _refreshNavigation() {

      this._refreshDom();


      if (this.position === 0) {
        this.$prev.classList.add('invisible');
      }

      if (this.position < this.size - 1 && this.$next.classList.contains('invisible')) {
        this.$next.classList.remove('invisible');
      }

      if (this.position === this.size - 1) {
        this.$next.classList.add('invisible');
      }

      if (this.position > 0 &&  this.$prev.classList.contains('invisible')) {
        this.$prev.classList.remove('invisible');
      }


    },

    _refreshDom() {

        this.$prev = this.$el.getElementsByClassName(this.previousButtonSelector)[0];
        this.$next = this.$el.getElementsByClassName(this.nextButtonSelector)[0];
        this.$containerItemsSelector = document.querySelector(this.slideContainerItemsSelector);

        this.$items = this.$containerItemsSelector.querySelectorAll(this.itemSelector);
        this.size = this.$items.length;

    },

    historyBack(e) {

      e.preventDefault();

      history.back();

    },

    _setPosition(pos) {
        this.position = pos;
      },

    _setTransform(pos, $element) {
      $element.style.transform = 'translateX(calc(-100vw*'+pos+'))';

    },



    prev() {
      this.position = Math.max(this.position - 1, 0);
      this._setTransform(this.position, this.$containerItemsSelector);

      console.log("previous slide", this.position);

      if (this.position === 0) {
        this.$prev.classList.add('invisible');
      }

      if (this.position < this.size - 1 && this.$next.classList.contains('invisible')) {
        this.$next.classList.remove('invisible');
      }

      this.$store.dispatch("setNovyObjektNavPozice", this.position);

      this._refreshDom();

    },

    next() {

      console.log("next slide", this.position);

      this.position = Math.min(this.position + 1, this.size - 1);
      this._setTransform(this.position, this.$containerItemsSelector);

      if (this.position === this.size - 1) {
        this.$next.classList.add('invisible');
      }

      if (this.position > 0 &&  this.$prev.classList.contains('invisible')) {
        this.$prev.classList.remove('invisible');
      }

      this.$store.dispatch("setNovyObjektNavPozice", this.position);

      this._refreshDom();

    }


  }


}
</script>
