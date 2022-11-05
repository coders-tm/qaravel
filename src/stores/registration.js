import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";
import { useClassListStore } from "stores/class-list";
import { useLocationStore } from "stores/location";
import { useInstructorStore } from "stores/instructor";

const classStore = useClassListStore();
const locationStore = useLocationStore();
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

const calCapacity = (row) => {
  let retval = 0;
  const capacity = row.capacity;
  const space = capacity - row.total_bookings;
  const standby = 5 - row.total_stand_by_bookings;
  if (capacity) {
    retval = 100 - (space / capacity) * 100;
  }
  return `${capacity}(${space})(${standby}) \n` + parseFloat(retval).toFixed(2);
};

const calAttendence = (row) => {
  if (!row.has_sign_off) return 0;
  return parseFloat(
    ((row.total_bookings - row.no_show) * 100) / row.capacity
  ).toFixed(2);
};

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    rows: [],
    module: {
      name: "Registrations",
      singular: "registration",
      plural: "registrations",
    },
    columns: [
      {
        name: "day_index",
        align: "left",
        label: "Day",
        field: (row) => `${row.day} - ${row.date_at_formated}`,
        style: "width: 40px",
        sortable: true,
      },
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
        name: "ns",
        align: "center",
        label: "NS",
        field: (row) => (row.has_sign_off ? row.no_show : 0),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "at",
        align: "center",
        label: "AT (%)",
        field: (row) => calAttendence(row),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "capacity",
        align: "center",
        label: "Capacity (%)",
        field: (row) => calCapacity(row),
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
      {
        name: "has_remote",
        align: "center",
        label: "Remote",
        field: "has_remote",
        format: (val) => (val ? "Yes" : "No"),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "cost",
        align: "left",
        label: "Cost",
        field: "cost",
        format: (val) => core.money(val),
        style: "width: 40px",
        sortable: false,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: [
      {
        label: "Edit",
        permission: "Edit",
        action: "route",
        route: "Single Registration",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
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
        filterMethod: classStore.get,
        optionLabel: "name",
        optionValue: "id",
        prefix: "Class:",
        deleted: "all",
        width: "12",
      },
      {
        title: "Location",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "location",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 190px",
        mapOptions: true,
        emitValue: true,
        useFilter: true,
        clearable: true,
        filterMethod: locationStore.get,
        optionLabel: "label",
        optionValue: "id",
        prefix: "Location:",
        deleted: "all",
        width: "6",
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
        filterMethod: instructorStore.get,
        optionLabel: "name",
        optionValue: "id",
        prefix: "Instructor:",
        deleted: "all",
        width: "6",
      },
      {
        title: "Date",
        action: "request",
        component: "base-date-input",
        dense: true,
        outlined: true,
        key: "date",
        placeholder: "Select",
        style: "width: 150px",
        prefix: "Date:",
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
      {
        tooltip: "Export as CSV",
        icon: "fas fa-file-csv",
        action: "export",
        color: "primary",
        deleted: "all",
        type: "csv",
        padding: "14px",
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
        Api.get("registrations", playload)
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
        Api.get(`registrations/${playload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.put(`registrations/${playload.id}`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    pdf(playload) {
      return new Promise((resolve, reject) => {
        Api.download(`registrations/${playload}/pdf`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    calCapacity,
    calAttendence,
  },
});
