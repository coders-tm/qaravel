<template>
  <q-img :ratio="ratio" class="thumbnail" :src="src" />
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
    },
    ratio: {
      type: Number,
      default: () => 16 / 9,
    },
  },
  computed: {
    src() {
      return this.media ? this.media.url : '/img/placeholder.png';
    },
  },
};
</script>
