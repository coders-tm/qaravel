<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useClassListStore"
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
          no-data-label="No classes avaialble"
          no-permissions
        >
          <template v-slot:body-cell-name="props">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Single Class',
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

          <template v-slot:body-cell-has_description="props">
            <q-toggle
              @update:model-value="changeHasDescription(props.row)"
              size="sm"
              dense
              :model-value="props.row.has_description"
              color="green"
            />
          </template>

          <template v-slot:body-cell-description="props">
            <div class="ellipsis-2-lines">{{ props.value }}</div>
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClassListStore } from "stores/class-list";

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
        active: null,
        loaded: false,
      },
      useClassListStore: useClassListStore(),
    };
  },
  methods: {
    ...mapActions(useClassListStore, [
      "get",
      "changeActive",
      "changeHasDescription",
    ]),
    onRequest(props) {
      console.func(
        "admins/class-lists/ClassesPage:methods.onRequest()",
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
        "admins/class-lists/ClassesPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/class-lists/ClassesPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "admins/class-lists/ClassesPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Class",
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
    ...mapState(useClassListStore, [
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
