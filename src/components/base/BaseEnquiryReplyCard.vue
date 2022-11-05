<template>
  <li
    :class="{
      'q-timeline__entry base-enquiry-reply-card': true,
      'q-timeline__entry--right': true,
      'q-timeline__entry--icon': has_icon,
    }"
  >
    <div v-if="!creating && hasUser" class="q-timeline__subtitle">
      <span>{{ title }}</span>
      <span v-if="created_at" class="q-ml-sm text-grey-8 text-weight-medium">
        {{ created_at }}
      </span>
    </div>
    <div :class="`q-timeline__dot text-${color}`">
      <img v-if="avatar" class="q-timeline__dot-img" :src="avatar" />
      <q-icon v-else-if="icon" :name="icon" />
      <base-avatar
        class="q-timeline__dot-img"
        :tooltip="false"
        size="30px"
        v-else-if="currentUser"
        :user="currentUser"
      />
    </div>
    <div class="q-timeline__content">
      <template v-if="creating">
        <q-input
          class="note-editor q-mb-sm"
          placeholder="Leave a reply ..."
          outlined
          v-model="note.message"
          type="textarea"
          autogrow
        >
        </q-input>
      </template>
      <template v-else>
        <q-item style="min-height: auto" dense class="q-pa-none">
          <q-item-section>
            <q-item-label>
              <div v-html="getMessage"></div>
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="!hasUser" side>
            <span v-if="created_at" class="q-ml-sm text-grey-8">
              {{ created_at }}
            </span>
          </q-item-section>
        </q-item>
      </template>
      <div v-if="getMedia.length" class="q-pt-sm files">
        <div class="row q-col-gutter-sm">
          <div
            v-for="(media, index) in getMedia"
            :key="media.id"
            class="col-sm-2 col-xs-12"
          >
            <base-media-card
              :creating="creating"
              :media="media"
              @remove="note.media.splice(index, 1)"
            />
          </div>
        </div>
      </div>
      <template v-if="creating">
        <div class="actions-buttons flex q-gutter-sm items-center">
          <q-space v-if="$q.screen.gt.xs" />
          <base-select
            v-if="isAdmin"
            :options="status_options"
            v-model="note.status"
            outlined
            dense
            options-html
            map-options
            prefix="Status: "
            emit-value
          />
          <base-btn
            class="main-btn"
            color="grey-5"
            icon="far fa-paperclip"
            label="Attach file"
            @click="onAttachFile"
          />
          <base-btn
            :loading="loading"
            class="main-btn"
            color="primary"
            label="Reply"
            icon="fas fa-paper-plane"
            @click="onSubmit"
            :disable="disable"
          />
        </div>
      </template>
    </div>
  </li>
</template>

<script>
import { cloneDeep } from "lodash";
import { useAppStore } from "stores/app";
import { mapActions, mapState } from "pinia";
import FileSelector from "../FileSelectorDialog.vue";
import { useSupportStore } from "stores/support";

const note = {
  status: null,
  message: null,
  media: [],
};

export default {
  props: {
    id: [String, Number],
    avatar: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    user: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },
    icon: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    creating: Boolean,
    isAdmin: Boolean,
    message: String,
    created_at: String,
    media: Array,
    moduleId: [String, Number],
  },
  data() {
    return {
      loading: false,
      note: cloneDeep(note),
      default: cloneDeep(note),
    };
  },
  emits: ["create"],
  methods: {
    ...mapActions(useSupportStore, ["reply"]),
    onSubmit() {
      console.func(
        "components/base/BaseNoteCard:methods.onSubmit()",
        arguments
      );
      this.loading = true;
      this.reply({
        ...this.$props,
        ...this.note,
      })
        .then(({ data, message }) => {
          this.note = cloneDeep(note);
          this.default = cloneDeep(note);
          this.$q.notify(message);
          this.$emit("create", data);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onAttachFile() {
      console.func(
        "components/base/BaseEnquiryReplyCard:methods.onAttachFile()",
        arguments
      );
      this.$q
        .dialog({
          component: FileSelector,
          componentProps: {
            title: "Attach file",
            multiple: true,
          },
        })
        .onOk((playload) => {
          console.func(
            "components/base/BaseEnquiryReplyCard:methods.onAttachFile.onOk()",
            playload
          );
          this.note.media = playload;
        });
    },
  },
  computed: {
    ...mapState(useAppStore, {
      current: "user",
    }),
    ...mapState(useSupportStore, {
      status_options: "default_status_options",
    }),
    currentUser() {
      return this.creating ? this.current : this.user;
    },
    color() {
      return this.$parent.color || "primary";
    },
    title() {
      return this.user ? this.user.name : "";
    },
    hasUser() {
      return Boolean(this.user);
    },
    has_icon() {
      return this.icon || this.avatar || this.user || this.creating;
    },
    disable() {
      return JSON.stringify(this.note) === JSON.stringify(this.default);
    },
    getMessage() {
      return this.message
        ? this.message.replace(/\r?\n/g, "<br/>")
        : this.message;
    },
    getMedia() {
      return this.media || this.note.media;
    },
  },
};
</script>
<style scoped lang="scss">
.q-timeline__subtitle {
  text-transform: none;
  opacity: 1;
  margin: 0;
  padding: 0;
}
.q-timeline__entry {
  .actions {
    visibility: hidden;
  }
  &:hover .actions,
  .active {
    visibility: visible;
  }
}
</style>
