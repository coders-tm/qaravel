<template>
  <q-page padding>
    <base-table
      ref="staff"
      store="staff"
      :module="module"
      :columns="columns"
      :rows="rows"
      :actions="actions"
      :toolbar="toolbar"
      :loading="loading"
      :pagination="pagination"
      @request="onRequest"
      selection="multiple"
      @action-clicked="actionClicked"
      @toolbar-clicked="toolbarClicked"
      @row-clicked="rowClicked"
      no-data-label="No staff avaialble"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <template v-if="props.col.name == 'first_name'">
            <q-item class="q-pa-none" dense>
              <q-item-section avatar>
                <avatar rounded class="cursor-pointer" :user="props.row" size="40px" />
              </q-item-section>
              <q-item-section avatar>
                <base-btn
                  @click.stop
                  link
                  size="12px"
                  tag="a"
                  :to="{
                    name: 'staffs.single',
                    params: {
                      id: props.row.id,
                    },
                    query: {
                      action: 'edit',
                    },
                  }"
                  >{{ props.value }}</base-btn
                >
              </q-item-section>
            </q-item>
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
        sortBy: 'first_name',
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
    ...mapActions('staff', ['List']),
    onRequest(props) {
      console.func('pages/core/staffs/index:methods.onRequest()', arguments);
      const { page, rowsPerPage, sortBy, descending, deleted, filter, group } = props.pagination;
      this.loading = true;

      this.List({
        page: page,
        limit: rowsPerPage,
        filter: filter,
        order: sortBy,
        group: group,
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
      console.func('pages/core/staffs/index:methods.actionClicked()', arguments);
    },
    async toolbarClicked(action, row) {
      console.func('pages/core/staffs/index:methods.toolbarClicked()', arguments);
    },
    async rowClicked(evt, row) {
      console.func('pages/core/staffs/index:methods.rowClicked()', arguments);
      this.$router.push({
        name: 'staffs.single',
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
      return this.$store.state.staff.data;
    },
    module() {
      return this.$store.state.staff.module;
    },
    columns() {
      return this.$store.state.staff.columns;
    },
    actions() {
      return this.$store.state.staff.actions;
    },
    toolbar() {
      return this.$store.state.staff.toolbar;
    },
    permissions() {
      return this.$store.getters['app/getPermissions'](this.module.name);
    },
  },
};
</script>
