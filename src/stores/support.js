import { defineStore } from "pinia";
import Api from "../services/api";

const type_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Members only",
    value: "users",
  },
  {
    label: "Contact form",
    value: "contact",
  },
];

const default_status_options = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Ongoing",
    value: "Ongoing",
  },
  {
    label: "Resolved",
    value: "Resolved",
  },
];

const status_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Open",
    value: "Open",
  },
  ...default_status_options,
];

export const useSupportStore = defineStore("support", {
  state: () => ({
    rows: [],
    module: {
      name: "Supports",
      singular: "support",
      plural: "supports",
    },
    columns: [
      {
        name: "id",
        align: "left",
        label: "Support",
        field: (row) => `[${row.id}] ${row.subject}`,
        style: "width: 250px; white-space: normal;",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "created_at",
        align: "left",
        label: "Created at",
        field: "created_at",
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "phone",
        align: "left",
        label: "Contact",
        field: "phone",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "status",
        align: "center",
        label: "Status",
        field: "status",
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "last_reply",
        align: "left",
        label: "Last update",
        field: "last_reply",
        format: (val) =>
          val && val.user ? `${val.user.name} on ${val.created_at}` : null,
        style: "width: 40px",
        sortable: false,
        guard: ["admins", "users"],
      },
      { name: "actions", align: "right", sortable: false, guard: ["admins"] },
    ],
    actions: [
      {
        label: "Reply",
        permission: "Edit",
        action: "route",
        route: "Single Support",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-paper-plane",
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
        title: "Type",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "type",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: type_options,
        deleted: "all",
        prefix: "Type:",
        guard: ["admins"],
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
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: status_options,
        deleted: "all",
        prefix: "Status:",
        guard: ["admins"],
        width: "6",
      },
      {
        icon: "fad fa-plus-circle",
        label: "Create message",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Support",
        color: "primary",
        deleted: "all",
        guard: ["users"],
        width: "12",
      },
    ],
    filters: [],
    status_options,
    default_status_options,
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("enquiries", playload)
          .then((response) => {
            this.rows = response.data.map((item) => ({
              ...item,
              subject: item.subject || "Contact us",
            }));
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`enquiries/${playload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/store`, playload)
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
        Api.delete(`enquiries/${playload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    reply(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/${playload.moduleId}/reply`, playload)
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
