<template lang="pug">
.top-bar(v-if="size")
  .main-navigation.ui-navigation(role="navigation" aria-label="Primary" v-if="!isNavigationBack")
    a.button.button-prev.ui-navigation__item(@click="prev" :class="{invisible: this.position < 1}") Předchozí
    a.button.button-next.ui-navigation__item(@click="next" :class="{invisible: this.position !== 0 && this.position === this.size}") Další
  .main-navigation.ui-navigation(role="navigation" aria-label="Primary" v-else)
    a.ui-navigation__item(@click="historyBack($event)" href="#") Zpět
</template>

<style lang="sass" scoped>

.top-bar
  line-height: $top-bar-height
  height: $top-bar-height
  background: #fff
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  z-index: 2
  height: 100px
  box-shadow: 0px -6px 6px rgb(0 0 0 / 16%)

.ui-navigation
  display: flex
  align-items: center
  flex-flow: row wrap
  justify-content: space-between
  width: 100%
  padding: 0 15px
  height: 100%

  .ui-navigation__item
    display: inline-block
    padding: 0 .5rem
    background: #000
    text-align: center
    min-width: 150px
    height: 65px
    line-height: 65px
    width: 8vw
    color: #fff
    margin: 0
</style>

<script>
import { mapState } from 'vuex';

export default {
  props: [
    'slideContainerItemsRef',
    'sliderContainerRef',
    'startPosition',
    'isNavigationBack',
    'size',
  ],
  data() {
    return {
      selectedItemSelector: 'active',
      previousButtonSelector: 'button-prev',
      nextButtonSelector: 'button-next',
      position: this.startPosition || 0,
      debugMode: false,
      position: 0,
    };
  },
  computed: {
    ...mapState({
      novy_objekt: 'novy_objekt',
    }),
  },
  watch: {
    novy_objekt: {
      initialize: true,
      deep: true,
      handler(newVal) {
        newVal;
        this._refreshNavigation();
      },
    },
  },
  created() {},

  mounted() {
    if (this.isNavigationBack) {
      return;
    }
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
      window.scrollTo(0, 0);
    },

    historyBack(e) {
      e.preventDefault();

      history.back();
    },

    _setPosition(pos) {
      this.position = pos;
    },

    _setTransform(pos, $element) {
      $element.style.transform = 'translateX(calc(-100vw*' + pos + '))';
    },

    prev(e) {
      this.position = Math.max(this.position - 1, 0);
      this._setTransform(this.position, this.slideContainerItemsRef);

      console.log('previous slide', this.position);
      console.log('prev slide test size', this.size);

      this.$store.dispatch('setNovyObjektNavPozice', this.position);

      this._refreshNavigation();
    },

    next(e) {
      console.log('next slide', this.position);
      console.log('next slide test size', this.size);

      this.position = Math.min(this.position + 1, this.size);
      this._setTransform(this.position, this.slideContainerItemsRef);

      this.$store.dispatch('setNovyObjektNavPozice', this.position);

      this._refreshNavigation();
    },
  },
};
</script>
