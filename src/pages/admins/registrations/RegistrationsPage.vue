<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-toolbar class="q-pa-none">
          <q-toolbar-title class="text-body1 text-bold">
            Week: {{ $core.formatDate(pagination.startOfWeek) }}
            <span v-if="totalCost">({{ $core.money(totalCost) }})</span>
          </q-toolbar-title>
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="fas fa-angle-left"
            @click="onChangeDate(pagination.previousOfWeek)"
          >
            <base-tooltip-widget>
              Previous Week ({{ $core.formatDate(pagination.previousOfWeek) }})
            </base-tooltip-widget>
          </q-btn>
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="fas fa-circle"
            @click="onChangeDate()"
          >
            <base-tooltip-widget>
              Current Week({{ $core.formatDate(new Date()) }})
            </base-tooltip-widget>
          </q-btn>
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="fas fa-angle-right"
            @click="onChangeDate(pagination.nextOfWeek)"
          >
            <base-tooltip-widget>
              Next Week ({{ $core.formatDate(pagination.nextOfWeek) }})
            </base-tooltip-widget>
          </q-btn>
        </q-toolbar>
        <base-table
          :store="useRegistrationStore"
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
          no-data-label="No registrations avaialble"
          no-permissions
        >
          <template v-slot:body-cell-day_index="props">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Single Registration',
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
          <template v-slot:body-cell-at="props">
            <class-at
              :has-sign-off="props.row.has_sign_off"
              :value="props.value"
            />
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRegistrationStore } from "stores/registration";
import { date } from "quasar";
import ClassAt from "components/ClassAt.vue";

const { formatDate, subtractFromDate, getDayOfWeek } = date;

const startOfWeek = (newDate = null) =>
  formatDate(
    subtractFromDate(newDate, { days: getDayOfWeek(newDate) - 1 }),
    "YYYY-MM-DD"
  );

export default {
  components: { ClassAt },
  data() {
    return {
      loading: false,
      pagination: {
        sortBy: "day_index",
        otherSortBy: "start_at",
        descending: false,
        startOfWeek: startOfWeek(new Date()),
        previousOfWeek: null,
        nextOfWeek: null,
        descending: false,
        page: 1,
        filter: "",
        active: null,
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      totalCost: null,
      useRegistrationStore: useRegistrationStore(),
    };
  },
  methods: {
    ...mapActions(useRegistrationStore, ["get"]),
    onRequest(props) {
      console.func(
        "pages/admins/registrations/RegistrationsPage:methods.onRequest()",
        arguments
      );
      const { page, rowsPerPage, sortBy, descending, date } = props.pagination;
      this.loading = true;

      if (typeof date === "object" && date) {
        props.pagination.date_from = date.from;
        props.pagination.date_to = date.to;
      } else {
        delete props.pagination.date_from;
        delete props.pagination.date_to;
      }

      this.get({
        ...props.pagination,
        direction: descending ? "desc" : "asc",
      })
        .then(
          ({ previousOfWeek, startOfWeek, nextOfWeek, meta, totalCost }) => {
            // clear out existing data and add new
            // this.rows = this.tableData;
            // update rowsCount with appropriate value
            this.pagination.rowsNumber = meta.total;

            this.totalCost = totalCost;

            // updated the pagination
            this.pagination.page = page;
            this.pagination.rowsPerPage = rowsPerPage;
            this.pagination.sortBy = sortBy;
            this.pagination.descending = descending;
            this.pagination.loaded = true;
            this.pagination.previousOfWeek = previousOfWeek;
            this.pagination.startOfWeek = startOfWeek;
            this.pagination.nextOfWeek = nextOfWeek;

            // ...and turn of loading indicator
            this.loading = false;
          }
        )
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
    async actionClicked(action, row) {
      console.func(
        "admins/registrations/RegistrationsPage:methods.actionClicked()",
        arguments
      );
    },
    async toolbarClicked(action, row) {
      console.func(
        "admins/registrations/RegistrationsPage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func(
        "admins/registrations/RegistrationsPage:methods.rowClicked()",
        arguments
      );
      this.$router.push({
        name: "Single Registration",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
        },
      });
    },
    onChangeDate(date) {
      console.func(
        "admins/registrations/RegistrationsPage:methods.onChangeDate()",
        arguments
      );
      this.onRequest({
        pagination: {
          ...this.pagination,
          startOfWeek: date,
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
    ...mapState(useRegistrationStore, [
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
