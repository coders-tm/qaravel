<template>
  <base-table
    ref="bookings"
    :rows="rows"
    :columns="columns"
    hide-top
    hide-pagination
    :rows-per-page-options="[0]"
    no-data-label="No bookings avaialble"
    loaded
  >
    <template v-slot:body-cell-sn="props">
      {{ props.rowIndex + 1 }}
    </template>
    <template v-slot:body-cell-user="props">
      <base-select
        :readonly="hasSignOff"
        :bg-color="props.row.source ? 'green-1' : ''"
        placeholder="Select member"
        dense
        borderless
        v-model="props.row.user"
        :filter-method="getMember"
        map-options
        use-filter
        :option-label="(opt) => `${opt.name} (${opt.id})`"
        @update:model-value="onChange"
      >
        <template v-if="props.row.user" v-slot:after>
          <q-btn
            color="primary"
            icon="fas fa-arrow-up-right-from-square"
            flat
            dense
            round
            size="sm"
            tag="a"
            :to="{
              name: 'Single Member',
              params: {
                id: props.row.user.id,
              },
              query: {
                action: 'edit',
              },
            }"
          />
        </template>
      </base-select>
    </template>
    <template v-slot:body-cell-attendence="props">
      <q-checkbox
        :disable="hasSignOff"
        dense
        v-model="props.row.attendence"
        :label="props.value"
      />
    </template>
    <template v-slot:actions="props">
      <q-btn
        :disable="hasSignOff"
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
import { mapActions } from "pinia";
import { useMemberStore } from "src/stores/member";
export default {
  props: {
    rows: Array,
    allBookings: Array,
    columns: {
      type: Array,
      default: () => [
        {
          name: "sn",
          align: "left",
          label: "S/N",
          field: "sn",
          style: "width: 10px",
          sortable: false,
        },
        {
          name: "user",
          align: "left",
          label: "Name",
          field: "user",
          style: "width: 100px",
          sortable: false,
        },
        {
          name: "user_status",
          align: "left",
          label: "Status",
          field: "user",
          format: (val) => (val ? val.status : ""),
          style: "width: 100px",
          sortable: false,
        },
        {
          name: "user_email",
          align: "left",
          label: "Email",
          field: "user",
          format: (val) => (val ? val.email : ""),
          style: "width: 100px",
          sortable: false,
        },
        {
          name: "user_phone_number",
          align: "left",
          label: "Phone",
          field: "user",
          format: (val) => (val ? val.phone_number : ""),
          style: "width: 100px",
          sortable: false,
        },
        {
          name: "attendence",
          align: "left",
          label: "Attendence",
          field: "attendence",
          format: (val) => (val ? "Yes" : "No"),
          style: "width: 10px",
          sortable: false,
        },
        {
          name: "actions",
          align: "right",
          label: "",
          field: "actions",
        },
      ],
    },
    hasSignOff: Boolean,
  },
  emits: ["update:rows"],
  methods: {
    ...mapActions(useMemberStore, {
      getMember: "get",
    }),
    onRemove({ rowIndex }) {
      console.func("components/ClassBookings:methods.onRemove()", arguments);
      const rows = this.rows;
      rows.splice(rowIndex, 1);
      this.$emit("update:rows", rows);
    },
    onChange(props) {
      console.func("components/ClassBookings:methods.onChange()", arguments);
      const booking = this.allBookings.filter(
        (item) => item.user.id === props.id
      );
      if (booking.length > 1) {
        this.$core.warning("Member already booked a slot for this class!");
      }
    },
  },
};
</script>
