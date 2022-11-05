import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

export const useFinanceTypeStore = defineStore("finance-type", {
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
        name: "plan_id",
        align: "left",
        label: "Plan",
        field: (row) => row?.plan?.label,
        style: "width: 250px; white-space: normal",
        sortable: true,
      },
    ],
    toolbar: [],
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("finance/types", playload)
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
