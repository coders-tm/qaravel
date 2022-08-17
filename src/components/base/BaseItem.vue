<template>
  <q-item
    clickable
    v-close-popup
    :class="{
      'base-item text-weight-medium rounded-borders': true,
      link: link,
    }"
  >
    <slot>
      <q-item-section v-if="icon" style="min-width: auto" avatar>
        <q-icon :color="iconColor" size="18px" :name="icon" />
      </q-item-section>
      <q-item-section>{{ label }}</q-item-section>
    </slot>
  </q-item>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
    iconColor: String,
    link: Boolean,
  },
};
</script>
