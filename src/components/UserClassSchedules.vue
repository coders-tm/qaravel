<template>
  <base-table
    :toolbar="toolbar"
    :loading="loading"
    :pagination="pagination"
    @request="onRequest"
    no-permissions
    :columns="columns"
    :rows="rows"
    no-data-label="No class schedules avaialble"
    :loaded="loaded"
    no-actions
    :visible-columns="visibleColumns"
  >
    <template v-slot:body-cell-canceled_at="props">
      <span
        :class="{ 'text-red text-bold': !props.row.booking.same_day_canceled }"
      >
        {{ props.value }}
      </span>
    </template>
  </base-table>
</template>

<script>
import { mapActions } from "pinia";
import { useMemberStore } from "src/stores/member";

const options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "No Show",
    value: "noshow",
  },
];

export default {
  props: {
    moduleId: [Number, String],
    columns: {
      type: Array,
      default: () => [
        {
          name: "date_at",
          align: "left",
          label: "Day",
          field: (row) => `${row.day} - ${row.date_at_formated}`,
          style: "width: 40px",
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
        {
          name: "start_at",
          align: "left",
          label: "Time",
          field: (row) => `${row.start_at_formated} - ${row.end_at_formated}`,
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
        {
          name: "class",
          align: "left",
          label: "Class",
          field: "class",
          format: (val) => (val ? val.name : ""),
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
        {
          name: "location",
          align: "left",
          label: "Location",
          field: "location",
          format: (val) => (val ? val.label : ""),
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
        {
          name: "instructor",
          align: "left",
          label: "Instructor",
          field: "instructor",
          format: (val) => (val ? val.name : ""),
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
        {
          name: "canceled_at",
          align: "left",
          label: "Canceled at",
          field: (row) => row.booking.canceled_at,
          classes: (row) => (row.booking?.is_stand_by ? "bg-amber-1" : ""),
        },
      ],
    },
    toolbar: {
      type: Array,
      default: () => [
        {
          title: "Date",
          action: "request",
          component: "base-date-input",
          dense: true,
          outlined: true,
          key: "date",
          placeholder: "Select",
          style: "width: 150px",
          prefix: "Date:",
          deleted: "all",
          width: "6",
        },
        {
          title: "Status",
          action: "request",
          component: "base-select",
          dense: true,
          outlined: true,
          key: "status",
          placeholder: "Select",
          optionsDense: true,
          style: "width: 180px",
          mapOptions: true,
          emitValue: true,
          options: options,
          deleted: "all",
          prefix: "Status:",
          width: "6",
        },
      ],
    },
    status: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      rows: [],
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "date_at",
        descending: true,
        page: 1,
        filter: "",
        status: this.status,
        deleted: false,
        rowsPerPage: 10,
        rowsNumber: 10,
        loaded: false,
      },
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["schedules"]),
    onRequest(props) {
      console.func("components/NoShowClasses:methods.onRequest()", arguments);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      if (typeof date === "object" && date) {
        props.pagination.date_from = date.from;
        props.pagination.date_to = date.to;
      } else {
        delete props.pagination.date_from;
        delete props.pagination.date_to;
      }

      this.schedules({
        ...props.pagination,
        moduleId: this.moduleId,
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
          this.loaded = true;
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
    visibleColumns() {
      return this.columns
        .filter((item) =>
          this.pagination.status === "cancelled"
            ? item.name
            : !["canceled_at"].includes(item.name)
        )
        .map((item) => item.name);
    },
  },
};
</script>
