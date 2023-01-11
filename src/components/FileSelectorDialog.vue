<template>
  <base-dialog
    :title="title"
    body-style=""
    body-class="q-pa-none"
    ref="dialog"
    persistent
    use-separator
    @hide="onDialogHide"
  >
    <template v-slot:body>
      <q-uploader
        ref="uploader"
        class="full-width file-selector-dialog-uploader overflow-hidden"
        flat
        :multiple="multiple"
        :max-file-size="maxFileSize"
        field-name="media"
        auto-upload
        :accept="acceptType"
        :with-credentials="true"
        :headers="headers"
        :url="url"
        @uploaded="onUploaded"
        @rejected="onRejected"
      >
        <template v-slot:header></template>
        <template v-slot:list="scope">
          <template v-if="!loading">
            <base-info v-if="hint" class="q-mb-md">{{ hint }}</base-info>
            <div class="file-grid">
              <div class="relative-position file-box file-select-btn">
                <q-responsive
                  class="cursor-pointer file-selector-dialog min"
                  :ratio="1"
                >
                  <q-uploader-add-trigger />
                  <div class="text-black flex flex-center">
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
                <q-responsive
                  class="box rounded-borders cursor-pointer"
                  :ratio="1"
                >
                  <div v-if="file.is_image" class="thumbnail">
                    <q-img :src="file.url" contain>
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
                  <div class="absolute-full controller">
                    <div class="q-pt-xs q-pr-sm absolute-top-right">
                      <q-icon
                        class="checked-icon"
                        size="15px"
                        color="green"
                        name="fas fa-check-circle"
                      />
                    </div>
                  </div>
                </q-responsive>
              </div>
            </div>
          </template>
          <q-inner-loading :showing="loading">
            <q-spinner-oval size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-uploader>
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
          <q-btn no-caps outline label="Cancel" color="grey" v-close-popup />
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
</template>

<script>
import { mapActions } from "pinia";
import { useFileStore } from "stores/file";

export default {
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
      required: false,
    },
    relatedFiles: {
      required: false,
      type: [Array],
      default: () => [],
    },
    hint: [String],
    title: {
      type: [String],
      default: "Upload media",
    },
    multiple: {
      type: [Boolean],
      default: false,
    },
    maxFileSize: {
      type: [Number, String],
      default: void 0,
    },
    acceptType: {
      required: false,
      type: [String],
      default: undefined,
    },
    loadFromServer: {
      type: [Boolean],
      required: false,
      default: false,
    },
    onUploading: {
      type: [Function],
      required: false,
      default: undefined,
    },
  },
  emits: ["ok", "hide"],
  methods: {
    ...mapActions(useFileStore, ["get"]),
    onRejected(rejectedEntries) {
      console.func(
        "components/FileSelectorDialog:methods.onRejected()",
        arguments
      );
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
    onUploaded({ files, xhr }) {
      console.func(
        "components/FileSelectorDialog:methods.onUploaded()",
        arguments
      );
      this.$refs.uploader.removeFile(files[0]);
      const file = JSON.parse(xhr.response);
      this.files.splice(0, 0, file);
    },
    onLoadFile(args) {
      console.func(
        "components/FileSelectorDialog:methods.onLoadFile()",
        arguments
      );
      this.loading = true;
      this.current_page = args.page;
      this.get(args)
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
    async show() {
      console.func("components/FileSelectorDialog:methods.show()", arguments);
      if (this.loadFromServer) {
        await this.onLoadFile({
          page: this.current_page,
        });
      }
      this.$refs.dialog.show();
    },
    hide() {
      console.func("components/FileSelectorDialog:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/FileSelectorDialog:methods.onDialogHide()",
        arguments
      );
      this.$emit("hide");
    },
    onDone() {
      console.func("components/FileSelectorDialog:methods.onDone()", arguments);
      this.$emit("ok", this.selected);
      this.hide();
    },
    onSelect(file) {
      console.func(
        "components/file-selector-dialog.vue:methods.onSelect()",
        arguments
      );
      if (this.multiple) {
        if (this.selected) {
          if (this.selected.find((item) => item.id === file.id)) {
            this.selected = this.selected.filter((item) => item.id !== file.id);
          } else {
            this.selected.push(file);
          }
        } else {
          this.selected = [];
          this.selected.push(file);
        }
      } else {
        this.selected =
          this.selected && this.selected.id === file.id ? "" : file;
      }
    },
    getSelected(file) {
      if (this.multiple) {
        return (
          this.selected &&
          this.selected.filter((item) => item.id === file.id).length > 0
        );
      } else {
        return this.selected && this.selected.id === file.id;
      }
    },
  },
  computed: {
    headers() {
      return [
        {
          name: "Authorization",
          value: `Bearer ${this.$app.token}`,
        },
      ];
    },
    url() {
      return `${process.env.API_URL}/files/store`;
    },
    disable() {
      return this.selected === this.modelValue;
    },
  },
};
</script>

<style lang="sass">
.file-selector-dialog
  min-height: 300px
  border: 2px dashed $separator-color
  border-radius: $generic-border-radius
  &.mini
    min-height: 60px
    min-width: 60px
  &.min
    min-height: auto
.file-box
  &.mini
    min-height: 60px
    min-width: 60px
  &:hover
    .delete
      display: block
      z-index: 1
  .delete
    display: none
.file-selector-dialog-uploader
  max-height: inherit
  .q-uploader__header
    background-color: transparent
    border-radius: 0
    .label
      margin-bottom: .4rem
  .q-uploader__list
    padding: 15px
    max-height: 50vh
    min-height: 50vh
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
    &:hover
      background: $grey-2
</style>
