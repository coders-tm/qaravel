import { defineStore } from "pinia";
import Api from "../../services/api";
import core from "../../services/core";
import { useClassListStore } from "stores/class-list";
import { useInstructorStore } from "stores/instructor";

const classStore = useClassListStore();
const instructorStore = useInstructorStore();

const sort_options = [
  {
    label: "Default",
    value: "start_at",
  },
  {
    label: "Class",
    value: "class_id",
  },
  {
    label: "Instructor",
    value: "instructor_id",
  },
];

export const useClassScheduleStore = defineStore("member-class-schedule", {
  state: () => ({
    rows: [],
    module: {
      name: "Class schedules",
      singular: "class schedule",
      plural: "class schedules",
    },
    columns: [
      {
        name: "start_at",
        align: "left",
        label: "Start at",
        field: "start_at_formated",
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "end_at",
        align: "left",
        label: "End at",
        field: "end_at_formated",
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "class",
        align: "left",
        label: "Class Name",
        field: "class",
        format: (val) => (val ? val.name : ""),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "location",
        align: "left",
        label: "Location",
        field: "location",
        format: (val) => (val ? val.label : ""),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "instructor",
        align: "left",
        label: "Instructor",
        field: "instructor",
        format: (val) => (val ? val.name : ""),
        style: "width: 40px",
        sortable: false,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    toolbar: [
      {
        title: "Class",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "class",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 190px",
        mapOptions: true,
        emitValue: true,
        useFilter: true,
        clearable: true,
        filterMethod: classStore.options,
        optionLabel: "name",
        optionValue: "id",
        prefix: "Class:",
        deleted: "all",
        width: "12",
      },
      {
        title: "Instructor",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "instructor",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 190px",
        mapOptions: true,
        emitValue: true,
        useFilter: true,
        clearable: true,
        filterMethod: instructorStore.options,
        optionLabel: "name",
        optionValue: "id",
        prefix: "Instructor:",
        deleted: "all",
        width: "6",
      },
      {
        title: "Sort",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "otherSortBy",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: sort_options,
        prefix: "Sort:",
        deleted: "all",
        width: "6",
      },
    ],
    filters: [],
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("member/class-schedules", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`member/class-schedules/${playload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    book(playload) {
      return new Promise((resolve, reject) => {
        core
          .confirm(
            `${playload.class.name} on ${playload.day} (${playload.date_at_formated}) at ${playload.time}`
          )
          .then(() => {
            Api.post(`member/class-schedules/${playload.id}`)
              .then((response) => {
                playload.is_active = !playload.is_active;
                const { message } = response;
                core.success(message);
                resolve(response);
              })
              .catch((error) => {
                core.error(error);
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
