<template>
  <q-btn-dropdown
    color="primary"
    no-caps
    :ripple="!link"
    :class="{ 'no-focus': link, 'base-btn-dropdown': true }"
    :flat="link"
    :dense="link"
    size="13px"
  >
    <slot></slot>
  </q-btn-dropdown>
</template>

<script>
export default {
  props: {
    link: {
      type: [Boolean],
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="sass">
.base-btn-dropdown .q-icon, .base-btn-dropdown .q-spinner
  font-size: 1.25em
</style>
