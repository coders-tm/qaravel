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
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Date</div>
            <q-input dense outlined v-model="announcement.date" type="date" />
            <q-checkbox
              class="q-mt-md"
              dense
              v-model="announcement.is_closed"
              label="Close all day"
              color="green"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Open at</div>
            <base-time-input
              outlined
              style="width: auto"
              v-model="announcement.open_at"
              :disable="announcement.is_closed"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Close at</div>
            <base-time-input
              outlined
              style="width: auto"
              v-model="announcement.close_at"
              :disable="announcement.is_closed"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="text-label">Note</div>
            <base-input type="textarea" v-model="announcement.note" />
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
import { useAnnouncementStore } from "stores/announcement";

const announcement = {
  is_closed: false,
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(announcement),
      announcement: cloneDeep(announcement),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useAnnouncementStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/announcements/AnnouncementPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      const announcement = cloneDeep(this.announcement);
      if (this.announcement.is_closed) {
        Object.assign(announcement, {
          open_at: null,
          close_at: null,
        });
      }
      method(announcement)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.announcement = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Announcement",
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
        "pages/admins/announcements/AnnouncementPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.announcement = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/announcements/AnnouncementPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.announcement = data;
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
        JSON.stringify(this.announcement) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.announcement) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
