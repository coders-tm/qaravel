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
          description="Member information forms provide key data on member that can be used to keep track of who worked for the company, when, and in what positions."
        >
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">First Name</div>
            <q-input dense outlined v-model="member.first_name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Surname</div>
            <q-input dense outlined v-model="member.last_name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Email Address</div>
            <q-input dense outlined v-model="member.email" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Phone Number</div>
            <q-input dense outlined v-model="member.phone" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Calendar Colour</div>
            <q-input dense outlined v-model="member.calendar_color">
              <template v-slot:prepend>
                <q-icon
                  :style="{
                    color: member.calendar_color,
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
                      v-model="member.calendar_color"
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
              v-model="member.password"
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
              v-model="member.password_confirmation"
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
import { useMemberStore } from "stores/member";

const member = {
  groups: [],
  permissions: [],
  groupPermissions: [],
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(member),
      member: cloneDeep(member),
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
    ...mapActions(useMemberStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/members/MemberPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.member)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.member = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Member",
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
        "pages/admins/members/MemberPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.member = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/members/MemberPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((member) => {
          this.member = member;
          this.default = cloneDeep(member);
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
        JSON.stringify(this.member) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.member) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
