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
        <base-section
          title="General information"
          description="Staff information forms provide key data on staff that can be used to keep track of who worked for the company, when, and in what positions."
        >
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">First Name</div>
            <q-input dense outlined v-model="staff.first_name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Surname</div>
            <q-input dense outlined v-model="staff.last_name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Email Address</div>
            <q-input dense outlined v-model="staff.email" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Phone Number</div>
            <q-input dense outlined v-model="staff.phone" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Calendar Colour</div>
            <q-input dense outlined v-model="staff.calendar_color">
              <template v-slot:prepend>
                <q-icon
                  :style="{
                    color: staff.calendar_color,
                  }"
                  name="fas fa-square-full"
                />
              </template>
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    ref="color-picker"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color
                      v-model="staff.calendar_color"
                      format-model="hex"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </base-section>
        <base-section
          title="Security"
          description="Security to make your accounts unbreakable."
        >
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Password</div>
            <q-input
              dense
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="staff.password"
              color="blue-grey-14"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                  size="16px"
                />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Confirm Password</div>
            <q-input
              dense
              outlined
              :type="isConfPwd ? 'password' : 'text'"
              v-model="staff.password_confirmation"
              color="blue-grey-14"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
                  class="cursor-pointer"
                  @click="isConfPwd = !isConfPwd"
                  size="16px"
                />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="staff.is_active"
              label="Active"
              color="green"
            />
          </div>
        </base-section>
        <base-section
          title="Groups and Permissions"
          description="Give staff access to your store by sending them an invitation. If you’re working with a designer, developer, or marketer, find out how to give collaborator access to your store."
        >
          <div class="col-sm-4 col-xs-12">
            <div class="text-label">Groups</div>
            <base-select
              bg-color="white"
              placeholder="Select"
              dense
              outlined
              v-model="staff.groups"
              :filter-method="groupList"
              @update:model-value="onChangeGroup"
              map-options
              use-filter
              multiple
              use-chips
              option-label="name"
              option-value="id"
            />
          </div>
          <div class="col-xs-12">
            <div class="text-label q-mb-sm">Permissions</div>
            <div class="row q-col-gutter-md">
              <div
                class="col-xs-12 col-sm-4"
                v-for="(item, index) in modules"
                :key="item.id"
              >
                <permissions-module
                  has-icon
                  edit
                  v-model="staff.permissions"
                  :group-permissions="staff.groupPermissions"
                  :module="modules[index]"
                />
              </div>
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
import { useStaffStore } from "stores/staff";
import { useAppStore } from "stores/app";
import { useGroupStore } from "stores/group";

const staff = {
  groups: [],
  permissions: [],
  groupPermissions: [],
};

export default {
  components: {
    PermissionsModule,
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(staff),
      staff: cloneDeep(staff),
      modules: [],
      groups: [],
      selected: [],
      isPwd: true,
      isConfPwd: true,
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useStaffStore, ["store", "show", "update"]),
    ...mapActions(useAppStore, ["getModules"]),
    ...mapActions(useGroupStore, {
      groupList: "get",
    }),
    onSubmit(props) {
      console.func("pages/core/staffs/StaffPage:methods.onSubmit()", arguments);
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.staff)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.staff = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Staff",
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
      console.func("pages/core/staffs/StaffPage:methods.onReset()", arguments);
      this.loaded = false;
      this.$nextTick(() => {
        this.staff = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func("pages/core/staffs/StaffPage:methods.onCancel()", arguments);
      this.$router.go(-1);
    },
    onChangeGroup(groups) {
      console.func(
        "pages/core/staffs/StaffPage:methods.onChangeGroup()",
        arguments
      );
      if (groups.length < 1) {
        this.staff.groupPermissions = [];
        return;
      }
      groups.forEach((group) => {
        if (group.permissions.length) {
          group.permissions.forEach((permission) => {
            let item = this.staff.groupPermissions.find(
              (item) => item.id === permission.id
            );
            if (item && permission.pivot.access !== null) {
              item.access = permission.pivot.access;
            } else if (!item) {
              this.staff.groupPermissions.push({
                id: permission.id,
                access: permission.pivot.access,
              });
            }
          });
        }
      });
    },
  },
  async mounted() {
    await this.getModules().then((data) => {
      this.modules = data.modules;
      this.groups = data.groups;
    });
    if (!this.creating) {
      this.show(this.id)
        .then((staff) => {
          this.staff = staff;
          this.default = cloneDeep(staff);
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
        JSON.stringify(this.staff) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.staff) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
