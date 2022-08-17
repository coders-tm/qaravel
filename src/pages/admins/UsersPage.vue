<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="usePropertyStore"
          :module="module"
          :columns="columns"
          :rows="properties"
          :actions="actions"
          :toolbar="toolbar"
          :filters="filters"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
          @action-clicked="actionClicked"
          @toolbar-clicked="toolbarClicked"
          @row-clicked="rowClicked"
          no-data-label="No property avaialble"
          no-permissions
        >
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <template v-if="props.col.name == 'title'">
                <q-item class="q-pa-none" dense>
                  <q-item-section avatar>
                    <base-thumbnail-widget :size="40" :media="props.row.thumbnail" />
                  </q-item-section>
                  <q-item-section avatar>
                    <base-btn
                      @click.stop
                      link
                      size="12px"
                      tag="a"
                      :to="{
                        name: 'Single Property',
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
              <template v-else>
                <span v-html="props.value"></span>
              </template>
            </q-td>
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { usePropertyStore } from 'stores/property';

export default {
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: 'created_at',
        descending: false,
        page: 1,
        filter: '',
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      usePropertyStore: usePropertyStore(),
    };
  },
  methods: {
    ...mapActions(usePropertyStore, ['list']),
    onRequest(props) {
      console.func('pages/admins/PropertyListingsPage:methods.onRequest()', arguments);
      const { page, rowsPerPage, sortBy, descending, deleted, filter } = props.pagination;
      this.loading = true;

      this.list({
        ...props.pagination,
        descending: descending ? 'desc' : 'asc',
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
      console.func('pages/admins/PropertyListingsPage:methods.actionClicked()', arguments);
    },
    async toolbarClicked(action, row) {
      console.func('pages/admins/PropertyListingsPage:methods.toolbarClicked()', arguments);
    },
    async rowClicked(evt, row) {
      console.func('pages/admins/PropertyListingsPage:methods.rowClicked()', arguments);
      this.$router.push({
        name: 'Single Property',
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
    ...mapState(usePropertyStore, [
      'actions',
      'properties',
      'columns',
      'module',
      'toolbar',
      'filters',
    ]),
    permissions() {
      return [];
    },
  },
  watch: {
    $route() {
      this.onRequest({
        pagination: this.pagination,
      });
    },
  },
};
</script>
