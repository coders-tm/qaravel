<template>
  <q-page padding>
    <base-section
      no-row
      title="App Settings"
      description="Here you can configure your timezone and date formatting that will apply to all of the control panel."
    >
      <div class="q-mt-md q-gutter-y-xs">
        <q-expansion-item
          header-class="bg-grey-4 text-subtitle2 text-black"
          expand-icon-class="text-black"
          v-for="(item, index) in settings"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          @before-show="onLoad(item)"
          :default-opened="index === 0"
          group="settings"
        >
          <template v-slot:header="{ expanded }">
            <q-item-section>
              <q-item-label class="flex items-center">
                <q-icon size="19px" :name="item.icon" class="q-mr-sm" />
                {{ item.label }}
              </q-item-label>
            </q-item-section>
            <q-item-section v-show="expanded" side>
              <q-item-label>
                <q-btn
                  color="primary"
                  @click.stop="onAdd(item)"
                  icon="fad fa-circle-plus"
                  dense
                  round
                  flat
                  v-if="item.canAdd"
                />
                <q-btn
                  color="primary"
                  @click.stop="onSave(item)"
                  icon="fad fa-save"
                  dense
                  round
                  flat
                  v-if="canSave"
                  :loading="save"
                />
              </q-item-label>
            </q-item-section>
          </template>
          <component
            v-bind="item"
            v-bind:options="options"
            :is="item.component"
            :loaded="loaded"
            @remove="onRemove"
            @update="onUpdate"
          />
        </q-expansion-item>
      </div>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "stores/app";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      options: [],
      default: [],
      loaded: false,
      save: false,
      settings: [
        {
          label: "Opening Times",
          key: "opening-times",
          icon: "fas fa-clock",
          component: "opening-times",
        },
        {
          label: "Documents",
          key: "documents",
          icon: "fas fa-file",
          component: "documents-list",
          canAdd: true,
          option: {
            is_active: false,
          },
        },
        {
          label: "Memberships",
          key: "memberships",
          icon: "fas fa-memo-circle-check",
          component: "memberships-list",
          canAdd: true,
          option: {
            label: null,
            features: [],
            plan_id: null,
            price: 0.0,
            is_active: false,
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(useAppStore, ["getSettings", "updateSettings"]),
    onLoad({ key }) {
      this.loaded = false;
      this.getSettings(key)
        .then((options) => {
          this.options = options;
          this.default = cloneDeep(options);
          this.loaded = true;
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
          this.loaded = true;
        });
    },
    onUpdate({ value, rowIndex }) {
      console.func("pages/admins/SettingsPage:methods.onUpdate()", arguments);
      if (rowIndex) {
        Object.assign(this.options[rowIndex], value);
      }
    },
    onRemove(rowIndex) {
      console.func("pages/admins/SettingsPage:methods.onRemove()", arguments);
      this.options.splice(rowIndex, 1);
    },
    onAdd({ option }) {
      console.func("pages/admins/SettingsPage:methods.onAdd()", arguments);
      this.options.push({
        ...option,
        id: Date.now(),
      });
    },
    onSave({ key }) {
      console.func("pages/admins/SettingsPage:methods.onSave()", arguments);
      this.save = true;
      this.updateSettings({
        key,
        options: this.options,
      })
        .then(({ message }) => {
          this.$q.notify(message);
          this.loaded = false;
          this.$nextTick(() => {
            this.save = false;
            this.default = cloneDeep(this.options);
            this.loaded = true;
          });
        })
        .catch((error) => {
          this.save = false;
          this.$core.error(error, { title: "Error" });
        });
    },
  },
  mounted() {
    this.onLoad(this.settings[0]);
  },
  computed: {
    canSave() {
      return (
        this.default &&
        JSON.stringify(this.options) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
