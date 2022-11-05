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
          no-data-label="No member avaialble"
          no-permissions
        >
          <template v-slot:body-cell-name="props">
            <q-item class="q-pa-none" dense>
              <q-item-section avatar>
                <base-avatar
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
              </q-item-section>
            </q-item>
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
import { useMemberStore } from "stores/member";

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
        status: true,
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
    ...mapActions(useMemberStore, ["get", "changeActive"]),
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
        "admins/members/MembersPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/members/MembersPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "admins/members/MembersPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Member",
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
    ...mapState(useMemberStore, [
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
