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
      :no-action="!creating"
    >
      <div class="q-gutter-md">
        <base-section
          :title="
            creating ? 'General information' : enquiry.subject || 'Contact us'
          "
        >
          <template v-if="creating || !isAdmin">
            <div v-if="creating" class="col-xs-12">
              <div class="text-label">Subject</div>
              <base-input v-model="enquiry.subject" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="text-label">Message</div>
              <base-input
                :autogrow="!creating"
                :readonly="!creating"
                type="textarea"
                rows="9"
                v-model="enquiry.message"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <template v-if="creating">
                <div class="text-label">Attachment</div>
                <base-dropzone v-model="enquiry.media" />
              </template>
            </div>
          </template>
          <template v-else>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="ID:" readonly v-model="enquiry.id" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input
                prefix="Date:"
                readonly
                v-model="enquiry.created_at"
              />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="User:" readonly v-model="enquiry.name">
                <template v-if="enquiry.user" v-slot:append>
                  <q-btn
                    color="primary"
                    icon="fas fa-arrow-up-right-from-square"
                    flat
                    dense
                    round
                    size="sm"
                    tag="a"
                    :to="{
                      name: 'Single Member',
                      params: {
                        id: enquiry.user.id,
                      },
                      query: {
                        action: 'edit',
                      },
                    }"
                  />
                </template>
              </base-input>
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="Email:" readonly v-model="enquiry.email" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="Phone:" readonly v-model="enquiry.phone" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="Status:" readonly v-model="enquiry.status" />
            </div>
            <div class="col-xs-12 col-sm-12">
              <base-input
                prefix="Message: "
                autogrow
                type="textarea"
                readonly
                v-model="enquiry.message"
              />
            </div>
          </template>

          <template v-if="!creating">
            <div class="col-xs-12">
              <div v-if="enquiry.media.length" class="files">
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="media in enquiry.media"
                    :key="media.id"
                    class="col-sm-2 col-xs-12"
                  >
                    <base-media-card :media="media" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-section>
        <base-section
          title="Activities"
          description="With activity, you can view detailed histories and write reply for enquiry."
          no-row
          v-if="!creating"
          body-class="q-px-lg"
        >
          <q-timeline class="comments" color="secondary">
            <base-enquiry-reply-card
              :module-id="enquiry.id"
              class="comment"
              creating
              @create="onCreateNote"
              :is-admin="isAdmin"
            />
            <base-enquiry-reply-card
              class="comment"
              v-for="note in enquiry.replies"
              :key="note.id"
              v-bind="note"
              :module-id="enquiry.id"
              :user="note.user"
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
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useEnquiryStore } from "stores/enquiry";

const enquiry = {
  media: [],
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(enquiry),
      enquiry: cloneDeep(enquiry),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useEnquiryStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.enquiry)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.enquiry = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Enquiry",
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
        "pages/core/enquiries/EnquiryPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.enquiry = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
    onCreateNote(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.enquiry.replies.splice(0, 0, cloneDeep(props));
        this.default.replies.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((enquiry) => {
          this.enquiry = enquiry;
          this.default = cloneDeep(enquiry);
        });
      }
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.$app.setTitle(data.subject || "Contact us");
          this.enquiry = data;
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
        JSON.stringify(this.enquiry) === JSON.stringify(this.default)
      );
    },
    guard() {
      return this.$route.meta.guard;
    },
    isAdmin() {
      return this.guard === "admins";
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.enquiry) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
