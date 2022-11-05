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
            <base-input v-model="member.first_name" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Surname</div>
            <base-input v-model="member.last_name" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Email Address</div>
            <base-input v-model="member.email" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Phone Number</div>
            <base-input v-model="member.phone_number" />
          </div>
        </base-section>
        <base-section
          title="Security"
          description="Security to make your accounts unbreakable."
        >
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Password</div>
            <base-input
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
            </base-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Confirm Password</div>
            <base-input
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
            </base-input>
          </div>
        </base-section>
        <base-section
          v-if="!creating"
          title="Notes"
          description="With activity, you can view detailed histories and write notes for member."
          no-row
          body-class="q-px-lg"
        >
          <q-timeline class="comments" color="secondary">
            <base-note-card
              :module-action="notes"
              :module-id="member.id"
              class="comment"
              creating
              @create="onCreateNote"
            />
            <base-note-card
              class="comment"
              v-for="note in member.logs"
              :key="note.id"
              v-bind="note"
              :module-id="member.id"
              :user="note.admin"
            />
          </q-timeline>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useMemberStore } from "stores/member";
import { useAppStore } from "stores/app";

const member = {};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(member),
      member: cloneDeep(member),
      isPwd: true,
      isConfPwd: true,
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["store", "show", "update", "notes"]),
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
    onCreateNote(props) {
      console.func(
        "pages/admins/members/MemberPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.member.logs.splice(0, 0, cloneDeep(props));
        this.default.logs.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((member) => {
          this.member = member;
          this.default = cloneDeep(member);
        });
      }
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
    ...mapState(useAppStore, ["user"]),
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
    hasClasses() {
      return !this.creating && !this.member.is_enquiry;
    },
  },
};
</script>
