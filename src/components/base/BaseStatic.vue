<template>
  <q-btn
    class="base-icon-label"
    :ripple="false"
    dense
    flat
    color="primary"
    :icon="icon"
    :label="label"
    no-caps
  />
</template>
<script>
export default {
  props: {
    icon: String,
    label: String,
  },
};
</script>
