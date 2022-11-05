<template>
  <base-table
    :module="module"
    :columns="columns"
    :rows="rows"
    :loading="loading"
    :pagination="pagination"
    @request="onRequest"
    no-data-label="No member avaialble"
    no-permissions
    hide-top
  >
    <template v-slot:body-cell-name="props">
      <i
        :class="`q-mr-sm q-icon fas fa-circle rag-${props.row.rag || 'white'}`"
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
    <template v-slot:body-cell-plan_id="props">
      <base-btn
        @click.stop
        link
        size="12px"
        tag="a"
        :to="{
          name: 'Single Plan',
          params: {
            id: props.row.plan_id,
          },
          query: {
            action: 'edit',
          },
        }"
      >
        {{ props.value }}
      </base-btn>
    </template>
  </base-table>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMemberStore } from "stores/member";

export default {
  props: {
    year: [String, Number],
    month: [String, Number],
    type: String,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "id",
        descending: true,
        page: 1,
        filter: "",
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
        includes: ["plan"],
      },
      columns: [
        {
          name: "id",
          align: "left",
          label: "Pro-Fit28 ID",
          field: "profit_id_formated",
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "plan_id",
          align: "left",
          label: "Plan",
          field: (row) => row?.plan?.label,
          style: "width: 250px; white-space: normal",
          sortable: true,
        },
      ],
      rows: [],
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["get"]),
    onRequest(props) {
      console.func("admins/members/MembersPage:methods.onRequest()", arguments);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      this.get({
        ...props.pagination,
        year: this.year,
        month: this.month,
        type: this.type,
        direction: descending ? "desc" : "asc",
      })
        .then(({ meta, data }) => {
          // clear out existing data and add new
          this.rows = data;
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
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
    });
  },
  computed: {
    ...mapState(useMemberStore, ["module"]),
  },
};
</script>
