<template>
  <q-avatar
    :rounded="!square"
    :square="square"
    :size="`${size}px`"
    :font-size="`${size / 2}px`"
    :class="{
      'base-thumbnail-widget': true,
      flat: flat,
    }"
  >
    <template v-if="media">
      <q-img v-if="media.is_image" loading="lazy" :src="media.url" contain>
        <template v-slot:loading>
          <q-spinner-orbit color="white" />
        </template>
      </q-img>
      <q-icon v-else-if="media.icon" :name="`fad fa-file-${media.icon}`" />
      <q-icon v-else name="fad fa-image" />
    </template>
    <template v-else>
      <q-icon name="fad fa-image" />
    </template>
    <slot></slot>
  </q-avatar>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      required: false,
    },
    size: {
      type: [Number, String],
      required: false,
      default: 50,
    },
    square: {
      type: [Boolean],
      required: false,
      default: false,
    },
    rounded: {
      type: [Boolean],
      required: false,
      default: true,
    },
    flat: {
      type: [Boolean],
      required: false,
      default: false,
    },
  },
};
</script>
<style lang="sass" scoped>
.q-avatar
  &.flat
    border: none
  border: 1px solid $separator-color
</style>
