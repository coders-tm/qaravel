<template>
  <q-input
    class="base-time-input"
    dense
    borderless
    :modelValue="modelValue"
    @update:mode-value="onChange"
    @click.stop
    mask="time"
    style="width: 90px"
  >
    <template v-slot:prepend>
      <q-icon @click.stop name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time @update:model-value="onChange" :modelValue="modelValue">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  methods: {
    onChange(value) {
      console.func("components/base/BaseTimeInput:methods.onChange", arguments);
      this.$emit("update:model-value", value);
    },
  },
};
</script>
