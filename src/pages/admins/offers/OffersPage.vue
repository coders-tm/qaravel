<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useOfferStore"
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
          no-data-label="No offers avaialble"
          no-permissions
        >
          <template v-slot:body-cell-title_line_1="props">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Single Offer',
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
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useOfferStore } from "stores/offer";

export default {
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        filter: "",
        active: true,
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      useOfferStore: useOfferStore(),
    };
  },
  methods: {
    ...mapActions(useOfferStore, ["get", "changeActive"]),
    onRequest(props) {
      console.func("admins/offers/OffersPage:methods.onRequest()", arguments);
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
        "admins/offers/OffersPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/offers/OffersPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func("admins/offers/OffersPage:methods.rowClicked()", arguments);
      this.$router.push({
        name: "Single Offer",
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
    ...mapState(useOfferStore, [
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
