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
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-9">
          <div class="q-gutter-md">
            <base-section title="General information">
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Day</div>
                <base-input v-model="registration.day" readonly />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Date</div>
                <base-input v-model="registration.date_at_formated" readonly />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Start at</div>
                <base-input v-model="registration.start_at_formated" readonly />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">End at</div>
                <base-input v-model="registration.end_at_formated" readonly />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Class</div>
                <base-select
                  map-options
                  dense
                  outlined
                  option-label="name"
                  v-model="registration.class"
                  readonly
                />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Location</div>
                <base-select
                  map-options
                  dense
                  outlined
                  option-label="label"
                  v-model="registration.location"
                  readonly
                />
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="text-label">Instructor</div>
                <base-select
                  map-options
                  dense
                  outlined
                  option-label="name"
                  v-model="registration.instructor"
                  readonly
                />
              </div>
            </base-section>
            <base-section
              :title="`Active bookings (${registration.total_bookings} out of ${registration.capacity})`"
              no-row
            >
              <template v-slot:action>
                <q-btn
                  color="primary"
                  icon="fad fa-circle-plus"
                  flat
                  dense
                  round
                  @click="onAddActive"
                />
              </template>
              <class-bookings
                :all-bookings="allBookings"
                class="q-mt-sm"
                :hasSignOff="registration.has_sign_off"
                :rows="registration.active_bookings"
              />
            </base-section>
            <base-section
              :title="`Standby bookings (${registration.total_stand_by_bookings} out of 5)`"
              no-row
            >
              <template v-slot:action>
                <q-btn
                  color="primary"
                  icon="fad fa-circle-plus"
                  flat
                  dense
                  round
                  @click="onAddStandby"
                />
              </template>
              <class-bookings
                :all-bookings="allBookings"
                class="q-mt-sm"
                :hasSignOff="registration.has_sign_off"
                :rows="registration.stand_by_bookings"
              />
            </base-section>
          </div>
        </div>
        <div class="col-xs-12 col-sm-3">
          <div class="q-gutter-md">
            <base-section title="Remote">
              <div class="col-xs-12">
                <div class="text-label">Link</div>
                <base-input
                  placeholder="https://"
                  v-model="registration.remote_link"
                />
              </div>
              <div class="col-xs-12">
                <div class="text-label">Code</div>
                <base-input
                  placeholder="XXXXXXXX-XXX"
                  v-model="registration.remote_code"
                />
              </div>
            </base-section>
            <base-section no-row title="Stats & Settings">
              <div class="q-gutter-y-md">
                <div>
                  <strong>Attendence: </strong>
                  <class-at
                    :has-sign-off="registration.has_sign_off"
                    :value="calAttendence(registration)"
                  />%
                  <strong class="q-ml-sm">Capacity: </strong>
                  {{ calCapacity(registration) }}
                </div>
                <div class="q-gutter-x-sm">
                  <base-btn
                    :disable="registration.has_sign_off"
                    label="Mark All Attended"
                    @click="onMarkAsAttended"
                    icon="fad fa-square-check"
                  />
                  <base-btn
                    icon="fad fa-print"
                    label="Print"
                    @click="onViewPdf"
                  />
                </div>
                <div>
                  <base-checkbox
                    no-inline
                    dense
                    v-model="registration.has_sign_off"
                  >
                    <div>ProFIT28 Sign off</div>
                    <div
                      v-if="registration.has_sign_off && registration.admin"
                      class="text-grey"
                    >
                      {{ registration.admin.name }} on
                      {{ registration.sign_off_at }}
                    </div>
                  </base-checkbox>
                </div>
              </div>
            </base-section>
            <base-section title="Note">
              <div class="col-xs-12">
                <base-input
                  placeholder="Note for Instructor"
                  type="textarea"
                  v-model="registration.note"
                />
              </div>
            </base-section>
          </div>
        </div>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useRegistrationStore } from "stores/registration";
import ClassBookings from "components/ClassBookings.vue";
import ClassAt from "components/ClassAt.vue";
import PdfViewer from "components/PdfViewer.vue";

const registration = {
  is_active: true,
  stand_by_bookings: [],
  active_bookings: [],
};

const defaultBooking = {
  user_id: null,
  schedule_id: null,
  is_stand_by: false,
  attendence: false,
  status: false,
  source: false,
  canceled_at: null,
};

export default {
  components: {
    SkeletonSinglePage,
    ClassBookings,
    ClassAt,
  },
  data() {
    return {
      default: cloneDeep(registration),
      registration: cloneDeep(registration),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useRegistrationStore, [
      "store",
      "show",
      "update",
      "calAttendence",
      "calCapacity",
      "pdf",
    ]),
    onSubmit(props) {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.registration)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.registration = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Registration",
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
        "pages/admins/registrations/RegistrationPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.registration = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
    onMarkAsAttended() {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onMarkAsAttended()",
        arguments
      );
      this.registration.active_bookings = this.registration.active_bookings.map(
        (item) => ({
          ...item,
          attendence: true,
        })
      );
      this.registration.stand_by_bookings =
        this.registration.stand_by_bookings.map((item) => ({
          ...item,
          attendence: true,
        }));
    },
    onAddActive(props) {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onAddActive()",
        arguments
      );
      if (this.activeRemaining <= 0) {
        this.$core.warning("No bookings is available for active slot.");
        return false;
      }
      this.registration.active_bookings.push({ ...defaultBooking });
    },
    onAddStandby(props) {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onAddStandby()",
        arguments
      );
      if (this.standByRemaining <= 0) {
        this.$core.warning("No bookings is available for standby slot.");
        return false;
      }
      this.registration.stand_by_bookings.push({
        ...defaultBooking,
        is_stand_by: true,
      });
    },
    onViewPdf() {
      console.func(
        "pages/admins/registrations/RegistrationPage:methods.onViewPdf()",
        arguments
      );
      this.pdf(this.id)
        .then((data) => {
          const blob = new Blob([data], { type: "application/pdf" });

          this.$q
            .dialog({
              component: PdfViewer,
              componentProps: {
                title: `registration-${this.registration.label}.pdf`,
                url: URL.createObjectURL(blob),
              },
            })
            .onOk((playload) => {
              URL.revokeObjectURL(playload);
            });
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.registration = data;
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
        JSON.stringify(this.registration) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.registration) !== JSON.stringify(this.default)
      );
    },
    activeRemaining() {
      return (
        this.registration.capacity - this.registration.active_bookings.length
      );
    },
    standByRemaining() {
      return 5 - this.registration.stand_by_bookings.length;
    },
    allBookings() {
      return this.registration.active_bookings.concat(
        this.registration.stand_by_bookings
      );
    },
  },
};
</script>
