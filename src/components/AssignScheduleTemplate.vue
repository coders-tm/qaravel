<template>
  <base-dialog
    title="Edit Weeks Schedules"
    body-class="scroll"
    content-style="width: 700px; max-width: 95vw"
    ref="dialog"
    persistent
    @hide="onDialogHide"
    use-separator
  >
    <template v-slot:body>
      <div class="row q-col-gutter-md">
        <div class="col-sm-6 col-xs-6">
          <base-select
            options-dense
            v-model="year"
            :options="years"
            dense
            outlined
            @update:model-value="getTemplates"
          />
        </div>
        <div class="col-sm-6 col-xs-6">
          <base-select
            options-dense
            map-options
            v-model="month"
            :options="months"
            dense
            outlined
            @update:model-value="getTemplates"
            emit-value
          />
        </div>
        <div class="col-xs-12">
          <base-info>
            Please be careful when assigning templates. If you remove a week's
            template or reassign a template all data attached to that current
            week will be deleted as it will be treated as a new week. This
            includes bookings and registers connected to it. If you wish to make
            changes to class details for a particular day/week please use the
            "Week Schedules" tab.
          </base-info>
          <q-separator class="q-mt-md" />
          <q-list class="bordered">
            <q-item
              class="q-pl-none q-pr-none"
              v-for="(item, index) in weeks"
              :key="index"
            >
              <q-item-section>
                <div class="text-subtitle2">
                  <q-icon name="fas fa-calendar" class="q-mr-sm" />{{
                    item.start_of_week_formated
                  }}
                </div>
              </q-item-section>
              <q-item-section>
                <base-select
                  placeholder="Select"
                  dense
                  borderless
                  v-model="item.template"
                  :filter-method="getTemplate"
                  map-options
                  use-filter
                  option-label="label"
                  option-value="id"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <q-card-section class="text-right">
        <div class="q-gutter-sm">
          <q-btn no-caps outline label="Cancel" color="grey" v-close-popup />
          <q-btn
            :disable="disable"
            no-caps
            label="Update"
            color="primary"
            @click="onDone"
          />
        </div>
      </q-card-section>
    </template>

    <template v-slot:loading
      ><q-inner-loading :showing="loading">
        <q-spinner-oval size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </base-dialog>
</template>

<script>
import { cloneDeep, range } from "lodash";
import { mapActions } from "pinia";
import { useWeekTemplateStore } from "stores/week-template";
import { useTemplateStore } from "src/stores/template";

export default {
  data() {
    return {
      loading: false,
      year: new Date().getFullYear(),
      month: new Date().getMonth().toString(),
      months: [
        {
          label: "January",
          value: "0",
        },
        {
          label: "February",
          value: "1",
        },
        {
          label: "March",
          value: "2",
        },
        {
          label: "April",
          value: "3",
        },
        {
          label: "May",
          value: "4",
        },
        {
          label: "June",
          value: "5",
        },
        {
          label: "July",
          value: "6",
        },
        {
          label: "August",
          value: "7",
        },
        {
          label: "September",
          value: "8",
        },
        {
          label: "October",
          value: "9",
        },
        {
          label: "November",
          value: "10",
        },
        {
          label: "December",
          value: "11",
        },
      ],
      default: [],
      weeks: [],
    };
  },
  emits: ["ok", "hide"],
  methods: {
    ...mapActions(useWeekTemplateStore, ["get", "update"]),
    ...mapActions(useTemplateStore, {
      getTemplate: "get",
    }),
    show() {
      console.func(
        "components/AssignScheduleTemplate:methods.show()",
        arguments
      );
      this.$refs.dialog.show();
      this.getTemplates();
    },
    hide() {
      console.func(
        "components/AssignScheduleTemplate:methods.close()",
        arguments
      );
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/AssignScheduleTemplate:methods.onDialogHide()",
        arguments
      );
      this.$emit("hide");
    },
    onDone() {
      console.func(
        "components/AssignScheduleTemplate:methods.onDone()",
        arguments
      );
      this.update({
        weeks: this.weeks,
      })
        .then(({ message }) => {
          this.$q.notify(message);
          this.$emit("ok");
          this.hide();
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
          this.loading = false;
        });
    },
    getTemplates() {
      console.func(
        "components/AssignScheduleTemplate:methods.getTemplates()",
        arguments
      );
      this.loading = true;
      this.get({
        month: this.month,
        year: this.year,
      })
        .then((data) => {
          this.weeks = data;
          this.default = cloneDeep(data);
          this.loading = false;
        })
        .catch(() => {
          this.$core.error(error, { title: "Error" });
          this.loading = false;
        });
    },
  },
  computed: {
    years() {
      return range(this.year - 2, this.year + 5, 1);
    },
    disable() {
      return JSON.stringify(this.default) === JSON.stringify(this.weeks);
    },
  },
};
</script>
