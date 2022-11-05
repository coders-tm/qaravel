import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

const type_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Checked",
    value: "checked",
  },
  {
    label: "Not Checked",
    value: "notchecked",
  },
];

export const useFinanceAdminStore = defineStore("finance-admin", {
  state: () => ({
    rows: [],
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
        name: "starts_at",
        align: "left",
        label: "Starts at",
        style: "width: 40px",
        field: (row) => row?.payment?.starts_at_formated,
        sortable: false,
      },
      {
        name: "ends_at",
        align: "left",
        label: "Ends at",
        style: "width: 40px",
        field: (row) => row?.payment?.ends_at_formated,
        sortable: false,
      },
      {
        name: "amount",
        align: "left",
        label: "Amount",
        field: (row) => core.money(row?.payment?.amount || row?.plan?.plan_fee),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "foc",
        align: "left",
        label: "Checked",
        field: "foc",
        format: (val) => (val ? "Yes" : "No"),
        sortable: true,
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
        width: "12",
      },
    ],
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("finance/admins", playload)
          .then((response) => {
            this.rows = response.data.map((item) => ({
              ...item,
              payment: item.payment || {},
            }));
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    checked(playload) {
      playload.loading = true;
      return new Promise((resolve, reject) => {
        Api.post(`users/${playload.id}/checked-foc`)
          .then((response) => {
            playload.loading = false;
            playload.foc = !playload.foc;
            const { message } = response;
            core.success(message);
            resolve(response);
          })
          .catch((error) => {
            playload.loading = false;
            core.error(error);
            reject(error);
          });
      });
    },
  },
});
