<template>
  <base-table
    class="membership-list"
    hide-top
    hide-pagination
    :rows-per-page-options="[0]"
    :columns="columns"
    :rows="options"
    :loaded="loaded"
  >
    <template v-slot:body-cell-label="props">
      <base-input
        placeholder="Membership label"
        borderless
        v-model="props.row.label"
      />
    </template>
    <template v-slot:body-cell-price="props">
      <base-price-input dense borderless v-model="props.row.price" />
    </template>
    <template v-slot:body-cell-plan="props">
      <base-select
        placeholder="Select"
        :model-value="props.row.plan"
        :filter-method="getPlan"
        @update:model-value="(val) => onChangePlan(val, props)"
        map-options
        use-filter
        options-html
        option-label="label"
        option-value="id"
        dense
        borderless
      />
    </template>
    <template v-slot:body-cell-is_active="props">
      <q-toggle dense v-model="props.row.is_active" />
    </template>
    <template v-slot:actions="props">
      <q-btn
        class="q-mr-sm"
        size="sm"
        round
        flat
        color="primary"
        icon="fas fa-layer-group"
        @click.stop="onChangeFeature(props)"
      />
      <q-btn
        @click.stop="onRemove(props)"
        size="sm"
        round
        flat
        color="grey"
        icon="fas fa-trash-can"
      />
    </template>
  </base-table>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import { usePlanStore } from "stores/plan";
import core from "../../../services/core";
import FeaturesDialog from "components/FeaturesDialog.vue";

export default {
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          name: "label",
          align: "left",
          label: "Label",
          field: "label",
        },
        {
          name: "price",
          align: "left",
          label: "Price",
          field: "price",
          format: (val) => core.money(val),
        },
        {
          name: "plan",
          align: "left",
          label: "Plan",
          field: "plan",
          format: (val) => (val ? val.label : null),
        },
        {
          name: "is_active",
          align: "center",
          label: "Active",
          field: "is_active",
        },
        {
          name: "actions",
          align: "right",
          label: "",
          field: "actions",
          style: "width: 30px",
        },
      ],
    },
    options: Array,
    loaded: Boolean,
  },
  emits: ["remove"],
  methods: {
    ...mapActions(usePlanStore, {
      getPlan: "get",
    }),
    onChangePlan(plan, props) {
      console.func(
        "components/base/settings/MembershipsList:methods.onChangePlan()",
        arguments
      );
      if (!plan) return;
      props.row.plan = {
        id: plan.id,
        label: plan.label,
      };
      props.row.id = Date.now() + plan.id;
      props.row.price = plan.monthly_fee;
    },
    onRemove({ rowIndex }) {
      console.func(
        "components/base/settings/MembershipsList:methods.onRemove()",
        arguments
      );
      this.$emit("remove", rowIndex);
    },
    onChangeFeature(props) {
      console.func(
        "components/base/settings/MembershipsList:methods.onChangeFeature()",
        arguments
      );
      this.$q
        .dialog({
          component: FeaturesDialog,
          componentProps: {
            modelValue: props.row.features,
          },
        })
        .onOk((playload) => {
          props.row.features = cloneDeep(playload);
        });
    },
  },
};
</script>
