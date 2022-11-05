<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useMemberStore"
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
          no-data-label="No enquiry avaialble"
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
          <template v-slot:body-cell-status="props">
            <base-status-widget :type="props.value" />
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMemberStore } from "stores/member";
import { useEnquiryStore } from "stores/member/enquiry";
import MemberDialog from "components/MemberDialog.vue";

export default {
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "id",
        descending: true,
        page: 1,
        filter: "",
        status: "Pending",
        rag: null,
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
        includes: ["last_update"],
      },
      useMemberStore: useMemberStore(),
    };
  },
  methods: {
    ...mapActions(useEnquiryStore, ["get"]),
    onRequest(props) {
      console.func("admins/members/EnquiryPage:methods.onRequest()", arguments);
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
        "admins/members/EnquiryPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/members/EnquiryPage:methods.toolbarClicked()",
        arguments
      );
    },
    rowClicked(evt, row) {
      console.func(
        "admins/members/EnquiryPage:methods.rowClicked()",
        arguments
      );
      this.$q
        .dialog({
          component: MemberDialog,
          componentProps: {
            title: row.name,
            id: row.id,
          },
        })
        .onOk(() => {
          this.onRequest({
            pagination: this.pagination,
          });
        });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
    });
  },
  computed: {
    ...mapState(useMemberStore, ["actions"]),
    ...mapState(useEnquiryStore, [
      "columns",
      "toolbar",
      "filters",
      "module",
      "rows",
    ]),
    permissions() {
      return [];
    },
  },
};
</script>
