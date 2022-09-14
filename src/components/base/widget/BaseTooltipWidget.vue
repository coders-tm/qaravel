<template>
  <q-tooltip
    class="base-tooltip-widget"
    :content-class="'bg-' + color"
    :anchor="anchor"
    :self="self"
    :offset="offset"
  >
    <slot>Tooltip instruction</slot>
  </q-tooltip>
</template>

<script>
export default {
  props: {
    position: {
      required: false,
      type: String,
      default: 'top',
    },
    color: {
      required: false,
      type: String,
      default: '',
    },
  },
  computed: {
    anchor() {
      var anchor = 'top middle';
      switch (this.position) {
        case 'left':
          anchor = 'center left';
          break;
        case 'right':
          anchor = 'center right';
          break;
        case 'bottom':
          anchor = 'bottom middle';
          break;
      }
      return anchor;
    },
    self() {
      var self = 'bottom middle';
      switch (this.position) {
        case 'left':
          self = 'center right';
          break;
        case 'right':
          self = 'center left';
          break;
        case 'bottom':
          self = 'top middle';
          break;
      }
      return self;
    },
    offset() {
      var offset = [5, 5];
      switch (this.position) {
        case 'left':
        case 'right':
          offset = [10, 10];
          break;
      }
      return offset;
    },
  },
};
</script>
