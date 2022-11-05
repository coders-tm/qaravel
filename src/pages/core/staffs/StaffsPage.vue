<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useStaffStore"
          :module="module"
          :columns="columns"
          :rows="rows"
          :actions="actions"
          :toolbar="toolbar"
          :filters="filters"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
          @action-clicked="actionClicked"
          @toolbar-clicked="toolbarClicked"
          @row-clicked="rowClicked"
          no-data-label="No staff avaialble"
          no-permissions
        >
          <template v-slot:body-cell-name="props">
            <q-item class="q-pa-none" dense>
              <q-item-section avatar>
                <base-avatar-widget
                  rounded
                  class="cursor-pointer"
                  :user="props.row"
                  size="40px"
                />
              </q-item-section>
              <q-item-section avatar>
                <base-btn
                  @click.stop
                  link
                  size="12px"
                  tag="a"
                  :to="{
                    name: 'Single Staff',
                    params: {
                      id: props.row.id,
                    },
                    query: {
                      action: 'edit',
                    },
                  }"
                >
                  {{ props.value }}
                </base-btn>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:body-cell-is_active="props">
            <q-toggle
              @update:model-value="changeActive(props.row)"
              size="sm"
              dense
              :model-value="props.row.is_active"
              color="green"
            />
          </template>
          <template v-slot:body-cell-is_supper_admin="props">
            <q-toggle
              @update:model-value="changeAdmin(props.row)"
              size="sm"
              dense
              :model-value="props.row.is_supper_admin"
              color="green"
            />
          </template>
          <template v-slot:body-cell-groups="props">
            <q-chip
              size="12px"
              v-for="item in props.row.groups"
              :key="item.id"
              :label="item.name"
            />
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useStaffStore } from "stores/staff";

export default {
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        filter: "",
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
        active: null,
      },
      useStaffStore: useStaffStore(),
    };
  },
  methods: {
    ...mapActions(useStaffStore, ["get", "changeActive", "changeAdmin"]),
    onRequest(props) {
      console.func(
        "pages/core/staffs/StaffsPage:methods.onRequest()",
        arguments
      );
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      this.get({
        ...props.pagination,
        direction: descending ? "desc" : "asc",
      })
        .then(({ meta }) => {
          // clear out existing data and add new
          // this.rows = this.tableData;
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = meta.total;

          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy = sortBy;
          this.pagination.descending = descending;
          this.pagination.loaded = true;
          this.pagination.from = meta.from;
          this.pagination.to = meta.to;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
    async actionClicked(action, row) {
      console.func(
        "pages/core/staffs/StaffsPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "pages/core/staffs/StaffsPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "pages/core/staffs/StaffsPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Staff",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
        },
      });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
    });
  },
  computed: {
    ...mapState(useStaffStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    permissions() {
      return [];
    },
  },
};
</script>
