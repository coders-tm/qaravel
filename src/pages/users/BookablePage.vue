<template>
  <q-page padding>
    <base-section no-row>
      <q-toolbar class="q-pa-none">
        <q-toolbar-title class="text-body1 text-bold">
          Week: {{ $core.formatDate(pagination.startOfWeek) }}
        </q-toolbar-title>
        <q-btn
          color="primary"
          flat
          round
          dense
          icon="fas fa-angle-left"
          @click="onChangeDate(pagination.previousOfWeek)"
          :disable="hasPrev"
        >
          <base-tooltip-widget v-if="!hasPrev">
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
          :disable="hasNext"
          @click="onChangeDate(pagination.nextOfWeek)"
        >
          <base-tooltip-widget v-if="!hasNext">
            Next Week ({{ $core.formatDate(pagination.nextOfWeek) }})
          </base-tooltip-widget>
        </q-btn>
      </q-toolbar>
      <base-table
        :module="module"
        :columns="[
          {
            name: 'id',
            label: 'Day',
            field: 'day',
            align: 'left',
            sortable: false,
          },
        ]"
        :rows="rowsByDate"
        :toolbar="toolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @toolbar-clicked="toolbarClicked"
        no-data-label="No registrations avaialble"
        no-permissions
        hide-pagination
        hide-header
      >
        <template v-slot:body="props">
          <q-tr no-hover class="day-header" :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span>{{ col.value }}</span>
            </q-td>
          </q-tr>
          <q-tr :props="props">
            <q-td class="q-pa-none" colspan="100%">
              <base-table
                :columns="columns"
                :rows="props.row.rows"
                hide-top
                hide-pagination
                :rows-per-page-options="[0]"
                loaded
                @row-clicked="rowClicked"
              >
                <template v-slot:actions="props">
                  <q-btn
                    @click.stop="rowClicked(props, props.row)"
                    size="sm"
                    round
                    flat
                    :color="getColor(props.row)"
                    :icon="`fas fa-calendar-circle-${
                      props.row.is_booked ? 'user' : 'plus'
                    }`"
                    :loading="props.row.loading"
                    v-show="props.row.bookable"
                  />
                </template>
              </base-table>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:item="props">
          <div class="col-xs-12">
            <q-item class="bg-grey-4">
              <q-item-section avatar>
                <q-item-label>{{ props.row.day }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-tr>
              <q-td class="q-pa-none" colspan="100%">
                <base-table
                  :columns="columns"
                  :rows="props.row.rows"
                  hide-top
                  hide-pagination
                  :rows-per-page-options="[0]"
                  loaded
                  @row-clicked="rowClicked"
                >
                  <template v-slot:actions="props">
                    <q-btn
                      @click.stop="rowClicked(props, props.row)"
                      size="sm"
                      round
                      flat
                      :color="getColor(props.row)"
                      :icon="`fas fa-calendar-circle-${
                        props.row.is_booked ? 'user' : 'plus'
                      }`"
                      :loading="props.row.loading"
                      v-show="props.row.bookable"
                    />
                  </template>
                </base-table>
              </q-td>
            </q-tr>
          </div>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { groupBy } from "lodash";
import { date } from "quasar";
import { useClassScheduleStore } from "stores/member/class-schedule";

const { formatDate, subtractFromDate, getDayOfWeek } = date;

const startOfWeek = (newDate = null) =>
  formatDate(
    subtractFromDate(newDate, { days: getDayOfWeek(newDate) - 1 }),
    "YYYY-MM-DD"
  );

export default {
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
      rowsByDate: [],
    };
  },
  methods: {
    ...mapActions(useClassScheduleStore, ["get", "book"]),
    onRequest(props) {
      console.func(
        "pages/pages/users/BookablePage:methods.onRequest()",
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
        .then(({ previousOfWeek, startOfWeek, nextOfWeek, data }) => {
          // clear out existing data and add new
          // this.rows = this.tableData;
          // update rowsCount with appropriate value
          // this.pagination.rowsNumber = meta.total;

          const rows = groupBy(data, (item) => item.day);
          this.rowsByDate = Object.keys(rows).map((item) => ({
            id: item,
            day: `${item} (${rows[item][0].date_at_formated})`,
            rows: rows[item],
          }));

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
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
    async toolbarClicked(action, row) {
      console.func(
        "pages/users/BookablePage:methods.toolbarClicked()",
        arguments
      );
    },
    async rowClicked(evt, row) {
      console.func("pages/users/BookablePage:methods.rowClicked()", arguments);
      if (!row.bookable) {
        return;
      }
      if (row.has_booked) {
        this.$core.warning(
          "Slots are not available for selected class schedule! Please contact reception for standby places."
        );
        return;
      }
      if (row.is_booked) {
        this.$core.warning("Class shedule already booked by you!");
        return;
      }
      row.loading = true;
      this.book(row)
        .then(() => {
          row.loading = false;
          row.is_booked = true;
        })
        .catch(() => {
          row.loading = false;
        });
    },
    onChangeDate(date) {
      console.func(
        "pages/users/BookablePage:methods.onChangeDate()",
        arguments
      );
      this.onRequest({
        pagination: {
          ...this.pagination,
          startOfWeek: date,
        },
      });
    },
    getColor(row) {
      if (row.has_booked) {
        return "warning";
      } else if (row.bookable) {
        return "secondary";
      } else {
        return "negative";
      }
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
    });
  },
  computed: {
    ...mapState(useClassScheduleStore, [
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    hasPrev() {
      return this.pagination.previousOfWeek == false;
    },
    hasNext() {
      return this.pagination.nextOfWeek == false;
    },
    permissions() {
      return [];
    },
  },
};
</script>

<style lang="scss">
.day-header td {
  background: $grey-4;
}
</style>
