<template>
  <q-btn
    color="primary"
    no-caps
    :ripple="!link"
    :class="{
      'base-btn__no-focus btn-link': link,
      'has-icon': icon,
      'no-icon': !icon,
      'base-btn': true,
      'vertical-align-middle': verticalMiddel,
    }"
    :flat="link"
    :dense="link"
    :icon="icon"
    size="13px"
  >
    <slot></slot>
  </q-btn>
</template>

<script>
export default {
  props: {
    link: {
      type: [Boolean],
      required: false,
      default: false,
    },
    icon: String,
    verticalMiddel: Boolean,
  },
};
</script>

<style lang="sass">
.base-btn
  &.vertical-align-middle
    padding: 9px 16px
    vertical-align: middle
  .q-icon, .q-spinner
    font-size: 1.25em
</style>
