<template>
  <div>
    <q-list bordered>
      <q-item class="bg-grey-3">
        <q-item-section avatar>
          <q-icon size="xs" class="text-primary" :name="dataModule.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ dataModule.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="edit" side>
          <q-toggle
            size="sm"
            toggle-indeterminate
            v-model="selected"
            @update:model-value="onToggleAll($event, dataModule.permissions)"
            :false-value="0"
            :true-value="dataModule.permissions.length"
            color="primary"
            :disable="hasGroupPermission"
          />
        </q-item-section>
      </q-item>
      <q-item v-for="permission in dataModule.permissions" :key="permission.id">
        <q-item-section>
          <q-item-label>
            {{ permission.action }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            size="sm"
            v-if="edit"
            toggle-indeterminate
            v-model="permission.access"
            @update:model-value="onToggle($event, permission)"
            :true-value="1"
            :false-value="0"
            :icon="getIcon(permission)"
            :color="getColor(permission)"
            :disable="getStatus(permission)"
          />
          <q-icon
            size="xs"
            v-else
            :name="permission.access ? 'check' : 'close'"
            :color="getColor(permission)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const getAccess = (item) =>
  item && typeof item === "object" && "access" in item ? item.access : null;

export default {
  data() {
    return {
      dataModule: this.module,
      dataPermissions: this.modelValue,
    };
  },
  emits: ["update:model-value"],
  props: {
    module: {
      required: true,
      type: Object,
    },
    edit: {
      required: false,
      type: Boolean,
      default: true,
    },
    modelValue: {
      required: true,
      type: Array,
    },
    groupPermissions: {
      required: false,
      type: Array,
      default: () => [],
    },
    hasIcon: Boolean,
  },
  methods: {
    onToggle(event, permission) {
      console.func("components/base/permission:methods.onToggle()", arguments);
      const item = this.dataPermissions.find(
        (item) => item.id === permission.id
      );
      if (item) {
        if (event === null) {
          this.dataPermissions.splice(
            this.dataPermissions.findIndex((item) => item.id === permission.id),
            1
          );
        } else {
          item.access = event;
        }
      } else if (event !== null) {
        this.dataPermissions.push({
          id: permission.id,
          access: event,
        });
      }
      this.onChange();
    },
    async onToggleAll(event, permissions) {
      console.func(
        "components/base/permission:methods.onToggleAll()",
        arguments
      );
      const access = event > 0 ? 1 : event;
      await permissions.forEach((permission) => {
        const item = this.dataPermissions.find(
          (item) => item.id === permission.id
        );
        if (item) {
          item.access = access;
        } else if (access !== null) {
          this.dataPermissions.push({
            id: permission.id,
            access: access,
          });
        }
      });
      this.onProcess();
      this.onChange();
    },
    getIcon(permission) {
      if (!this.hasIcon) return "";
      if (permission.group) {
        return "fas fa-users";
      } else {
        return "fas fa-user";
      }
    },
    getColor(permission) {
      if (permission.group) {
        return "warning";
      } else if (!permission.access) {
        return "negative";
      } else {
        return "positive";
      }
    },
    getStatus(permission) {
      const item = this.groupPermissions.find(
        (item) => item.id === permission.id
      );
      return item && typeof item === "object" && item.permission !== null
        ? true
        : false;
    },
    onProcess() {
      this.dataModule.permissions = this.dataModule.permissions.map(
        (permission) => {
          const user = this.dataPermissions.find(
            (item) => item.id === permission.id
          );
          const group = this.groupPermissions.find(
            (item) => item.id === permission.id
          );
          return {
            ...permission,
            user: getAccess(user),
            group: getAccess(group),
            access: getAccess(Object.assign(user || {}, group || {})),
          };
        }
      );
    },
    onChange() {
      this.$emit("update:model-value", this.dataPermissions);
    },
  },
  mounted() {
    this.onProcess();
  },
  computed: {
    selected() {
      let pCount = 0;
      let nCount = 0;
      let permissions = this.dataModule.permissions;
      permissions.forEach((permission) => {
        const item = this.dataPermissions.find(
          (item) => item.id === permission.id
        );
        const gItem = this.groupPermissions.find(
          (item) => item.id === permission.id
        );
        if (gItem) {
          if (gItem.access === 1) {
            pCount++;
          } else if (gItem.access === 0) {
            nCount++;
          }
        } else if (item) {
          if (item.access === 1) {
            pCount++;
          } else if (item.access === 0) {
            nCount++;
          }
        }
      });
      return pCount === 0 && nCount === 0
        ? null
        : nCount === permissions.length
        ? 0
        : permissions.length !== pCount
        ? null
        : pCount;
    },
    modulePermissions() {
      return this.dataModule.permissions.map((item) => item.id);
    },
    hasGroupPermission() {
      return (
        this.groupPermissions.filter((item) =>
          this.modulePermissions.includes(item.id)
        ).length > 0
      );
    },
  },
  watch: {
    groupPermissions: {
      deep: true,
      handler() {
        this.onProcess();
      },
    },
  },
};
</script>
