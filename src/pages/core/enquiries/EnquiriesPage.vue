<template>
  <q-page padding>
    <base-section no-row>
      <base-table
        :store="useEnquiryStore"
        :module="module"
        :columns="getColumns"
        :rows="rows"
        :toolbar="getToolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @toolbar-clicked="toolbarClicked"
        @row-clicked="rowClicked"
        no-data-label="No enquiries avaialble"
        no-permissions
      >
        <template v-slot:body-cell-id="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Single Enquiry',
              params: {
                id: props.row.id,
                title: props.row.subject || 'Contact us',
              },
              query: {
                action: 'edit',
              },
            }"
          >
            <div class="ellipsis">
              {{ props.value }}
            </div>
          </base-btn>
        </template>
        <template v-slot:body-cell-name="props">
          <template v-if="props.row.user">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Single Member',
                params: {
                  id: props.row.user.id,
                },
                query: {
                  action: 'edit',
                },
              }"
            >
              {{ props.value }}
            </base-btn>
          </template>
          <template v-else>
            {{ props.value }}
          </template>
        </template>
        <template v-slot:body-cell-status="props">
          <base-status :type="props.value" />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useEnquiryStore } from "stores/enquiry";

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
        status: "Open",
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      useEnquiryStore: useEnquiryStore(),
    };
  },
  methods: {
    ...mapActions(useEnquiryStore, ["get"]),
    onRequest(props) {
      console.func(
        "admins/enquiries/EnquirysPage:methods.onRequest()",
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
          this.loading = false;
        });
    },
    async actionClicked(action, row) {
      console.func(
        "admins/enquiries/EnquirysPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/enquiries/EnquirysPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "admins/enquiries/EnquirysPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Enquiry",
        params: {
          id: row.id,
          title: row.subject || "Contact us",
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
    ...mapState(useEnquiryStore, [
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
    getColumns() {
      return this.columns.filter((item) => item.guard.includes(this.guard));
    },
    guard() {
      return this.$route.meta.guard;
    },
    getToolbar() {
      return this.toolbar.filter((item) => item.guard.includes(this.guard));
    },
  },
};
</script>
