<template>
  <span :class="classList">
    {{ value }}
  </span>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    hasSignOff: Boolean,
  },
  computed: {
    classList() {
      if (!this.hasSignOff) return "";
      if (this.value <= 39) {
        return "text-red";
      } else if (this.value <= 59) {
        return "text-warning";
      } else {
        return "text-positive";
      }
    },
  },
};
</script>
