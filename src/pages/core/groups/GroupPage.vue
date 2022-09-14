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
            <div class="text-label">Name</div>
            <q-input dense outlined v-model="group.name" type="text" />
          </div>
          <div class="col-xs-12">
            <div class="text-label">Description</div>
            <q-input
              dense
              outlined
              v-model="group.description"
              type="textarea"
            />
          </div>
        </base-section>
        <base-section
          no-row
          title="Permissions"
          description="Give staff access to your store by sending them an invitation. If you’re working with a designer, developer, or marketer, find out how to give collaborator access to your store."
        >
          <div class="row q-col-gutter-md">
            <div
              class="col-xs-12 col-sm-4"
              v-for="(item, index) in modules"
              :key="item.id"
            >
              <permissions-module
                edit
                v-model="group.permissions"
                :module="modules[index]"
              />
            </div>
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
import PermissionsModule from "components/PermissionsModule.vue";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useGroupStore } from "stores/group";
import { useAppStore } from "stores/app";

const group = {
  permissions: [],
};

export default {
  components: {
    PermissionsModule,
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(group),
      group: cloneDeep(group),
      modules: [],
      groups: [],
      selected: [],
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useGroupStore, ["store", "show", "update"]),
    ...mapActions(useAppStore, ["getModules"]),
    onSubmit(props) {
      console.func("pages/core/groups/GroupPage:methods.onSubmit()", arguments);
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.group)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.group = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Group",
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
      console.func("pages/core/groups/GroupPage:methods.onReset()", arguments);
      this.loaded = false;
      this.$nextTick(() => {
        this.group = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func("pages/core/groups/GroupPage:methods.onCancel()", arguments);
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.getModules().then((data) => {
      this.modules = data.modules;
      this.groups = data.groups;
    });
    if (!this.creating) {
      this.show(this.id)
        .then((group) => {
          this.group = group;
          this.default = cloneDeep(group);
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
        JSON.stringify(this.group) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.group) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
