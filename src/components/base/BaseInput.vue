<template>
  <q-input
    :dense="dense"
    :bg-color="bgColor"
    :outlined="outlined"
    :modelValue="modelValue"
    :type="type"
    :label="label"
    @update:model-value="onChange"
  />
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
  },
  methods: {
    onChange(value) {
      console.func("components/base/BaseInput:methods.onChange", arguments);
      this.$emit("update:model-value", value);
    },
  },
};
</script>
