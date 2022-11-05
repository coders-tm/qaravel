<template>
  <q-uploader
    ref="uploader"
    class="full-width file-selector-uploader overflow-hidden"
    flat
    :multiple="false"
    :max-files="1"
    field-name="media"
    auto-upload
    :with-credentials="true"
    :headers="headers"
    :url="url"
    @uploaded="onUploaded"
    @rejected="onRejected"
  >
    <template v-slot:header>
      <div v-if="label" class="label text-h6">{{ label }}</div>
    </template>
    <template v-slot:list="scope">
      <slot></slot>
      <base-dialog
        :title="dialogLabel"
        use-separator
        body-class="file-selector-uploader scroll"
        body-style="max-height: 50vh; min-height: 50vh"
        @hide="selected = null"
        ref="files"
      >
        <template v-slot:body>
          <template v-if="!loading">
            <base-info v-if="hint" class="q-mb-md">{{ hint }}</base-info>
            <div class="file-grid">
              <div class="relative-position file-box file-select-btn">
                <q-responsive
                  class="cursor-pointer file-selector min"
                  :ratio="1"
                >
                  <q-uploader-add-trigger />
                  <div class="q-pa-xs text-black flex flex-center">
                    <div class="text-center">
                      <div class="text-subtitle2 text-primary">
                        Browse files
                      </div>
                      <div>or drop files here to upload</div>
                    </div>
                  </div>
                </q-responsive>
              </div>
              <div
                @click="onSelect(file)"
                :class="{
                  'relative-position': true,
                  'file-box': true,
                  selected: getSelected(file),
                }"
                v-for="file in files"
                :key="file.id"
              >
                <file-card :mini="mini" v-bind="file">
                  <div class="absolute-full controller">
                    <div class="q-pt-xs q-pr-sm absolute-top-right">
                      <q-icon
                        class="checked-icon"
                        size="15px"
                        color="green"
                        name="fas fa-check-circle"
                      />
                    </div>
                    <div class="q-pa-sm file-name ellipsis absolute-bottom">
                      {{ file.name }}
                      <base-tooltip style="width: 150px">
                        {{ file.name }}
                      </base-tooltip>
                    </div>
                  </div>
                </file-card>
              </div>
              <div
                class="relative-position file-box"
                v-for="(file, index) in scope.files"
                :key="index"
              >
                <q-responsive
                  class="box rounded-borders cursor-pointer bg-grey-2"
                  :ratio="1"
                >
                  <div
                    v-if="file.__status === 'uploading'"
                    class="q-pa-md text-black flex flex-center"
                  >
                    <q-spinner-orbit
                      color="primary"
                      size="3rem"
                      :thickness="5"
                    />
                  </div>
                  <template v-else>
                    <div v-if="file.__img" class="thumbnail">
                      <q-img :src="file.__img.src" contain>
                        <template v-slot:loading>
                          <q-spinner-orbit color="white" />
                        </template>
                      </q-img>
                    </div>
                    <div
                      v-else
                      class="q-pa-md text-black flex flex-center file"
                    >
                      <div class="info overflow-hidden text-center">
                        <q-icon
                          :name="`fas fa-file-${file.icon}`"
                          size="50px"
                        />
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
            </div>
          </template>
          <q-inner-loading :showing="loading">
            <q-spinner-oval size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:footer>
          <q-card-section class="flex">
            <template v-if="loadFromServer">
              <q-btn
                :disable="current_page <= 1 || loading"
                @click="
                  onLoadFile({
                    page: current_page - 1 >= 1 ? current_page - 1 : 1,
                  })
                "
                dense
                round
                flat
                color="primary"
                icon="fal fa-angle-left"
              />
              <q-btn
                :disable="current_page == last_page || loading"
                @click="
                  onLoadFile({
                    page: current_page + 1 <= last_page ? current_page + 1 : 1,
                  })
                "
                dense
                round
                flat
                color="primary"
                icon="fal fa-angle-right"
              />
            </template>
            <q-space />
            <div class="q-gutter-sm">
              <q-btn
                no-caps
                outline
                label="Cancel"
                color="grey"
                v-close-popup
              />
              <q-btn
                :disable="disable"
                no-caps
                label="Done"
                color="primary"
                @click="onDone"
              />
            </div>
          </q-card-section>
        </template>
      </base-dialog>
      <div
        :class="{
          'file-box': true,
          mini: mini,
        }"
        @click.stop="onFileBrowse"
      >
        <file-card :mini="mini" v-if="hasFile" v-bind="modelValue" />
        <div
          v-else
          :class="{
            'flex flex-center file-selector': true,
            mini: mini,
          }"
        >
          <div class="text-center">
            <q-icon :size="mini ? '20px' : '35px'" name="fad fa-file"></q-icon>
            <div v-if="!mini" class="q-mt-sm">
              <q-btn
                class="q-pl-lg q-pr-lg"
                color="primary"
                @click.stop="onFileBrowse"
                outline
                no-caps
                label="Browse files"
              ></q-btn>
            </div>
            <div v-if="!mini">or drop files here to upload</div>
          </div>
        </div>
      </div>
    </template>
  </q-uploader>
</template>

<script>
import { mapActions } from "pinia";
import { useFileStore } from "stores/file";
import FileCard from "./FileCard.vue";
import FileEditor from "./FileEditor.vue";

export default {
  components: { FileCard },
  data() {
    return {
      selected: this.modelValue,
      files: this.relatedFiles,
      current_page: 1,
      last_page: 1,
      loading: false,
    };
  },
  props: {
    modelValue: {
      required: true,
    },
    relatedFiles: {
      required: false,
      type: [Array],
      default: () => [],
    },
    label: [String],
    hint: [String],
    size: [Number],
    dialogLabel: {
      type: [String],
      default: "Upload media",
    },
    mini: {
      type: [Boolean],
      default: false,
    },
    loadFromServer: {
      type: [Boolean],
      required: false,
      default: false,
    },
    query: {
      required: false,
      type: Function,
      default: () => (args) => {
        return {
          ...args,
          rowsPerPage: 7,
        };
      },
    },
  },
  emits: ["update:model-value", "rejected", "uploaded"],
  methods: {
    ...mapActions(useFileStore, ["get"]),
    onRejected(rejectedEntries) {
      console.func("components/FileSelector:methods.onRejected()", arguments);
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
      this.$emit("rejected", rejectedEntries);
    },
    onUploaded({ files, xhr }) {
      console.func("components/FileSelector:methods.onUploaded()", arguments);
      this.$refs.uploader.removeFile(files[0]);
      const image = JSON.parse(xhr.response);
      this.files.push(image);
      this.$emit("uploaded", image);
    },
    onLoadFile(args) {
      console.func("components/FileSelector:methods.onLoadFile()", arguments);
      this.loading = true;
      this.current_page = args.page;
      this.get(this.query(args))
        .then(({ data, meta }) => {
          this.files = data;
          this.current_page = meta.current_page;
          this.last_page = meta.last_page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    async onFileBrowse() {
      console.func("components/FileSelector:methods.onFileBrowse()", arguments);
      if (this.loadFromServer) {
        await this.onLoadFile({
          page: this.current_page,
        });
      }
      this.$refs.files.show();
    },
    onDone() {
      console.func("components/FileSelector:methods.onDone()", arguments);
      this.$emit("update:model-value", this.selected);
      this.$refs.files.hide();
    },
    onDetails() {
      console.func("components/FileSelector:methods.onDetails()", arguments);
      this.$q.dialog({
        component: FileEditor,
        componentProps: {
          file: this.selected,
        },
      });
    },
    onSelect(file) {
      console.func("components/FileSelector:methods.onSelect()", arguments);
      this.selected = this.selected && this.selected.id === file.id ? "" : file;
    },
    getSelected(file) {
      return this.selected && this.selected.id === file.id;
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
    disable() {
      return this.selected === this.modelValue;
    },
    hasFile() {
      return (
        this.modelValue &&
        typeof this.modelValue === "object" &&
        this.modelValue.id
      );
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.selected = val;
      },
    },
    relatedFiles: {
      deep: true,
      handler(val) {
        this.files = val;
      },
    },
  },
};
</script>
<style lang="sass">
.file-selector
  min-height: 300px
  border: 2px dashed $separator-color
  border-radius: $generic-border-radius
  &.mini
    min-height: 60px
    min-width: 60px
    height: 60px
    width: 60px
  &.min
    min-height: auto
.file-box
  &.mini
    min-height: 60px
    min-width: 60px
    height: 60px
    width: 60px
  &:hover
    .delete
      display: block
      z-index: 1
  .delete
    display: none
.file-selector-uploader
  max-height: inherit
  .q-uploader__header
    background-color: transparent
    border-radius: 0
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
      background: rgba(153, 153, 153, 0.55)
    .file-box
      .controller
        visibility: hidden
      &.selected, &:hover
        .controller
          visibility: visible
          background: rgba(153, 153, 153, 0.55)
        .rounded-borders
          border-color: $positive
      &:hover:not(.selected)
        .checked-icon
          color: white !important
  .file-box
    position: relative
    .box
      overflow: hidden
      border: 1px solid $separator-color
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
  .file-select-btn
    &:hover .file-selector
      background: $grey-2
</style>
