import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

const type_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Rolling",
    value: "rolling",
  },
  {
    label: "End Date",
    value: "ends",
  },
  {
    label: "Annual",
    value: "annual",
  },
  {
    label: "Free",
    value: "free",
  },
  {
    label: "Checked",
    value: "rec_checked",
  },
  {
    label: "Not Checked",
    value: "rec_notchecked",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

export const useFinanceMembershipStore = defineStore("finance-membership", {
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
        name: "ends_fee",
        align: "left",
        label: "Ends Fee",
        field: (row) =>
          row?.plan?.monthly_fee && row?.payment?.ends_at_formated
            ? core.money(row?.plan?.monthly_fee)
            : core.money(0),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "monthly_fee",
        align: "left",
        label: "Monthly Fee",
        field: (row) =>
          row?.payment?.ends_at_formated
            ? core.money(0)
            : core.money(row?.plan?.monthly_fee),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "annual_fee",
        align: "left",
        label: "Annual Fee",
        field: (row) => core.money(row?.plan?.annual_fee),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "collect_id",
        align: "left",
        label: "Collect Id",
        field: "collect_id",
        sortable: true,
      },
      {
        name: "starts_at",
        align: "left",
        label: "Starts at",
        field: (row) => row?.payment?.starts_at_formated,
        sortable: false,
      },
      {
        name: "ends_at",
        align: "left",
        label: "Ends at",
        field: (row) => row?.payment?.ends_at_formated,
        sortable: false,
      },
      {
        name: "mem_rec",
        align: "left",
        label: "Checked",
        field: "mem_rec",
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
        Api.get("finance/memberships", playload)
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
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/${playload.id}/finance-membership`, playload)
          .then((response) => {
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
    checked(playload) {
      playload.loading = true;
      return new Promise((resolve, reject) => {
        Api.post(`users/${playload.id}/checked-mem-rec`)
          .then((response) => {
            playload.loading = false;
            playload.mem_rec = !playload.mem_rec;
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
