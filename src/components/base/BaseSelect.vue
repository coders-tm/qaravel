<template>
  <q-select
    ref="baseSelect"
    class="base-select"
    v-model="value"
    :placeholder="placeholder"
    :options="options"
    :bgColor="bgColor"
    :useChips="useChips"
    :useInput="useInput"
    :multiple="multiple"
    :mapOptions="mapOptions"
    :inputDebounce="inputDebounce"
    :debounce="debounce"
    :newValueMode="newValueMode"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :optionsDense="optionsDense"
    popup-content-class="q-pa-sm base-dropdown"
    @update:model-value="onChange"
    @filter="onFilter"
    @new-value="onNewValue"
  >
    <template v-if="icon" v-slot:prepend>
      <q-icon size="xs" :name="icon" />
    </template>
    <template v-if="!useInput && showPlaceholder" v-slot:selected>
      <div class="text-grey-8">{{ placeholder }}</div>
    </template>
    <template v-if="useFilter" v-slot:before-options>
      <slot name="before-options">
        <q-input
          class="q-mb-sm base-dropdown-filter"
          @update:model-value="onLoadFromServer"
          placeholder="Search"
          dense
          outlined
          v-model="filter"
          type="text"
          input-debounce="500"
          debounce="500"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fal fa-search" />
          </template>
          <template v-if="newValueMode && filter" v-slot:append>
            <q-btn
              icon="control_point"
              size="sm"
              color="positive"
              flat
              round
              dense
              @click="onCreate"
            />
          </template>
        </q-input>
      </slot>
    </template>
    <template v-slot:after-options>
      <slot name="after-options"></slot>
      <slot name="button" v-bind:onCreate="onCreate">
        <template v-if="newValueMode && filter">
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-btn
                flat
                no-caps
                class="add-button"
                align="left"
                icon="fad fa-plus-circle"
                :label="`Add ${filter}`"
                @click="onCreate"
              />
            </q-item-section>
          </q-item>
        </template>
      </slot>
    </template>
    <template v-slot:no-option>
      <slot name="no-option">
        <q-input
          v-if="!useInput"
          class="q-mb-sm base-dropdown-filter"
          @update:model-value="onLoadFromServer"
          placeholder="Search"
          dense
          outlined
          v-model="filter"
          type="text"
          input-debounce="500"
          debounce="500"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fal fa-search" />
          </template>
        </q-input>
        <q-item v-close-popup clickable class="no-options">
          <q-item-section class="text-grey">{{
            noOptionMessage
          }}</q-item-section>
        </q-item>
      </slot>
      <slot name="button" v-bind:onCreate="onCreate">
        <template v-if="newValueMode && filter">
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-btn
                flat
                no-caps
                class="add-button"
                align="left"
                icon="fad fa-plus-circle"
                :label="`Add ${filter}`"
                @click="onCreate"
              />
            </q-item-section>
          </q-item>
        </template>
      </slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-select>
</template>

<script>
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);

export default {
  props: {
    modelValue: {
      required: true,
    },
    filterMethod: Function,
    placeholder: String,
    mapOptions: {
      required: false,
      type: [Boolean],
      default: true,
    },
    optionsDense: {
      required: false,
      type: [Boolean],
      default: true,
    },
    icon: {
      required: false,
      type: [String, Boolean],
      default: false,
    },
    noOptionMessage: {
      required: false,
      type: [String],
      default: "No option found.",
    },
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode,
    },
    onNewValue: Function,
    preventDefault: Boolean,
    useFilter: Boolean,
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    query: {
      required: false,
      type: [Function],
      default: () => (val) => {
        return {
          filter: val,
          limit: 5,
        };
      },
    },
    multiple: Boolean,
    bgColor: String,
    inputDebounce: {
      type: [Number, String],
      default: 500,
    },
    debounce: {
      type: [Number, String],
      default: 500,
    },
  },
  emits: ["update:model-value", "new-value"],
  data() {
    return {
      value: this.modelValue,
      options: [],
      filter: "",
    };
  },
  methods: {
    onFilter(val, update, abort) {
      console.func("components/base/BaseSelect:methods.onFilter()", arguments);
      if (!this.filterMethod) return update();
      this.filter = val;
      this.filterMethod(this.query(val))
        .then(({ data }) => {
          update(() => {
            this.options = data;
          });
        })
        .catch(() => {
          abort();
        });
    },
    onLoadFromServer(val) {
      if (!this.filterMethod) return false;
      console.func(
        "components/base/BaseSelect:methods.onLoadFromServer()",
        arguments
      );
      this.filterMethod(this.query(val)).then(({ data }) => {
        this.options = data;
      });
    },
    onChange(val) {
      console.func("components/base/BaseSelect:methods.onChange()", arguments);
      this.$emit("update:model-value", val);
    },
    onCreate() {
      console.func("components/base/BaseSelect:methods.onCreate()", arguments);
      if (this.onNewValue !== void 0) {
        this.$emit("new-value", this.filter, this.done);
      } else {
        this.done(this.filter);
      }
      this.filter = null;
    },
    clear() {
      console.func("components/base/BaseSelect:methods.clear()", arguments);
      this.value = null;
      this.$emit("update:model-value", null);
    },
    done(val, mode) {
      if (mode) {
        if (validateNewValueMode(mode) !== true) {
          return;
        }
      } else {
        mode = this.newValueMode;
      }

      if (val === void 0 || val === null) {
        return;
      }

      this.$refs.baseSelect.updateInputValue("", this.multiple !== true, true);
      const fn =
        mode === "toggle"
          ? this.$refs.baseSelect.toggleOption
          : this.$refs.baseSelect.add;
      fn(val, mode === "add-unique");
      if (this.multiple !== true) {
        this.$refs.baseSelect.focus();
        this.$refs.baseSelect.hidePopup();
      }
    },
  },
  computed: {
    showPlaceholder() {
      return (
        (!this.value && !this.useChips) || !this.value || this.value.length < 1
      );
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.value = val;
      },
    },
  },
};
</script>
