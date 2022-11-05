<template>
  <base-dialog
    :title="title"
    body-class="q-pa-none scroll"
    content-style="width: 800px; max-width: 95vw"
    ref="dialog"
    @hide="onDialogHide"
    use-separator
    hide-footer
  >
    <template v-slot:body>
      <base-section flat>
        <div class="col-xs-12 col-sm-4">
          <div class="text-label">Title</div>
          <base-select
            v-model="member.title"
            dense
            outlined
            :options="['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr', 'Fr', 'Prof']"
          />
        </div>
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
        <div class="col-xs-12 col-sm-4">
          <div class="text-label">Status</div>
          <q-select
            dense
            outlined
            v-model="member.status"
            :options="[
              'Active',
              'Deactive',
              'Hold',
              'Lost',
              'Pending',
              'Error',
            ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="text-label">Type Membership</div>
          <base-input autogrow v-model="member.interest" type="textarea" />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="text-label">Note</div>
          <base-input autogrow v-model="member.note" type="textarea" />
        </div>
        <div class="col-xs-12 col-sm-12">
          <base-select
            bg-color="white"
            placeholder="Select"
            dense
            outlined
            v-model="member.plan"
            :filter-method="getPlan"
            map-options
            use-filter
            options-html
            :option-label="
              (opt) =>
                `${opt.label} Fee(s): ${$core.money(
                  opt.admin_fee
                )} | ${$core.money(opt.monthly_fee)} | ${$core.money(
                  opt.annual_fee
                )}`
            "
            option-value="id"
          />
        </div>
        <div class="text-right q-gutter-x-sm col-xs-12">
          <base-btn
            class="main-btn"
            color="secondary"
            label="Save as member"
            @click="onSaveAsMember"
          />
          <base-btn
            class="main-btn"
            color="primary"
            label="Update"
            :disable="disable"
            @click="onSubmit"
          />
        </div>
      </base-section>
      <base-section
        flat
        title="Notes"
        description="With activity, you can view detailed histories and write notes for member."
        no-row
        body-class="q-px-lg"
        head-class="q-pt-none"
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
            v-for="note in member.notes"
            :key="note.id"
            v-bind="note"
            :module-id="member.id"
            :user="note.admin"
          />
        </q-timeline>
      </base-section>
    </template>
    <template v-slot:loading>
      <q-inner-loading :showing="loading">
        <q-spinner-oval size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </base-dialog>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import { useMemberStore } from "stores/member";
import { useAppStore } from "stores/app";
import { usePlanStore } from "stores/plan";

export default {
  data() {
    return {
      member: {},
      default: {},
      loading: true,
    };
  },
  props: {
    title: {
      type: String,
      default: "Member Info",
    },
    id: [Number, String],
  },
  emits: ["ok", "hide"],
  methods: {
    ...mapActions(useMemberStore, { showMember: "show" }),
    ...mapActions(useMemberStore, ["update", "notes"]),
    ...mapActions(usePlanStore, {
      getPlan: "get",
    }),
    async show() {
      console.func("components/MemberDialog:methods.show()", arguments);
      this.loading = true;
      this.$refs.dialog.show();
      this.showMember(this.id)
        .then((member) => {
          this.member = member;
          this.default = cloneDeep(member);
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
          this.hide();
          this.loading = false;
        });
    },
    hide() {
      console.func("components/MemberDialog:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func("components/MemberDialog:methods.onDialogHide()", arguments);
      this.$emit("hide");
    },
    onDone() {
      console.func("components/MemberDialog:methods.onDone()", arguments);
      this.$emit("ok");
      this.hide();
    },
    onSubmit(props) {
      console.func("components/MemberDialog:methods.onSubmit()", arguments);
      this.loading = true;
      this.update(this.member)
        .then(({ message }) => {
          this.default = cloneDeep(this.member);
          this.loading = false;
          this.$q.notify(message);
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onSaveAsMember() {
      console.func(
        "components/MemberDialog:methods.onSaveAsMember()",
        arguments
      );
      this.loading = true;
      this.update({
        ...this.member,
        status: "Active",
        is_enquiry: false,
      })
        .then(({ message }) => {
          this.loading = false;
          this.$core.success(message);
          this.onDone();
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onCreateNote(props) {
      console.func("components/MemberDialog:methods.onCreateNote()", arguments);
      if (props) {
        this.member.notes.splice(0, 0, props);
      } else {
        this.showMember(this.id).then((member) => {
          this.member = member;
          this.default = cloneDeep(member);
          this.loading = false;
        });
      }
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
    disable() {
      return (
        this.default &&
        JSON.stringify(this.member) === JSON.stringify(this.default)
      );
    },
  },
};
</script>
