<template>
  <div class="base-label flex items-center">
    <div class="text-label">
      <slot>{{ title }}</slot>
      <span v-if="required" class="q-ml-xs">*</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    required: Boolean,
  },
};
</script>
