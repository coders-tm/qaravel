<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useGroupStore"
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
          no-data-label="No group avaialble"
          no-permissions
        >
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGroupStore } from "stores/group";

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
      },
      useGroupStore: useGroupStore(),
    };
  },
  methods: {
    ...mapActions(useGroupStore, ["get"]),
    onRequest(props) {
      console.func(
        "pages/core/groups/GroupsPage:methods.onRequest()",
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
          // this.$emit('error', error);
        });
    },
    async actionClicked(action, row) {
      console.func(
        "pages/core/groups/GroupsPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "pages/core/groups/GroupsPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "pages/core/groups/GroupsPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Group",
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
    ...mapState(useGroupStore, [
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
