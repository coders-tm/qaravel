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
            creating ? 'General information' : support.subject || 'Contact us'
          "
        >
          <template v-if="creating || !isAdmin">
            <div v-if="creating" class="col-xs-12">
              <div class="text-label">Subject</div>
              <base-input v-model="support.subject" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="text-label">Message</div>
              <base-input
                :autogrow="!creating"
                :readonly="!creating"
                type="textarea"
                rows="9"
                v-model="support.message"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <template v-if="creating">
                <div class="text-label">Attachment</div>
                <base-dropzone v-model="support.media" />
              </template>
            </div>
          </template>
          <template v-else>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="ID:" readonly v-model="support.id" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input
                prefix="Date:"
                readonly
                v-model="support.created_at"
              />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="User:" readonly v-model="support.name">
                <template v-if="support.user" v-slot:append>
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
                        id: support.user.id,
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
              <base-input prefix="Email:" readonly v-model="support.email" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="Phone:" readonly v-model="support.phone" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <base-input prefix="Status:" readonly v-model="support.status" />
            </div>
            <div class="col-xs-12 col-sm-12">
              <base-input
                prefix="Message: "
                autogrow
                type="textarea"
                readonly
                v-model="support.message"
              />
            </div>
          </template>

          <template v-if="!creating">
            <div class="col-xs-12">
              <div v-if="support.media.length" class="files">
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="media in support.media"
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
              :module-id="support.id"
              class="comment"
              creating
              @create="onCreateNote"
              :is-admin="isAdmin"
            />
            <base-enquiry-reply-card
              class="comment"
              v-for="note in support.replies"
              :key="note.id"
              v-bind="note"
              :module-id="support.id"
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
import { useSupportStore } from "stores/support";

const support = {
  media: [],
};

export default {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      default: cloneDeep(support),
      support: cloneDeep(support),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useSupportStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/core/supports/SupportPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.support)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.support = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Support",
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
        "pages/core/supports/SupportPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.support = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/core/supports/SupportPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
    onCreateNote(props) {
      console.func(
        "pages/core/supports/SupportPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.support.replies.splice(0, 0, cloneDeep(props));
        this.default.replies.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((support) => {
          this.support = support;
          this.default = cloneDeep(support);
        });
      }
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.$app.setTitle(data.subject || "Contact us");
          this.support = data;
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
        JSON.stringify(this.support) === JSON.stringify(this.default)
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
        JSON.stringify(this.support) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
