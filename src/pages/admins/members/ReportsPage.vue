<template>
  <q-page padding>
    <q-card>
      <q-card-section v-if="visiable">
        <base-table
          :rows-per-page-options="[0]"
          :loaded="loaded"
          :rows="rows"
          :columns="columns"
          hide-pagination
        >
          <template v-slot:top>
            <div class="col">
              <div class="row q-col-gutter-md">
                <div class="col-xs-12 col-sm">
                  <base-select
                    options-dense
                    v-model="year"
                    :options="years"
                    dense
                    outlined
                    prefix="Year:"
                    @update:model-value="onChangeYear"
                  />
                </div>
                <div
                  v-for="(item, index) in columns.filter((item) => item.stats)"
                  :key="index"
                  class="col-xs-6 col-sm"
                >
                  <base-input
                    :prefix="`${item.label}:`"
                    readonly
                    v-model="stats[item.name]"
                  />
                </div>
              </div>
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <template v-if="col.name === 'id'">
                  <q-checkbox
                    dense
                    v-model="props.row.checked"
                    @update:model-value="(val) => onRequest(val, props)"
                    :label="col.value"
                  />
                </template>
                <template v-else>
                  <base-btn
                    link
                    color="black"
                    @click="onLoad(props, col.name)"
                    v-if="col.value"
                    flat
                    dense
                    :label="col.value"
                  />
                  <span v-else>{{ col.value }}</span>
                </template>
              </q-td>
            </q-tr>
            <q-tr v-if="props.row.expand" :props="props">
              <q-td class="q-pa-none" colspan="100%">
                <members-table
                  :type="props.row.type"
                  :year="year"
                  :month="props.row.id"
                />
              </q-td>
            </q-tr>
          </template>
          <template v-slot:item="props">
            <div class="col-xs-12">
              <q-item>
                <q-item-section v-for="col in props.cols" :key="col.name">
                  <template v-if="col.name === 'id'">
                    <q-checkbox
                      dense
                      v-model="props.row.checked"
                      @update:model-value="(val) => onRequest(val, props)"
                      :label="col.value"
                    />
                  </template>
                  <template v-else>
                    <base-btn
                      link
                      color="black"
                      @click="onLoad(props, col.name)"
                      v-if="col.value"
                      flat
                      dense
                      :label="col.value"
                    />
                    <span v-else>{{ col.value }}</span>
                  </template>
                </q-item-section>
              </q-item>
              <template v-if="props.row.expand">
                <members-table
                  :type="props.row.type"
                  :year="year"
                  :month="props.row.id"
                />
              </template>
            </div>
          </template>
        </base-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { range } from "lodash";
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import MembersTable from "components/MembersTable.vue";
import { useMemberStore } from "src/stores/member";

export default {
  components: { MembersTable },
  data() {
    return {
      loaded: false,
      visiable: true,
      rows: [
        { id: "1", checked: false, type: null },
        { id: "2", checked: false, type: null },
        { id: "3", checked: false, type: null },
        { id: "4", checked: false, type: null },
        { id: "5", checked: false, type: null },
        { id: "6", checked: false, type: null },
        { id: "7", checked: false, type: null },
        { id: "8", checked: false, type: null },
        { id: "9", checked: false, type: null },
        { id: "10", checked: false, type: null },
        { id: "11", checked: false, type: null },
        { id: "12", checked: false, type: null },
      ],
      columns: [
        {
          name: "id",
          field: "id",
          label: "Month",
          sortable: false,
          style: "width: 15px",
          align: "center",
          stats: false,
        },
        {
          name: "total",
          field: "total",
          label: "Total",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "rolling",
          field: "rolling",
          label: "Rolling",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "end_date",
          field: "end_date",
          label: "End Date",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "monthly",
          field: "monthly",
          label: "Monthly",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "annual",
          field: "annual",
          label: "Annual",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "free",
          field: "free",
          label: "Free",
          sortable: false,
          align: "center",
          stats: true,
        },
        {
          name: "cancelled",
          field: "cancelled",
          label: "Cancelled",
          sortable: false,
          align: "center",
          stats: false,
        },
      ],
      year: 2015,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["getStats"]),
    ...mapActions(useMemberStore, ["reports"]),
    onRequest(load, props) {
      console.func(
        "pages/admins/members/ReportsPage:methods.onRequest()",
        arguments
      );
      Object.assign(props.row, {
        total: undefined,
        rolling: undefined,
        end_date: undefined,
        monthly: undefined,
        annual: undefined,
        free: undefined,
        cancelled: undefined,
        expand: false,
      });
      if (!load) return;
      this.reports({
        year: this.year,
        month: props.row.id,
      }).then((data) => {
        Object.assign(props.row, data);
      });
    },
    onLoad(props, col) {
      console.func(
        "pages/admins/members/ReportsPage:methods.onLoad()",
        arguments
      );

      if (props.row.expand && col === props.row.type) {
        props.row.expand = false;
        return;
      } else {
        props.row.expand = false;
        props.row.type = null;
      }

      this.$nextTick(() => {
        props.row.type = col;
        props.row.expand = true;
      });
    },
    onChangeYear() {
      console.func(
        "pages/admins/members/ReportsPage:methods.onChangeYear()",
        arguments
      );
      this.visiable = false;
      this.rows = this.rows.map((item) => ({
        ...item,
        total: undefined,
        rolling: undefined,
        end_date: undefined,
        monthly: undefined,
        annual: undefined,
        free: undefined,
        cancelled: undefined,
        type: undefined,
        checked: false,
      }));
      this.$nextTick(() => {
        this.visiable = true;
      });
    },
  },
  mounted() {
    this.getStats().then(() => {
      this.loaded = true;
    });
  },
  computed: {
    ...mapState(useAppStore, ["stats"]),
    years() {
      return range(2015, new Date().getFullYear() + 1, 1);
    },
  },
};
</script>
