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
            <q-input dense outlined v-model="location.label" type="text" />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="location.is_active"
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
import { useLocationStore } from "stores/location";

const location = {
  is_active: true,
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(location),
      location: cloneDeep(location),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useLocationStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/locations/LocationPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.location)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.location = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Location",
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
      console.func(
        "pages/admins/locations/LocationPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.location = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/locations/LocationPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.location = data;
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
        JSON.stringify(this.location) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.location) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
