<template>
  <q-input
    :dense="dense"
    :bg-color="bgColor"
    :outlined="outlined && !borderless"
    :borderless="borderless"
    :modelValue="modelValue"
    :type="type"
    :label="label"
    @update:model-value="onChange"
  >
    <template v-for="slot in scopedSlots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" v-bind:props="props"></slot>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    modelValue: {},
    type: String,
    label: String,
    bgColor: String,
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    borderless: Boolean,
  },
  methods: {
    onChange(value) {
      console.func("components/base/BaseInput:methods.onChange", arguments);
      this.$emit("update:model-value", value);
    },
  },
  computed: {
    scopedSlots() {
      return Object.keys(this.$slots);
    },
  },
};
</script>
