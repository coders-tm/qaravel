import { defineStore } from "pinia";
import Api from "../../services/api";

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
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Deactive",
    value: "Deactive",
  },
  {
    label: "Hold",
    value: "Hold",
  },
  {
    label: "Lost",
    value: "Lost",
  },
  {
    label: "Error",
    value: "Error",
  },
];

export const useEnquiryStore = defineStore("enquiry", {
  state: () => ({
    rows: [],
    module: {
      name: "Enquiries",
      singular: "enquiry",
      plural: "enquiries",
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
      { name: "actions", align: "right", sortable: false },
    ],
    filters: [],
  }),
  getters: {
    toolbar() {
      return [
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
          method: this.get,
        },
        {
          icon: "fad fa-plus-circle",
          label: "Add enquiry",
          permission: "New",
          action: "route",
          params: { id: "add" },
          route: "Single Member",
          color: "primary",
          deleted: "all",
          width: "6",
        },
      ];
    },
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("users/enquiry", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
