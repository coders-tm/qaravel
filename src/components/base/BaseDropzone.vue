<template>
  <q-uploader
    ref="uploader"
    class="full-width dropzone-uploader"
    flat
    :multiple="multiple"
    :max-files="maxFiles"
    field-name="media"
    auto-upload
    :with-credentials="true"
    :headers="headers"
    :url="url"
    @uploaded="onUploaded"
    @rejected="onRejected"
  >
    <template v-slot:header>
      <slot name="header" v-bind:onAddMediaFromUrl="onAddMediaFromUrl">
        <template v-if="header">
          <div dense class="row no-wrap items-center">
            <q-checkbox
              size="sm"
              class="text-subtitle2"
              dense
              v-if="selected.length"
              @update:model-value="onSelect"
              v-model="selection"
              :label="`${selected.length} media selected`"
            />
            <div v-else class="text-h6">{{ label }}</div>
            <q-space />
            <base-btn
              v-if="selected.length"
              link
              color="negative"
              label="Remove media?"
              @click="onRemove"
            />
            <base-btn-dropdown
              v-else
              link
              color="primary"
              label="Add media from URL"
            >
              <q-list dense class="q-pa-sm">
                <q-item
                  class="rounded-borders"
                  @click="onAddMediaFromUrl('photo')"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>Add photo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  class="rounded-borders"
                  @click="onAddMediaFromUrl('video')"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>Embed video</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </base-btn-dropdown>
          </div>
          <div class="q-mb-md" v-if="hint">{{ hint }}</div>
        </template>
      </slot>
    </template>
    <template v-slot:list="scope">
      <template v-if="(scope.files && scope.files.length) || files.length">
        <vue-draggable-next
          handle=".handle"
          ghost-class="ghost-file"
          class="file-grid"
          v-model="files"
          item-key="id"
        >
          <div
            class="relative-position file-box"
            v-for="file in files"
            :key="file.id"
          >
            <file-card v-bind="file">
              <div class="absolute-full controller q-pa-sm">
                <div
                  @click="onDetails(file)"
                  class="handler absolute-full flex flex-center"
                >
                  <q-icon
                    class="handle"
                    color="white"
                    size="xs"
                    name="far fa-expand-alt"
                  />
                </div>
                <q-btn
                  :ripple="false"
                  class="remove absolute-top-right q-mt-sm q-mr-sm"
                  dense
                  size="7px"
                  color="red-5"
                  icon="close"
                  @click="onRemoveSingle(file)"
                />
                <q-checkbox
                  v-show="useCheckbox"
                  size="sm"
                  dark
                  dense
                  class="selected"
                  v-model="selected"
                  :val="file.id"
                />
              </div>
            </file-card>
          </div>
          <div
            class="relative-position file-box"
            v-for="(file, index) in scope.files"
            :key="index"
          >
            <q-responsive
              class="box rounded-borders cursor-pointer bg-grey-4"
              :ratio="1"
            >
              <div
                v-if="file.__status === 'uploading'"
                class="q-pa-md text-black flex flex-center"
              >
                <q-spinner-orbit color="primary" size="3rem" :thickness="5" />
              </div>
              <template v-else>
                <div v-if="file.__img" class="thumbnail">
                  <q-img :src="file.__img.src" contain>
                    <template v-slot:loading>
                      <q-spinner-orbit color="white" />
                    </template>
                  </q-img>
                </div>
                <div v-else class="q-pa-md text-black flex flex-center file">
                  <div class="info overflow-hidden text-center">
                    <q-icon :name="`fas fa-file-${file.icon}`" size="50px" />
                  </div>
                </div>
                <div
                  class="absolute-full q-pa-md text-black flex flex-center failed"
                  v-if="file.__status === 'failed'"
                >
                  <div class="info overflow-hidden text-center">
                    <q-btn
                      flat
                      round
                      color="white"
                      icon="fas fa-cloud-upload-alt"
                      @click="scope.upload"
                    />
                  </div>
                </div>
              </template>
            </q-responsive>
          </div>
          <div
            v-if="files.length < maxFiles"
            class="relative-position file-box file-select-btn"
          >
            <q-responsive class="cursor-pointer dropzone min" :ratio="1">
              <q-uploader-add-trigger />
              <div class="text-black flex flex-center">
                <div class="text-center">
                  <q-icon name="fas fa-plus" />
                </div>
              </div>
            </q-responsive>
          </div>
        </vue-draggable-next>
      </template>
      <div v-else class="flex flex-center dropzone">
        <div class="text-center">
          <q-icon color="grey" size="50px" name="far fa-cloud-upload"></q-icon>
          <div class="text-grey">Drag and drop files here</div>
          <div class="text-grey">or</div>
          <base-btn link color="primary" outline no-caps label="Browse files">
            <q-uploader-add-trigger />
          </base-btn>
        </div>
      </div>
    </template>
  </q-uploader>
</template>

<script>
import FileEditor from "../FileEditor.vue";
import FileFromSource from "../FileFromSource.vue";
import BaseBtnDropdown from "./BaseBtnDropdown.vue";
import { VueDraggableNext } from "vue-draggable-next";
import FileCard from "../FileCard.vue";

export default {
  components: { BaseBtnDropdown, VueDraggableNext, FileCard },
  data() {
    return {
      selection: false,
      selected: [],
      files: this.modelValue,
    };
  },
  props: {
    modelValue: {
      required: true,
      type: Array,
    },
    label: {
      type: String,
      default: "Media",
    },
    hint: String,
    header: Boolean,
    useCheckbox: Boolean,
    multiple: {
      required: false,
      type: Boolean,
      default: true,
    },
    editor: {
      required: false,
      type: Boolean,
      default: false,
    },
    maxFiles: {
      required: false,
      type: [Number, String],
      default: 9999,
    },
  },
  emits: ["update:model-value", "rejected", "removed", "uploaded"],
  methods: {
    onRejected(rejectedEntries) {
      console.func(
        "components/base/BaseDropzone:methods.onRejected()",
        arguments
      );
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
      this.$emit("rejected", rejectedEntries);
    },
    onUploaded({ files, xhr }) {
      console.func(
        "components/base/BaseDropzone:methods.onUploaded()",
        arguments
      );
      this.$refs.uploader.removeFile(files[0]);
      this.files.push(JSON.parse(xhr.response));
      this.$emit("uploaded", JSON.parse(xhr.response));
      this.$emit("update:model-value", this.files);
    },
    onDetails(file) {
      console.func(
        "components/base/BaseDropzone:methods.onDetails()",
        arguments
      );
      if (!this.editor) return false;
      this.$q
        .dialog({
          component: FileEditor,
          componentProps: {
            file: file,
          },
        })
        .onOk((data) => {
          console.func(
            "components/base/BaseDropzone:methods.onDetails.onOk()",
            arguments
          );
          file.updating = true;
          Object.assign(file, data);
        });
    },
    onSelect() {
      if (this.selected.length && this.selected.length < this.files.length) {
        this.files
          .filter((item) => !this.selected.includes(item.id))
          .forEach((item) => {
            this.selected.push(item.id);
          });
      } else if (this.selected.length === this.files.length) {
        this.selected = [];
      } else {
        this.selected = this.files.map((item) => item.id);
      }
    },
    onRemove() {
      console.func("components/base/BaseDropzone:method.onRemove()", arguments);
      this.$core.confirm(`Are you sure you want to remove?`).then(() => {
        this.files
          .filter((item) => this.selected.find((id) => id === item.id))
          .forEach((element) => {
            this.$emit("removed", element);
          });
        this.files = this.files.filter(
          (item) => !this.selected.find((id) => id === item.id)
        );
        this.$emit("update:model-value", this.files);
        this.selected = [];
      });
    },
    onRemoveSingle(file) {
      console.func(
        "components/base/BaseDropzone:method.onRemoveSingle()",
        arguments
      );
      this.$core.confirm(`Are you sure you want to remove?`).then(() => {
        this.$emit("removed", file);
        this.files = this.files.filter((item) => file.id != item.id);
        this.$emit("update:model-value", this.files);
      });
    },
    onAddMediaFromUrl(type) {
      console.func(
        "components/base/BaseDropzone:method.onAddMediaFromUrl()",
        arguments
      );
      this.$q
        .dialog({
          component: FileFromSource,
          componentProps: {
            type: type,
          },
        })
        .onOk((file) => {
          console.func(
            "components/base/BaseDropzone:method.onAddMediaFromUrl.onOk()",
            file
          );
          this.files.push(file);
        });
    },
  },
  computed: {
    headers() {
      if (this.$useToken) {
        return [
          {
            name: "Authorization",
            value: `Bearer ${this.$app.token}`,
          },
        ];
      }
      return [
        {
          name: "X-XSRF-TOKEN",
          value: this.$q.cookies.get("XSRF-TOKEN"),
        },
      ];
    },
    url() {
      return `${process.env.API_URL}/files/store`;
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.files = val;
      },
    },
    selected(val) {
      if (val.length && val.length < this.files.length) {
        this.selection = null;
      } else if (val.length === this.files.length) {
        this.selection = true;
      } else {
        this.selection = false;
      }
    },
  },
};
</script>
<style lang="sass">
$min-height: 185px
.dropzone
  min-height: $min-height
  border: 2px dashed $separator-color
  border-radius: $generic-border-radius
  overflow: hidden
  &.min
    min-height: auto
.file-box
  &:hover
    .delete
      display: block
      z-index: 1
  .delete
    display: none
.dropzone-uploader
  max-height: inherit
  min-height: $min-height
  .q-uploader__header
    background-color: inherit
    color: inherit
    border-radius: 0
    &:before
      background: inherit
    .label
      margin-bottom: .4rem
  .q-uploader__list
    padding: 0
    overflow: inherit
    .file-grid
      position: relative
      display: grid
      grid-template-columns: repeat(4,1fr)
      grid-gap: .8rem
      -webkit-user-select: none
      user-select: none
      .failed
        background: rgba(159, 159, 159, 0.57)
      .file-box
        position: relative
        .box
          border: 1px solid $separator-color
          overflow: hidden
        &:first-child
          grid-column: 1/span 2
          grid-row: 1/span 2
        .thumbnail
          z-index: 5
          display: flex
          overflow: hidden
          flex-direction: column
          justify-content: center
          align-items: center
          width: 100%
          border-radius: 5px
          transform: translateZ(0)
        .file
          max-width: 100%
          .info
            max-width: 100%
        .controller
          .selected[aria-checked="false"]
            opacity: 0
          .selected[aria-checked="true"]
            opacity: 1
          .remove
            opacity: 0
          .handler
            opacity: 0
            background: linear-gradient(180deg,rgba(33,43,54,.55),hsla(0,0%,100%,0))
            border-radius: $generic-border-radius
          &:hover
            .handler, .selected, .remove
              opacity: 1
          .q-checkbox--dark
            .q-checkbox__inner::before
              display: none
            .q-checkbox__bg
              background: white
              border-color: white
            .q-checkbox__svg
              color: white
            &[aria-checked="true"]
              .q-checkbox__bg
                background: $primary
                border-color: $primary
            &[aria-checked="false"]
              .q-checkbox__truthy
                visibility: hidden
    .file-select-btn .dropzone:hover
      background: $grey-2
</style>
