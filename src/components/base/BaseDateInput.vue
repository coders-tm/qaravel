<template>
  <q-input class="base-date-input" readonly :modelValue="selected">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            @update:model-value="onChange"
            today-btn
            :range="range"
            v-model="date"
            first-day-of-week="1"
          >
            <div class="row items-center justify-end q-gutter-sm">
              <div>
                <q-toggle size="sm" v-model="range" dense label="Range" />
              </div>
              <q-btn
                label="Clear"
                color="primary"
                @click="onClear"
                flat
                v-close-popup
              />
              <q-btn label="OK" color="primary" flat v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    modelValue: [String, Object],
  },
  data() {
    return {
      range: false,
      date: this.modelValue,
    };
  },
  emits: ["update:model-value"],
  methods: {
    onChange(value) {
      console.func("components/base/BaseDateInput:methods.onChange", arguments);
      this.$emit("update:model-value", value);
    },
    onClear() {
      console.func("components/base/BaseDateInput:methods.onClear", arguments);
      if (!this.date) return;
      this.date = undefined;
      this.range = false;
      this.$emit("update:model-value", undefined);
    },
  },
  computed: {
    selected() {
      return this.range &&
        this.modelValue &&
        typeof this.modelValue === "object" &&
        "from" in this.modelValue
        ? `${this.modelValue.from} - ${this.modelValue.to}`
        : this.modelValue;
    },
  },
};
</script>
