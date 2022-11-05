<template>
  <div>
    <q-drawer
      v-if="hasFilter"
      side="right"
      ref="filter"
      bordered
      :width="280"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <q-toolbar style="height: 89px" light>
        <q-toolbar-title class="q-ml-xs">{{ filterTitle }}</q-toolbar-title>
        <q-btn icon="close" flat round dense @click="$refs.filter.hide()" />
      </q-toolbar>
      <q-separator />
      <q-card class="bg-transparent" flat square>
        <q-card-section class="row q-col-gutter-md">
          <slot name="advanced-filter" v-bind:syncPagination="syncPagination">
            <div
              v-for="(item, index) in filters"
              :key="index"
              class="col-12 filter-item"
            >
              <div v-if="item.title" class="text-label">{{ item.title }}</div>
              <component
                :is="item.component"
                v-model="syncPagination[item.key]"
                @update:model-value="sendServerRequest"
                v-bind="item"
              />
            </div>
          </slot>
        </q-card-section>
      </q-card>
    </q-drawer>
    <template v-if="syncPagination.loaded || loaded">
      <q-table
        class="main-table"
        square
        :rows="rows"
        :columns="columns"
        :bordered="bordered"
        :grid="grid || $q.screen.lt.md"
        :hide-header="hideHeader || $q.screen.lt.md"
        :flat="flat"
        row-key="id"
        :hide-pagination="hidePagination"
        :rows-per-page-options="rowsPerPageOptions"
        :filter="syncPagination.filter"
        v-model:pagination="syncPagination"
        :loading="loading"
        :selection="selection"
        v-model:selected="selected"
        @request="onRequest"
        @row-click="onRowClicked"
        :no-data-label="noDataLabel"
        :visible-columns="visibleColumns"
      >
        <template v-if="!hideTop" v-slot:top="scope">
          <slot
            name="top"
            v-bind="scope"
            v-bind:permissions="permissions"
            v-bind:selected="selected"
            v-bind:toolbar="toolbarItems"
            v-bind:onToolbarClicked="onToolbarClicked"
          >
            <div class="col">
              <div class="row q-col-gutter-md">
                <div :class="`col-sm-${topLeftWidth} col-xs-12`">
                  <slot
                    name="top-left"
                    v-bind="scope"
                    v-bind:permissions="permissions"
                    v-bind:selected="selected"
                    v-bind:toolbar="toolbarItems"
                  >
                    <q-input
                      v-model="syncPagination.filter"
                      outlined
                      clearable
                      placeholder="Quick search"
                      dense
                    >
                      <template v-slot:append>
                        <q-icon
                          v-if="!syncPagination.filter"
                          name="fas fa-search"
                          size="16px"
                        />
                      </template>
                    </q-input>
                  </slot>
                </div>
                <div :class="`col-sm-${topRightWidth} col-xs-12 text-right`">
                  <slot
                    name="top-right"
                    v-bind="scope"
                    v-bind:permissions="permissions"
                    v-bind:selected="selected"
                    v-bind:toolbar="toolbarItems"
                  >
                    <div class="q-gutter-sm">
                      <div
                        v-if="!syncPagination.deleted && selected.length > 0"
                        class="toolbar-item"
                      >
                        <q-btn
                          :disable="
                            !hasPermission({
                              permission: 'Delete',
                            })
                          "
                          icon="fas fa-trash-alt"
                          color="negative"
                          flat
                          @click="
                            onToolbarClicked({
                              action: 'delete',
                            })
                          "
                          class="toolbar"
                          label="Delete"
                          no-caps
                        />
                      </div>
                      <div
                        v-else-if="
                          syncPagination.deleted && selected.length > 0
                        "
                        class="toolbar-item"
                      >
                        <q-btn
                          :disable="
                            !hasPermission({
                              permission: 'Delete',
                            })
                          "
                          icon="fas fa-trash-undo"
                          color="primary"
                          flat
                          @click="
                            onToolbarClicked({
                              action: 'restore',
                            })
                          "
                          class="toolbar"
                          label="Restore"
                          no-caps
                        />
                      </div>
                      <div
                        v-for="(item, index) in toolbarItems"
                        :key="index"
                        v-show="hasPermission(item)"
                        class="toolbar-item"
                        :width="item.width"
                      >
                        <template v-if="item.component">
                          <component
                            :is="item.component"
                            v-model="syncPagination[item.key]"
                            @update:model-value="onToolbarClicked(item)"
                            v-bind="item"
                          >
                            <base-tooltip-widget
                              v-if="item.tooltip"
                              position="top"
                            >
                              {{ item.tooltip }}
                            </base-tooltip-widget>
                          </component>
                        </template>
                        <template v-else>
                          <q-btn
                            @click="onToolbarClicked(item)"
                            v-bind="item"
                            no-caps
                          >
                            <base-tooltip-widget
                              v-if="item.tooltip"
                              position="top"
                            >
                              {{ item.tooltip }}
                            </base-tooltip-widget>
                          </q-btn>
                        </template>
                      </div>
                    </div>
                  </slot>
                </div>
              </div>
              <slot name="top-bottom"></slot>
            </div>
          </slot>
        </template>

        <template v-slot:header-selection="scope">
          <slot name="header-selection" v-bind="scope">
            <q-checkbox dense size="sm" v-model="scope.selected" />
          </slot>
        </template>

        <template v-slot:body-selection="scope">
          <slot name="body-selection" v-bind="scope">
            <q-checkbox dense size="sm" v-model="scope.selected" />
          </slot>
        </template>

        <template v-if="!!$slots.body" v-slot:body="props">
          <slot name="body" v-bind="props"></slot>
        </template>

        <template v-for="slot in tableSlots" v-slot:[slot]="props" :key="slot">
          <q-td :props="props">
            <slot
              :name="slot"
              v-bind="props"
              v-bind:props="props"
              v-bind:permissions="permissions"
              v-bind:actions="actionItems"
              v-bind:onActionClicked="onActionClicked"
            >
              <span v-html="props.value"></span>
            </slot>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <slot name="actions" v-bind="props">
              <q-btn round flat dense icon="fal fa-ellipsis-h" @click.stop>
                <q-menu dense>
                  <q-list
                    class="q-pa-sm actions"
                    dense
                    style="min-width: 100px"
                  >
                    <base-item
                      v-for="(item, index) in actionItems"
                      :key="index"
                      v-show="hasPermission(item, props)"
                      @click="onActionClicked(item, props)"
                      :icon="getValue(item, props, 'icon')"
                      :label="getValue(item, props, 'label')"
                    />
                  </q-list>
                </q-menu>
              </q-btn>
            </slot>
          </q-td>
        </template>

        <template v-slot:item="props">
          <slot
            name="item"
            v-bind="props"
            v-bind:props="props"
            v-bind:permissions="permissions"
            v-bind:actions="actionItems"
            v-bind:onActionClicked="onActionClicked"
            v-bind:hasPermission="hasPermission"
          >
            <div v-bind:class="cardClass" class="col-xs-12 col-sm-12">
              <q-item
                :class="{
                  'body-item': true,
                  'bg-green-2': props.selected,
                  'bg-white': !props.selected,
                }"
                @click.stop="(evt) => $emit('row-clicked', evt, props.row)"
                clickable
              >
                <q-item-section
                  v-if="['single', 'multiple'].includes(selection)"
                  avatar
                  class="body-selection"
                >
                  <slot name="body-selection" v-bind="props">
                    <q-checkbox dense size="sm" v-model="props.selected" />
                  </slot>
                </q-item-section>
                <slot
                  name="item-section"
                  v-bind:props="props"
                  v-bind:permissions="permissions"
                  v-bind:actions="actionItems"
                  v-bind:onActionClicked="onActionClicked"
                  v-bind:hasPermission="hasPermission"
                >
                  <q-item-section>
                    <slot name="section-body" v-bind="props">
                      <q-item-label
                        class="q-mb-xs"
                        v-for="(col, index) in props.cols.filter(
                          (item) =>
                            !['actions'].includes(item.name) &&
                            canVisiable(item.name)
                        )"
                        :tabindex="index"
                        :key="col.name"
                      >
                        <div
                          v-if="!hideItemLabel"
                          class="q-table__grid-item-title"
                        >
                          {{ col.label }}
                        </div>
                        <slot
                          :name="`body-cell-${col.name}`"
                          v-bind="props"
                          v-bind:value="col.value"
                        >
                          <span v-html="col.value"></span>
                        </slot>
                      </q-item-label>
                    </slot>
                  </q-item-section>
                </slot>
                <q-item-section v-if="canVisiable('actions')" side>
                  <slot name="actions" v-bind="props">
                    <q-btn
                      round
                      flat
                      dense
                      icon="fal fa-ellipsis-h"
                      @click.stop
                    >
                      <q-menu dense>
                        <q-list
                          class="q-pa-sm actions"
                          dense
                          style="min-width: 100px"
                        >
                          <base-item
                            v-for="(item, index) in actionItems"
                            :key="index"
                            v-show="hasPermission(item, props)"
                            @click="onActionClicked(item, props)"
                            :icon="getValue(item, props, 'icon')"
                            :label="getValue(item, props, 'label')"
                          />
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </slot>
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
          </slot>
        </template>

        <template v-slot:bottom-row="cols">
          <slot v-bind="cols" name="bottom-row"></slot>
        </template>

        <template v-if="!!$slots.bottom" v-slot:bottom="scope">
          <slot name="bottom" v-bind="scope"></slot>
        </template>
      </q-table>
    </template>
    <template v-else>
      <slot name="pre-loader">
        <table-skeleton :hide-top="hideTop" :row-numners="8" />
      </slot>
    </template>
  </div>
</template>

<script>
import { map } from "lodash";
import TableSkeleton from "../skeleton/TableSkeleton.vue";

const getValue = (item, props, key) =>
  typeof item[key] === "function" ? item[key](props.row) : item[key];

const exportMethod = (item, store) => {
  if (typeof item.method === "function") {
    return item.method;
  } else if (store) {
    return store.get;
  } else {
    return false;
  }
};

const exceptSlots = [
  "advanced-filter",
  "pre-loader",
  "header-selection",
  "body-selection",
  "body-cell-actions",
  "body",
  "bottom",
  "bottom-row",
  "item",
  "item-selection",
  "top",
  "top-left",
  "top-right",
  "top-bottom",
];

export default {
  components: { TableSkeleton },
  data() {
    return {
      selected: [],
      getValue,
    };
  },
  props: {
    store: {
      required: false,
    },
    module: {
      required: false,
      type: [Object],
    },
    columns: {
      required: true,
      type: [Array],
      default: () => [],
    },
    rows: {
      required: true,
      type: [Array],
      default: () => [],
    },
    onRequest: Function,
    onRowClicked: Function,
    toolbar: {
      required: false,
      type: [Array],
      default: () => [],
    },
    actions: {
      required: false,
      type: [Array],
      default: () => [],
    },
    filters: {
      required: false,
      type: [Array],
      default: () => [],
    },
    pagination: {
      required: false,
      type: [Object],
      default: () => ({
        loaded: false,
      }),
    },
    grid: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    hidePagination: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    hideItemLabel: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    noActions: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    noTrash: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    rowsPerPageOptions: {
      required: false,
      type: [Array],
      default: () => [15, 30, 50],
    },
    filter: {
      required: false,
      type: [Boolean],
      default: () => true,
    },
    bordered: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    flat: {
      required: false,
      type: [Boolean],
      default: () => true,
    },
    hideHeader: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    hideTop: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    noPermissions: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    loading: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    loaded: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    preventDefault: {
      required: false,
      type: [Boolean],
      default: () => false,
    },
    selection: {
      required: false,
      description: "Available options: single, multiple and none",
      type: [String],
      default: "none",
    },
    filterTitle: {
      required: false,
      type: [String],
      default: "Filters",
    },
    filterIcon: {
      required: false,
      type: [String],
      default: "fal fa-filter",
    },
    relatedDeleteMessage: {
      required: false,
      type: [String, Boolean],
      default:
        "Please note that once you permanently delete type module, any related(s) where they have added to will lose them too.",
    },
    noDataLabel: {
      type: [String],
      default: undefined,
    },
    cardClass: {
      type: [String],
      default: undefined,
    },
    topRightWidth: {
      required: false,
      type: [Number],
      default: 9,
      description: "max value 12 and min value 1",
      validator(value) {
        return value <= 12 || value >= 1;
      },
    },
    visibleColumns: Array,
  },
  watch: {
    "syncPagination.rowsPerPage"() {
      this.sendServerRequest();
    },
  },
  methods: {
    onActionClicked(item, props) {
      console.func(
        "components/base/base-table:methods.onActionClicked()",
        arguments
      );
      this.$emit("action-clicked", item.action, props.row);

      // checked default actions status
      if (this.preventDefault) return false;

      switch (item.action) {
        case "delete":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to delete this ${this.module.singular}?`
            )
            .then(() => {
              this.store
                .delete(props.row.id)
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "restore":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to restore this ${this.module.singular}?`
            )
            .then(() => {
              this.store
                .restore(props.row.id)
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "force-delete":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to permanently delete this ${this.module.singular}?`,
              {
                subTitle: this.relatedDeleteMessage
                  .replace(/type/g, "this")
                  .replace(/module/g, this.module.singular),
              }
            )
            .then(() => {
              this.store
                .forceDelete(props.row.id)
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "route":
          this.$router.push({
            name: item.route,
            params: item.params ? item.params(props.row) : {},
            query: item.query ? item.query(props.row) : {},
          });
          break;
        default:
          if (typeof item.action === "function") {
            item.action(props.row);
          }
          break;
      }
    },
    onToolbarClicked(item) {
      console.func(
        "components/base/base-table:methods.onToolbarClicked()",
        arguments
      );
      this.$emit("toolbar-clicked", item);

      // checked default actions status
      if (this.preventDefault) return false;

      switch (item.action) {
        case "delete":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to delete selected ${this.module.plural}?`
            )
            .then(() => {
              this.store
                .deleteSelected(map(this.selected, "id"))
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "restore":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to restore selected ${this.module.plural}?`
            )
            .then(() => {
              this.store
                .restoreSelected(map(this.selected, "id"))
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "force-delete":
          this.hasStore();
          this.$core
            .confirm(
              `Are you sure you want to permanently delete selected ${this.module.plural}?`,
              {
                subTitle: this.relatedDeleteMessage
                  .replace(/type/g, "selected")
                  .replace(/module/g, this.module.plural),
              }
            )
            .then(() => {
              this.store
                .forceDeleteSelected(map(this.selected, "id"))
                .then(() => {
                  this.sendServerRequest();
                })
                .catch((error) => {
                  this.$core.error(error, { title: "Error" });
                });
            });
          break;
        case "export":
          this.$core.exportTable({
            params: {
              ...this.syncPagination,
              rowsPerPage: this.syncPagination.rowsPerPage * 25,
            },
            data: this.data,
            columns: this.columns.filter(
              (item) => !["actions"].includes(item.name)
            ),
            action: exportMethod(item, this.store),
            name: `table_${this.module.plural}`,
            type: item.type,
          });
          break;
        case "route":
          this.$router.push({
            name: item.route,
            params: item.params,
            query: item.query,
          });
          break;
        case "filter":
          this.$refs.filter.show();
          break;
        case "request":
          this.sendServerRequest();
          break;
        default:
          if (typeof item.action === "function") {
            item.action(item);
          }
          break;
      }
    },
    sendServerRequest() {
      this.selected = [];
      this.onRequest({
        pagination: this.syncPagination,
      });
    },
    showFilter() {
      console.func(
        "components/base/base-table:methods.showFilter()",
        arguments
      );
      this.$refs.filter.show();
    },
    hasPermission(item, props = false) {
      // console.func('components/base/base-table:methods.hasPermission()', arguments)

      // permission doesn't exist
      if (this.noPermissions) return true;

      if (item.module) {
        return true;
        // return (
        //   this.$store.getters['app/hasPermission'](item.module) &&
        //   this.$store.getters['app/hasModulePermission'](item.module, item.permission)
        // );
      }

      if (item.condition && item.permission && props) {
        return (
          this.permissions.includes(item.permission) &&
          item.condition(props.row, this.permissions)
        );
      } else if (item.condition && !item.permission && props) {
        return item.condition(props.row, this.permissions);
      }

      return this.permissions.includes(item.permission) || !item.permission;
    },
    hasStore() {
      if (!this.store) return false;
    },
    canVisiable(column) {
      if (this.visibleColumns && this.visibleColumns.length) {
        return this.visibleColumns.includes(column);
      }
      return this.columns.filter((item) => item.name === column).length > 0;
    },
  },
  computed: {
    syncPagination: {
      get() {
        return this.pagination;
      },
      set(val) {
        return val;
      },
    },
    hasFilter() {
      return this.filters.length;
    },
    actionItems() {
      return (this.actions || []).filter(
        (item) =>
          item.deleted === this.syncPagination.deleted || item.deleted === "all"
      );
    },
    toolbarItems() {
      return (this.toolbar || []).filter(
        (item) =>
          item.deleted === this.syncPagination.deleted || item.deleted === "all"
      );
    },
    permissions() {
      // return this.$store.getters['app/getPermissions'](this.module.name);
      return [];
    },
    tableSlots() {
      return Object.keys(this.$slots)
        .concat(this.columns.map((item) => "body-cell-" + item.name))
        .filter((item) => !exceptSlots.includes(item));
    },
    topLeftWidth() {
      const width = 12 - this.topRightWidth;
      return width || 12;
    },
  },
};
</script>
