import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";
import { useClassListStore } from "stores/class-list";

const classList = useClassListStore();

const status_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Deactive",
    value: "Deactive",
  },
  {
    label: "Hold",
    value: "Hold",
  },
];

const type_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Instructors",
    value: 0,
  },
  {
    label: "Personal trainer",
    value: 1,
  },
];

export const useInstructorStore = defineStore("instructor", {
  state: () => ({
    rows: [],
    module: {
      name: "Instructors",
      singular: "instructor",
      plural: "instructors",
    },
    columns: [
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "phone",
        align: "left",
        label: "Phone",
        field: "phone",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "status",
        align: "left",
        label: "Status",
        field: "status",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "hourspw",
        align: "left",
        label: "Hours",
        field: "hourspw",
        format: (val) => core.money(val),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "rentpw",
        align: "left",
        label: "Rent",
        field: "rentpw",
        format: (val) => core.money(val),
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: [
      {
        label: "Edit",
        permission: "Edit",
        action: "route",
        route: "Single Instructor",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: "Delete",
        permission: "Delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: "Restore",
        permission: "Delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
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
        filterMethod: classList.get,
        optionLabel: "name",
        optionValue: "id",
        prefix: "Class:",
        deleted: "all",
        width: "12",
      },
      {
        title: "Type",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "is_pt",
        placeholder: "Type",
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: type_options,
        prefix: "Type:",
        deleted: "all",
        width: "6",
      },
      {
        title: "Status",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "status",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: status_options,
        prefix: "Status:",
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
      {
        icon: "fad fa-plus-circle",
        label: "Add instructor",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Instructor",
        color: "primary",
        deleted: "all",
        width: "12",
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
        Api.get("instructors", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    options(playload) {
      return new Promise((resolve, reject) => {
        Api.get("instructors/options", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(playload) {
      return new Promise((resolve, reject) => {
        Api.post("instructors/store", playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`instructors/${playload}`)
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
        Api.put(`instructors/${playload.id}`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete(playload) {
      return new Promise((resolve, reject) => {
        Api.delete(`instructors/${playload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
