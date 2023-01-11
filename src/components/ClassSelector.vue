<template>
  <base-dialog
    :title="title"
    body-class="q-pa-none"
    ref="dialog"
    persistent
    @hide="onDialogHide"
    use-separator
  >
    <template v-slot:body>
      <q-card-section>
        <base-input
          dense
          outlined
          type="text"
          v-model="filter"
          clearable
          debounce="500"
          placeholder="Search classes"
          @update:model-value="(val) => onBrowse(val, 'filter')"
        />
      </q-card-section>
      <q-separator />
      <q-list
        class="bordered scroll"
        style="max-height: 50vh; min-height: 50vh"
      >
        <template v-if="!loading">
          <q-item v-for="(item, index) in classes" :key="index" tag="label">
            <q-item-section style="min-width: auto" avatar>
              <q-checkbox
                size="sm"
                dense
                :model-value="selected_classes"
                @update:model-value="onSelected(item)"
                :val="item.id"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="label">{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </template>
    <template v-slot:footer>
      <q-card-section class="bg-white flex">
        <template v-if="loadFromServer">
          <q-btn
            :disable="current_page <= 1 || loading"
            @click="
              onLoad({
                page: current_page - 1 >= 1 ? current_page - 1 : 1,
              })
            "
            dense
            round
            flat
            color="primary"
            icon="fal fa-angle-left"
          />
          <q-btn
            :disable="current_page == last_page || loading"
            @click="
              onLoad({
                page: current_page + 1 <= last_page ? current_page + 1 : 1,
              })
            "
            dense
            round
            flat
            color="primary"
            icon="fal fa-angle-right"
          />
        </template>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn no-caps outline label="Cancel" color="grey" v-close-popup />
          <q-btn
            :disable="disable"
            no-caps
            label="Done"
            color="primary"
            @click="onDone"
          />
        </div>
      </q-card-section>
    </template>
    <template v-slot:loading
      ><q-inner-loading :showing="loading">
        <q-spinner-oval size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </base-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useClassListStore } from "stores/class-list";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      selected: cloneDeep(this.modelValue),
      classes: [],
      current_page: 1,
      last_page: 1,
      loading: false,
      filter: this.query,
    };
  },
  props: {
    modelValue: {
      required: false,
      type: [Array],
      default: () => [],
    },
    hint: [String],
    query: [String],
    title: {
      type: [String],
      default: "Select classes",
    },
    loadFromServer: {
      type: [Boolean],
      required: false,
      default: true,
    },
  },
  emits: ["ok", "hide"],
  methods: {
    ...mapActions(useClassListStore, ["get"]),
    onLoad(args) {
      console.func("components/ClassSelector:methods.onLoad()", arguments);
      this.loading = true;
      this.current_page = args.page;
      this.get({
        ...args,
        filter: this.filter,
        limit: 10,
        order: "name",
        descending: "asc",
      })
        .then(({ data, meta }) => {
          const classes = data.map((classItem) => {
            let selected = this.selected.find(
              (item) => item.id == classItem.id
            );
            return {
              ...classItem,
              pivot: selected ? selected.pivot : {},
            };
          });
          this.classes = cloneDeep(classes);
          this.current_page = meta.current_page;
          this.last_page = meta.last_page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    async show() {
      console.func("components/ClassSelector:methods.show()", arguments);
      this.$refs.dialog.show();
      if (this.loadFromServer) {
        this.onLoad({
          page: this.current_page,
        });
      }
    },
    hide() {
      console.func("components/ClassSelector:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/ClassSelector:methods.onDialogHide()",
        arguments
      );
      this.$emit("hide");
    },
    onDone() {
      console.func("components/ClassSelector:methods.onDone()", arguments);
      this.$emit("ok", this.selected);
      this.hide();
    },
    onBrowse(value) {
      console.func("components/ClassSelector:methods.onBrowse()", arguments);
      this.filter = value;
      this.onLoad({
        page: 1,
      });
    },
    onSelected(val) {
      console.func("components/ClassSelector:methods.onSelected()", arguments);

      const has = this.selected_classes.filter(
        (item) => item === val.id
      ).length;

      if (!has) {
        this.selected.push(val);
      } else {
        this.selected = this.selected.filter((item) => item.id !== val.id);
      }
    },
  },
  computed: {
    disable() {
      return JSON.stringify(this.selected) === JSON.stringify(this.modelValue);
    },
    selected_classes() {
      return this.selected.map((item) => item.id);
    },
  },
};
</script>
