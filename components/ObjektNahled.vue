<template lang="pug">

.object-thumb.option.ui-widget__photo
  NuxtLink.ui-gallery__link.object-thumb-photo(:to="objektDetailUrl")
    .actions(@click.prevent="toggleDropdownNav")
      .icon
        <font-awesome-icon icon="fa fa-ellipsis-v" />
      .dropdown(v-show="isDropdownNavOpen")
        .item <NuxtLink :to="objektDetailUrl">Zobrazit detail</NuxtLink>
        .item.remove(@click="removeObjectHandler") Odstranit objekt
    .photo-ratio
      img(v-if="hasImages()" :src="`${ObrazkyArray[0].realURL}`")
  .header(v-if="Misto")
    span.title {{Misto}}
  .metadata
    .username {{Uzivatel}}
    .timestamp {{Timestamp}}

</template>

<style lang="sass" scoped>


.object-thumb
  position: relative

  .photo-ratio
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  .object-thumb-photo
    background: lightgray
    position: relative
    display: block
    height: 0
    padding-top: 100%
    will-change: transform,box-shadow
    border-radius: 12px
    transition: color .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease

    &:hover
      box-shadow: 0 0.5333333333rem 0.8rem rgb(28 19 18 / 62%)
      transform: translate3d(0,-0.5333333333rem,0)

    .actions
      position: absolute
      top: 15px
      right: 15px
      width: 30px
      height: 40px
      background: #fff
      border-radius: 12px
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      transition: color .2s ease,transform .2s ease,box-shadow .2s ease,-webkit-transform .2s ease
      z-index: 3

      &:hover

      .dropdown
        background: #fff
        border-radius: 12px
        position: absolute
        top: calc(100% - 5px)
        right: 0
        min-width: 150px
        height: auto
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .item
          font-size: 14px
          line-height: 2em
          padding-bottom: 5px
          border-bottom: 1px solid rgba(0,0,0,.1)
          width: 100%
          text-align: center

          &.remove
            color: $warn-color-desaturated

    img
      width: 100%
      height: 100%
      object-fit: cover
      position: absolute
      top: 0
      left: 0
      border-radius: 12px


  .title
    font-weight: bold
</style>

<script>
export default {
  props: ['Misto', 'Uzivatel', 'ObrazkyArray', 'Timestamp', 'Id', 'IsShared'],

  computed: {
    objektDetailUrl() {
      if (this.IsShared) {
        return `/sdilet-objekt/${this.Id}/`;
      } else {
        return `/objekt/${this.Id}/`;
      }
    },
  },
  data() {
    return {
      answer: '',
      isDropdownNavOpen: false,
    };
  },
  mounted() {},

  watch: {},
  methods: {
    async removeObjectHandler() {
      const confirm = window.confirm('Chcete skutečně odstranit zvolený objekt?');

      if (confirm) {
        await this.$store.dispatch('removeObjekt', { id: this.Id });
      }
    },
    toggleDropdownNav() {
      this.isDropdownNavOpen = !this.isDropdownNavOpen;
    },
    hasImages() {
      return this.ObrazkyArray.length;
    },
  },
};
</script>
