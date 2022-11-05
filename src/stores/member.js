import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

const status_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Active",
    value: true,
  },
  {
    label: "NS Past 7 Days",
    value: "no-show",
  },
  {
    label: "Blocked",
    value: "blocked",
  },
];

export const useMemberStore = defineStore("member", {
  state: () => ({
    rows: [],
    module: {
      name: "Members",
      singular: "member",
      plural: "members",
    },
    columns: [
      {
        name: "id",
        align: "left",
        label: "Pro-Fit28 ID",
        field: "profit_id_formated",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
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
        name: "phone_number",
        align: "left",
        label: "Contact",
        field: "phone_number",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "last_update",
        align: "left",
        label: "Last update",
        field: "last_update",
        format: (val) =>
          val && val.admin ? `${val.admin.name} on ${val.date_time}` : null,
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "status",
        align: "center",
        label: "Status",
        field: "status",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "last_login",
        align: "left",
        label: "Last login",
        field: "last_login",
        format: (val) => (val ? val.date_time : null),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "ns_bookings_count",
        align: "center",
        label: "NS",
        field: "ns_bookings_count",
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "last_ns_bookings",
        align: "left",
        label: "Last NS",
        field: "last_ns_bookings",
        format: (val) => (val ? val.schedule.date_at_formated : null),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "release_at",
        align: "left",
        label: "Release at",
        field: "blocked",
        format: (val) => (val ? val?.release_at : null),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "is_active",
        align: "left",
        label: "Active",
        field: "is_active",
        style: "width: 40px",
        format: (val) => (val.is_active ? "Yes" : "No"),
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    toolbar: [
      {
        title: "Status",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "status",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: status_options,
        deleted: "all",
        prefix: "Status:",
        width: "12",
      },
      {
        title: "Rag",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "rag",
        placeholder: "Rag",
        optionsDense: true,
        style: "width: 100px",
        mapOptions: true,
        emitValue: true,
        options: [null, "red", "green", "amber", "white"].map((item) => ({
          label: item
            ? `<div class="text-center"><i class="q-icon fas fa-circle rag-${item}" style="font-size: 13px;" aria-hidden="true" role="presentation" ></i></div>`
            : `<div class="text-center">All</div>`,
          value: item,
        })),
        optionsHtml: true,
        prefix: "Rag:",
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
        label: "Add member",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Member",
        color: "primary",
        deleted: "all",
        width: "6",
      },
    ],
    filters: [],
  }),
  getters: {
    actions() {
      return [
        {
          label: "Edit",
          permission: "Edit",
          action: "route",
          route: "Single Member",
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
      ];
    },
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("users", playload)
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
        Api.post("users/store", playload)
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
        Api.get(`users/${playload}`)
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
        Api.put(`users/${playload.id}`, playload)
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
        Api.delete(`users/${playload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changeActive(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/${playload.id}/change-active`)
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
      });
    },
    notes(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/${playload.moduleId}/notes`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    schedules(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`users/${playload.moduleId}/schedules`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    reports(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`users/reports`, playload)
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
