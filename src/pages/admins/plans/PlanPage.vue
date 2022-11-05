<template>
  <q-page padding>
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
    >
      <div class="q-gutter-md">
        <base-section title="General information">
          <div class="col-xs-12 col-sm-12">
            <div class="text-label">Label</div>
            <q-input dense outlined v-model="plan.label" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Admin fee</div>
            <base-price-input
              dense
              outlined
              v-model="plan.admin_fee"
              type="text"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Monthly fee</div>
            <base-price-input
              dense
              outlined
              v-model="plan.monthly_fee"
              type="text"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Yearly fee</div>
            <base-price-input
              dense
              outlined
              v-model="plan.annual_fee"
              type="text"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="text-label">Description</div>
            <q-input
              dense
              outlined
              v-model="plan.description"
              type="textarea"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="text-label">Note</div>
            <q-input dense outlined v-model="plan.note" type="textarea" />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="plan.is_active"
              label="Active"
              color="green"
            />
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { usePlanStore } from "stores/plan";

const plan = {
  is_active: true,
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(plan),
      plan: cloneDeep(plan),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(usePlanStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func("pages/admins/plans/PlanPage:methods.onSubmit()", arguments);
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.plan)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.plan = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Plan",
            params: {
              id: data.id,
            },
            query: {
              action: "edit",
            },
          });
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onReset(props) {
      console.func("pages/admins/plans/PlanPage:methods.onReset()", arguments);
      this.loaded = false;
      this.$nextTick(() => {
        this.plan = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func("pages/admins/plans/PlanPage:methods.onCancel()", arguments);
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.plan = data;
          this.default = cloneDeep(data);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    } else {
      this.loaded = true;
    }
  },
  computed: {
    edit() {
      return ["add", "edit"].includes(this.action) || this.id === "add";
    },
    creating() {
      return this.id === "add";
    },
    id() {
      return this.$route.params.id;
    },
    action() {
      return this.$route.query.action;
    },
    disable() {
      return (
        this.default &&
        JSON.stringify(this.plan) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.plan) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
