<template>
  <q-item
    :class="{ 'base-checkbox no-wrap': true, inline: !noInline }"
    tag="label"
    dense
  >
    <q-item-section style="min-width: auto; padding-right: 0.5em" top avatar>
      <q-checkbox
        dense
        :model-value="modelValue"
        @update:model-value="onChange"
      />
    </q-item-section>
    <q-item-section class="justify-start base-checkbox-label">
      <slot>
        <div>{{ label }}</div>
      </slot>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    label: {
      required: false,
      type: [String],
    },
    noInline: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:model-value"],
  methods: {
    onChange(val) {
      console.func(
        "components/base/BaseCheckbox:methods.onChange()",
        arguments
      );
      this.$emit("update:model-value", val);
    },
  },
};
</script>

<style lang="scss">
.base-checkbox {
  .q-focus-helper {
    display: none;
  }
  .base-checkbox-label {
    :first-child {
      min-height: 20px;
    }
  }
}
</style>
