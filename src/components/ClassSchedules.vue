<template>
  <q-expansion-item
    header-class="bg-grey-4 text-subtitle2 text-black"
    expand-icon-class="text-black"
    class="class-schedules"
    :label="day"
    expand-separator
  >
    <template v-slot:header="{ expanded }">
      <q-item-section>
        <q-item-label>
          {{ day }}
        </q-item-label>
        <q-item-label v-if="startOfWeek" caption>
          {{ currentDate(startOfWeek, day) }}
        </q-item-label>
      </q-item-section>
      <q-item-section v-show="expanded" side>
        <q-item-label>
          <q-btn
            color="primary"
            @click.stop="onAdd"
            icon="fad fa-circle-plus"
            dense
            round
            flat
          />
          <q-btn
            color="primary"
            @click.stop="onSave"
            icon="fad fa-save"
            dense
            round
            flat
            v-if="canSave"
          />
        </q-item-label>
      </q-item-section>
    </template>
    <base-table
      :rows-per-page-options="[0]"
      hide-top
      hide-pagination
      :columns="columns"
      :rows="classes"
      loaded
    >
      <template v-slot:actions="props">
        <q-btn
          @click.stop="onRemove(props)"
          size="sm"
          round
          flat
          color="grey"
          icon="fas fa-trash-can"
        />
      </template>
      <template v-slot:body-cell-start_at="props">
        <base-time-input v-model="props.row.start_at" />
      </template>
      <template v-slot:body-cell-end_at="props">
        <base-time-input v-model="props.row.end_at" />
      </template>
      <template v-slot:body-cell-class="props">
        <base-select
          placeholder="Select"
          dense
          borderless
          v-model="props.row.class"
          :filter-method="getClass"
          map-options
          use-filter
          option-label="name"
          option-value="id"
        />
      </template>
      <template v-slot:body-cell-location="props">
        <base-select
          placeholder="Select"
          dense
          borderless
          v-model="props.row.location"
          :filter-method="getLocation"
          map-options
          use-filter
          option-label="label"
          option-value="id"
        />
      </template>
      <template v-slot:body-cell-instructor="props">
        <base-select
          placeholder="Select"
          dense
          borderless
          v-model="props.row.instructor"
          :filter-method="getInstructor"
          map-options
          use-filter
          option-label="name"
          option-value="id"
        />
      </template>
    </base-table>
  </q-expansion-item>
</template>

<script>
import { mapActions } from "pinia";
import { useClassListStore } from "src/stores/class-list";
import { useLocationStore } from "src/stores/location";
import { useInstructorStore } from "src/stores/instructor";
import { date } from "quasar";

const { formatDate, addToDate } = date;

const days = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

const currentDate = (date, day) =>
  formatDate(addToDate(date, { day: days[day] }), "DD/MM/YYYY");

export default {
  props: {
    rows: Array,
    day: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return Object.keys(days).includes(value);
      },
    },
    columns: {
      type: Array,
      default: () => [
        {
          name: "start_at",
          align: "left",
          label: "Start at",
          field: "start_at",
        },
        {
          name: "end_at",
          align: "left",
          label: "End at",
          field: "end_at",
        },
        {
          name: "class",
          align: "left",
          label: "Class",
          field: "class",
        },
        {
          name: "location",
          align: "left",
          label: "Location",
          field: "location",
        },
        {
          name: "instructor",
          align: "left",
          label: "Instructor",
          field: "instructor",
        },
        {
          name: "actions",
          align: "right",
          label: "",
          field: "actions",
        },
      ],
    },
    canSave: Boolean,
    startOfWeek: String,
  },
  data() {
    return {
      classes: this.rows,
      currentDate,
    };
  },
  emits: ["update:rows", "save"],
  methods: {
    ...mapActions(useClassListStore, { getClass: "get" }),
    ...mapActions(useLocationStore, { getLocation: "get" }),
    ...mapActions(useInstructorStore, { getInstructor: "get" }),
    onAdd() {
      console.func("components/ClassSchedules:methods.onAdd()", arguments);
      this.classes.push({
        day: this.day,
        instructor: null,
        start_of_week: this.startOfWeek,
        class: null,
        location: null,
      });
      this.$emit("update:rows", this.classes);
    },
    onSave() {
      console.func("components/ClassSchedules:methods.onSave()", arguments);
      this.$emit("save");
    },
    onRemove({ rowIndex }) {
      console.func("components/ClassSchedules:methods.onRemove()", arguments);
      this.classes.splice(rowIndex, 1);
      this.$emit("update:rows", this.classes);
    },
  },
};
</script>
