<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :columns="columns"
          :rows="rows"
          :toolbar="toolbar"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
          @row-clicked="rowClicked"
          no-data-label="No data avaialble"
          no-permissions
        >
          <template v-slot:body-cell-name="props">
            <i
              :class="`q-mr-sm q-icon fas fa-circle rag-${
                props.row.rag || 'white'
              }`"
              style="font-size: 8px"
              aria-hidden="true"
              role="presentation"
            ></i>
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Single Member',
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
          <template v-slot:body-cell-foc="props">
            <q-checkbox
              @click.stop
              dense
              :disable="props.row.loading"
              :model-value="props.row.foc"
              @update:model-value="checked(props.row)"
              :label="props.value"
            />
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useFinanceAdminStore } from "stores/finance-admin";
import MemberDialog from "components/MemberDialog.vue";

export default {
  data() {
    return {
      loading: false,
      loaded: false,
      stats: {},
      pagination: {
        sortBy: "id",
        descending: true,
        page: 1,
        filter: "",
        type: null,
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
        includes: ["payment", "plan"],
      },
    };
  },
  methods: {
    ...mapActions(useFinanceAdminStore, ["checked", "get"]),
    onRequest(props) {
      console.func("admins/members/MembersPage:methods.onRequest()", arguments);
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

          // set stats
          this.stats = meta;

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
    rowClicked(evt, row) {
      console.func(
        "pages/admins/finance/AdminPage:methods.rowClicked()",
        arguments
      );
      this.$q.dialog({
        component: MemberDialog,
        componentProps: {
          title: row.name,
          id: row.id,
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
    ...mapState(useFinanceAdminStore, ["columns", "toolbar", "rows"]),
    permissions() {
      return [];
    },
  },
};
</script>
