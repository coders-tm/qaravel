<template>
  <q-tooltip :content-class="'bg-' + color" v-if="position == 'left'" anchor="center left" self="center right" :offset="[10, 10]">
    <slot>Tooltip instruction</slot>
  </q-tooltip>
  <q-tooltip :content-class="'bg-' + color" v-else-if="position == 'right'" anchor="center right" self="center left" :offset="[10, 10]">
    <slot>Tooltip instruction</slot>
  </q-tooltip>
  <q-tooltip :content-class="'bg-' + color" v-else-if="position == 'bottom'" anchor="bottom middle" self="top middle" :offset="[5, 5]">
    <slot>Tooltip instruction</slot>
  </q-tooltip>
  <q-tooltip :content-class="'bg-' + color" v-else anchor="top middle" self="bottom middle" :offset="[5, 5]">
    <slot>Tooltip instruction</slot>
  </q-tooltip>
</template>

<script>
export default {
  props: {
    position: {
      required: false,
      type: String,
      default: 'top'
    },
    color: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>
