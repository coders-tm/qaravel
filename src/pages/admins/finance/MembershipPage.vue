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
          <template v-slot:top-bottom>
            <div class="row q-pt-lg">
              <div class="text-center col-xs-4 col-sm">
                <strong>Total</strong><br />{{ stats.totalMember }}
              </div>
              <div class="text-center col-xs-4 col-sm">
                <strong>Rolling</strong><br />{{ stats.rolling }}
              </div>
              <div class="text-center col-xs-4 col-sm">
                <strong>End Date</strong><br />{{ stats.endDate }}
              </div>
              <div class="text-center col-xs-4 col-sm">
                <strong>Annual</strong><br />{{ stats.annual }}
              </div>
              <div class="text-center col-xs-4 col-sm">
                <strong>Free</strong><br />{{ stats.free }}
              </div>
              <div class="text-center col-xs-4 col-sm">
                <strong>Checked</strong><br />{{ stats.checked }}
              </div>
              <div class="text-center col-xs-6 col-sm">
                <strong>Not Checked</strong><br />{{ stats.notChecked }}
              </div>
              <div class="text-center col-xs-6 col-sm">
                <strong>Monthly Fee</strong><br />{{
                  $core.money(stats.monthlyFee)
                }}
              </div>
              <div class="text-center col-xs-6 col-sm">
                <strong>Annual Fee</strong><br />{{
                  $core.money(stats.annualFee)
                }}
              </div>
              <div class="text-center col-xs-6 col-sm">
                <strong>End Fee</strong><br />{{
                  $core.money(stats.endDateFee)
                }}
              </div>
            </div>
          </template>
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
          <template v-slot:body-cell-collect_id="props">
            <base-input
              @click.stop
              :disable="props.row.disable"
              placeholder="Enter collect id"
              v-model="props.row.collect_id"
              @update:model-value="props.row.has_change = true"
              @blur="onUpdate(props)"
              debounce="1500"
              borderless
            />
          </template>
          <template v-slot:body-cell-admin_date="props">
            <base-input
              @click.stop
              :disable="props.row.disable"
              type="date"
              @update:model-value="props.row.has_change = true"
              @blur="onUpdate(props)"
              v-model="props.row.payment.admin_date"
              borderless
            />
          </template>
          <template v-slot:body-cell-starts_at="props">
            <base-input
              @click.stop
              :disable="props.row.disable"
              type="date"
              @update:model-value="props.row.has_change = true"
              @blur="onUpdate(props)"
              v-model="props.row.payment.starts_at"
              borderless
            />
          </template>
          <template v-slot:body-cell-ends_at="props">
            <base-input
              @click.stop
              :disable="props.row.disable"
              type="date"
              @update:model-value="props.row.has_change = true"
              @blur="onUpdate(props)"
              v-model="props.row.payment.ends_at"
              borderless
            />
          </template>
          <template v-slot:body-cell-mem_rec="props">
            <q-checkbox
              dense
              @click.stop
              :disable="props.row.loading"
              :model-value="props.row.mem_rec"
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
import { useFinanceMembershipStore } from "stores/finance-membership";
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
        includes: ["plan", "payment"],
      },
    };
  },
  methods: {
    ...mapActions(useFinanceMembershipStore, ["checked", "update", "get"]),
    onRequest(props) {
      console.func(
        "pages/admins/finance/MembershipPage:methods.onRequest()",
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
    onUpdate(props) {
      console.func(
        "pages/admins/finance/MembershipPage:methods.onUpdate()",
        arguments
      );

      if (!props.row.has_change) return;

      props.row.has_change = false;

      const { row } = props;
      props.disable = true;

      const data = {
        id: row.id,
        collect_id: row.collect_id,
        admin_date: row.payment.admin_date,
        starts_at: row.payment.starts_at,
        ends_at: row.payment.ends_at,
      };

      this.update(data)
        .then(() => {
          props.disable = false;
        })
        .catch(() => {
          props.disable = false;
        });
    },
    rowClicked(evt, row) {
      console.func(
        "pages/admins/finance/MembershipPage:methods.rowClicked()",
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
    ...mapState(useFinanceMembershipStore, ["columns", "toolbar", "rows"]),
    permissions() {
      return [];
    },
  },
};
</script>
