<template>
  <q-page padding>
    <base-table
      ref="group"
      store="group"
      :module="module"
      :columns="columns"
      :rows="rows"
      :actions="actions"
      :toolbar="toolbar"
      :loading="loading"
      selection="multiple"
      :pagination="pagination"
      @request="onRequest"
      @action-clicked="actionClicked"
      @toolbar-clicked="toolbarClicked"
      @row-clicked="rowClicked"
      no-data-label="No group avaialble"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <template v-if="props.col.name == 'name'">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'groups.single',
                params: {
                  id: props.row.id,
                },
                query: {
                  action: 'edit',
                },
              }"
              >{{ props.value }}</base-btn
            >
          </template>
          <template v-else>{{ props.value }}</template>
        </q-td>
      </template>
    </base-table>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      rows: [],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        filter: '',
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
    };
  },
  methods: {
    ...mapActions('group', ['List']),
    onRequest(props) {
      console.func('pages/core/groups/index:methods.onRequest()', arguments);
      const { page, rowsPerPage, sortBy, descending, deleted, filter } = props.pagination;
      this.loading = true;

      this.List({
        page: page,
        limit: rowsPerPage,
        filter: filter,
        order: sortBy,
        deleted: deleted,
        descending: descending ? 'desc' : 'asc',
      }).then(({ meta }) => {
        // clear out existing data and add new
        this.rows = this.tableData;
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
      });
    },
    async actionClicked(action, row) {
      console.func('pages/core/groups/index:methods.actionClicked()', arguments);
    },
    async toolbarClicked(action, row) {
      console.func('pages/core/groups/index:methods.toolbarClicked()', arguments);
    },
    async rowClicked(evt, row) {
      console.func('pages/core/groups/index:methods.rowClicked()', arguments);
      this.$router.push({
        name: 'groups.single',
        params: {
          id: row.id,
        },
        query: {
          action: 'edit',
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
    tableData() {
      return this.$store.state.group.data;
    },
    module() {
      return this.$store.state.group.module;
    },
    columns() {
      return this.$store.state.group.columns;
    },
    actions() {
      return this.$store.state.group.actions;
    },
    toolbar() {
      return this.$store.state.group.toolbar;
    },
    permissions() {
      return this.$store.getters['app/getPermissions'](this.module.name);
    },
  },
};
</script>
