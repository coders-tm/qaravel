<template>
  <li
    :class="{
      'q-timeline__entry': true,
      'q-timeline__entry--right': true,
      'q-timeline__entry--icon': has_icon,
    }"
  >
    <div v-if="!creating && hasUser" class="q-timeline__subtitle">
      <span>{{ title }}</span>
      <span v-if="date_time" class="q-ml-sm text-grey-8 text-weight-medium">
        {{ date_time }}
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
          placeholder="Leave a note ..."
          outlined
          v-model="note.message"
          type="textarea"
          autogrow
        >
        </q-input>
        <div class="flex items-center">
          <q-space />
          <base-select
            :options="rag_options"
            v-model="note.rag"
            outlined
            dense
            class="q-mr-sm"
            options-html
            map-options
            prefix="Rag: "
            emit-value
          />
          <base-btn
            :loading="loading"
            class="main-btn"
            color="primary"
            label="Save"
            @click="onSubmit"
            :disable="disable"
          />
        </div>
      </template>
      <template v-else>
        <q-item style="min-height: auto" dense class="q-pa-none">
          <q-item-section>
            <q-item-label>
              <div v-html="getMessage"></div>
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="!hasUser" side>
            <span v-if="date_time" class="q-ml-sm text-grey-8">
              {{ date_time }}
            </span>
          </q-item-section>
        </q-item>
      </template>
    </div>
  </li>
</template>

<script>
import { cloneDeep } from "lodash";
import { useAppStore } from "stores/app";
import { mapState } from "pinia";
import BaseBtn from "./BaseBtn.vue";
import BaseAvatarWidget from "./BaseAvatar.vue";

const rag_options = ["red", "green", "amber", "white"].map((item) => ({
  label: item
    ? `<div class="text-center"><i class="q-icon fas fa-circle rag-${item}" style="font-size: 13px;" aria-hidden="true" role="presentation" ></i></div>`
    : `<div class="text-center">All</div>`,
  value: item,
}));

const note = {
  rag: null,
  message: null,
};

export default {
  components: { BaseBtn, BaseAvatarWidget },
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
    message: String,
    type: String,
    options: [Array, String, Object],
    date_time: String,
    moduleAction: Function,
    moduleId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      note: cloneDeep(note),
      default: cloneDeep(note),
      rag_options,
    };
  },
  emits: ["create"],
  methods: {
    onSubmit() {
      console.func(
        "components/base/BaseNoteCard:methods.onSubmit()",
        arguments
      );
      this.loading = true;
      this.moduleAction({
        ...this.$props,
        ...this.note,
      })
        .then(({ data, message }) => {
          this.note = {
            rag: null,
            message: null,
          };
          this.default = {
            rag: null,
            message: null,
          };
          this.$q.notify(message);
          this.$emit("create", data);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: "Error" });
        });
    },
  },
  computed: {
    ...mapState(useAppStore, {
      logedUser: "user",
    }),
    currentUser() {
      return this.creating ? this.logedUser : this.user;
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
      let message = this.message || "";
      let attributes = [];
      if (this.type !== "notes" && this.options) {
        Object.keys(this.options).forEach((key) => {
          let item = this.options[key];
          if (key === "password") {
            attributes.push(
              `${this.$core.capitalize(key.replaceAll("_", " "))} changed`
            );
          } else {
            attributes.push(
              `${this.$core.capitalize(
                key.replaceAll("_", " ")
              )} changed from ${item.previous} to ${item.current}`
            );
          }
        });
        message = message + "<br>" + attributes.join("<br>");
      }
      return message.replace(/\r?\n/g, "<br/>");
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
