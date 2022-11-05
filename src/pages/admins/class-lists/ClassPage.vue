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
          <div class="col-xs-12 col-sm-6">
            <div class="text-label">Name</div>
            <q-input dense outlined v-model="classlist.name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="text-label">Capacity</div>
            <q-input
              dense
              outlined
              v-model="classlist.capacity"
              type="number"
            />
          </div>
          <div class="col-xs-12">
            <div class="text-label">Description</div>
            <q-input
              dense
              outlined
              v-model="classlist.description"
              type="textarea"
            />
          </div>
          <div class="col-xs-12">
            <url-list v-model="classlist.urls" />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="classlist.is_active"
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
import { useClassListStore } from "stores/class-list";
import UrlList from "src/components/UrlList.vue";

const classlist = {
  is_active: true,
  urls: [],
};

export default {
  components: {
    SkeletonSinglePage,
    UrlList,
  },
  data() {
    return {
      default: cloneDeep(classlist),
      classlist: cloneDeep(classlist),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useClassListStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/class-lists/ClassPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.classlist)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.classlist = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Class",
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
        "pages/admins/class-lists/ClassPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.classlist = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/class-lists/ClassPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.classlist = data;
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
        JSON.stringify(this.classlist) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.classlist) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
