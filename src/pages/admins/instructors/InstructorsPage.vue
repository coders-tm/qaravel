<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <base-table
          :store="useInstructorStore"
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
          no-data-label="No instructors avaialble"
          no-permissions
        >
          <template v-slot:body-cell-name="props">
            <q-item class="q-pa-none" dense>
              <q-item-section avatar>
                <base-avatar-widget
                  rounded
                  class="cursor-pointer"
                  :user="props.row"
                  size="40px"
                />
              </q-item-section>
              <q-item-section avatar>
                <base-btn
                  @click.stop
                  link
                  size="12px"
                  tag="a"
                  :to="{
                    name: 'Single Instructor',
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
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useInstructorStore } from "stores/instructor";

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
        status: "Active",
        is_pt: null,
        advancedFilter: {},
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      useInstructorStore: useInstructorStore(),
    };
  },
  methods: {
    ...mapActions(useInstructorStore, ["get"]),
    onRequest(props) {
      console.func(
        "admins/instructors/InstructorsPage:methods.onRequest()",
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
        });
    },
    async actionClicked(action, row) {
      console.func(
        "admins/instructors/InstructorsPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/instructors/InstructorsPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "admins/instructors/InstructorsPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Instructor",
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
    ...mapState(useInstructorStore, [
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
