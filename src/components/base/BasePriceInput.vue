<template>
  <q-field
    dense
    :outlined="!borderless"
    :borderless="borderless"
    :model-value="modelValue"
    @update:model-value="onChange"
  >
    <template v-slot:control="{ id, modelValue, emitValue }">
      <number
        :id="id"
        class="q-field__input"
        :model-value="modelValue"
        @update:model-value="emitValue"
        v-bind="{
          prefix: '£',
          precision: 2,
          minimumFractionDigits: 2,
          max: max,
          min: min,
        }"
        :placeholder="placeholder"
      />
    </template>
  </q-field>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    placeholder: {
      required: false,
      type: [String],
      default: "0.00",
    },
    max: [Number, String, Boolean],
    min: [Number, String, Boolean],
    borderless: Boolean,
  },
  emits: ["update:model-value"],
  methods: {
    onChange(val) {
      console.func(
        "components/base/input/base-price:methods.onChange()",
        arguments
      );
      this.$emit("update:model-value", val);
    },
  },
};
</script>
