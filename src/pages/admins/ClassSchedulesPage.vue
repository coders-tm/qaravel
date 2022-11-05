<template>
  <q-page padding>
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
      ref="baseForm"
    >
      <div class="q-gutter-md">
        <base-section
          title="Class schedules"
          description="Template class schedules will be use to changed bulk week class schedules."
          no-row
        >
          <q-toolbar class="q-pa-none">
            <q-toolbar-title class="text-body1 text-bold">
              Week: {{ formatDate(startOfWeek, "DD/MM/YYYY") }}
            </q-toolbar-title>
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="fas fa-calendar-lines-pen"
              @click="assignScheduleTemplate"
            >
              <base-tooltip-widget>Edit/View Weeks</base-tooltip-widget>
            </q-btn>
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="fas fa-angle-left"
              @click="onRequest(previousOfWeek)"
            >
              <base-tooltip-widget>
                Previous Week ({{ formatDate(previousOfWeek, "DD/MM/YYYY") }})
              </base-tooltip-widget>
            </q-btn>
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="fas fa-circle"
              @click="onRequest()"
            >
              <base-tooltip-widget>
                Current Week({{ formatDate(new Date(), "DD/MM/YYYY") }})
              </base-tooltip-widget>
            </q-btn>
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="fas fa-angle-right"
              @click="onRequest(nextOfWeek)"
            >
              <base-tooltip-widget>
                Next Week ({{ formatDate(nextOfWeek, "DD/MM/YYYY") }})
              </base-tooltip-widget>
            </q-btn>
          </q-toolbar>
          <div class="q-gutter-y-xs">
            <class-schedules
              v-for="(item, index) in schedules"
              :key="index"
              :day="index"
              v-model:rows="schedules[index]"
              group="schedules"
              :default-opened="index === 'Monday'"
              :can-save="!disable"
              @save="$refs.baseForm.onSave()"
              :start-of-week="startOfWeek"
            />
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep, groupBy } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useClassScheduleStore } from "stores/class-schedule";
import ClassSchedules from "components/ClassSchedules.vue";
import AssignScheduleTemplate from "components/AssignScheduleTemplate.vue";
import { date } from "quasar";

const { formatDate, subtractFromDate, getDayOfWeek } = date;

const startOfWeek = (newDate = null) =>
  formatDate(
    subtractFromDate(newDate, { days: getDayOfWeek(newDate) - 1 }),
    "YYYY-MM-DD"
  );

const defaultSchedules = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const processData = (data) => {
  let schedules = groupBy(data, (item) => item.day);
  let classSchedules = cloneDeep(defaultSchedules);
  Object.keys(classSchedules).forEach((item) => {
    classSchedules[item] = schedules[item] || [];
  });
  return classSchedules;
};

export default {
  components: {
    SkeletonSinglePage,
    ClassSchedules,
  },
  data() {
    return {
      default: cloneDeep(defaultSchedules),
      schedules: cloneDeep(defaultSchedules),
      loaded: false,
      submited: false,
      startOfWeek: startOfWeek(new Date()),
      previousOfWeek: null,
      nextOfWeek: null,
      formatDate,
    };
  },
  methods: {
    ...mapActions(useClassScheduleStore, ["get", "update"]),
    onRequest(startOfWeek) {
      console.func(
        "pages/admins/ClassSchedulesPage:methods.onRequest()",
        arguments
      );
      this.loading = true;

      this.get({
        startOfWeek: startOfWeek,
      })
        .then(({ previousOfWeek, startOfWeek, nextOfWeek, data }) => {
          this.loaded = false;

          this.$nextTick(() => {
            const templateData = processData(data);
            this.schedules = templateData;
            this.default = cloneDeep(templateData);
            this.loaded = true;
          });

          // updated the pagination
          this.previousOfWeek = previousOfWeek;
          this.startOfWeek = startOfWeek;
          this.nextOfWeek = nextOfWeek;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
    onSubmit(props) {
      console.func(
        "pages/admins/ClassSchedulesPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;

      const schedules = [].concat(...Object.values(cloneDeep(this.schedules)));

      this.update({
        start_of_week: this.startOfWeek,
        class_schedules: schedules,
      })
        .then(({ message }) => {
          this.submited = false;

          this.loaded = false;
          this.$nextTick(() => {
            this.default = cloneDeep(this.schedules);
            this.loaded = true;
          });

          this.$q.notify(message);
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onReset(props) {
      console.func(
        "pages/admins/ClassSchedulesPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.schedules = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/ClassSchedulesPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
    assignScheduleTemplate() {
      console.func(
        "pages/admins/ClassSchedulesPage:methods.assignScheduleTemplate()",
        arguments
      );
      this.$q
        .dialog({
          component: AssignScheduleTemplate,
        })
        .onOk((data) => {
          this.onRequest(this.startOfWeek);
        });
    },
  },
  async mounted() {
    this.onRequest();
  },
  computed: {
    disable() {
      return (
        this.default &&
        JSON.stringify(this.schedules) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.schedules) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
