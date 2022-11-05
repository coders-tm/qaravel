<template>
  <base-dialog
    title="Update features"
    body-class="q-pa-none scroll"
    ref="dialog"
    persistent
    use-separator
    @hide="onDialogHide"
    @ok="onDone"
    :disable="disable"
  >
    <template v-slot:body>
      <div class="q-pa-md features-list">
        <div class="q-mb-md flex items-center">
          <div class="text-bold">Features</div>
          <q-space />
          <base-btn
            color="primary"
            icon="fad fa-circle-plus"
            label="Add New"
            flat
            @click="onAdd"
          />
        </div>
        <div v-if="features.length < 1" class="text-grey">
          No features added
        </div>
        <q-list class="q-gutter-y-sm">
          <q-item
            class="q-pa-none"
            v-for="(item, index) in features"
            :key="index"
          >
            <q-item-section>
              <base-input
                v-model="features[index]"
                placeholder="i.e No Contact Membership"
              />
            </q-item-section>
            <q-item-section side>
              <base-btn
                color="grey"
                size="md"
                flat
                padding="14px"
                dense
                icon="fas fa-trash-can"
                @click="onRemove(index)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
    <!-- <template v-slot:footer>
      <q-card-section class="text-right">
        <div class="q-gutter-sm">
          <q-btn  no-caps label="Update" color="primary" />
        </div>
      </q-card-section>
    </template> -->
  </base-dialog>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      features: cloneDeep(this.modelValue),
    };
  },
  props: {
    modelValue: Array,
  },
  emits: ["ok", "hide"],
  methods: {
    async show() {
      console.func("components/FeaturesDialog:methods.show()", arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func("components/FeaturesDialog:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/FeaturesDialog:methods.onDialogHide()",
        arguments
      );
      this.$emit("hide");
    },
    onDone() {
      console.func("components/FeaturesDialog:methods.onDone()", arguments);
      this.$emit("ok", this.features);
      this.hide();
    },
    onRemove(index) {
      console.func("components/FeaturesDialog:methods.onRemove()", arguments);
      this.features.splice(index, 1);
    },
    onAdd(index) {
      console.func("components/FeaturesDialog:methods.onAdd()", arguments);
      this.features.push("");
    },
  },
  computed: {
    disable() {
      return JSON.stringify(this.features) === JSON.stringify(this.modelValue);
    },
  },
};
</script>
