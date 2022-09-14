<template>
  <base-dialog
    maximized
    persistent
    ref="dialog"
    @hide="onDialogHide"
    hide-footer
    content-class="file-editor"
    body-style=""
    content-style=""
    body-class="row q-col-gutter-md"
  >
    <template v-slot:header>
      <q-toolbar class="bg-grey text-white">
        <q-toolbar-title class="text-subtitle2">
          {{ file.name }}
        </q-toolbar-title>
        <template v-if="ready">
          <q-btn class="q-mr-xs" no-caps label="Reset" outline @click="onReset" />
          <q-btn
            v-if="cropImg"
            no-caps
            label="Save"
            color="primary"
            :loading="loading"
            @click="onSave"
          />
          <q-btn v-else no-caps label="Done" color="primary" @click="onCropImage" />
        </template>
        <template v-else>
          <q-btn flat round dense icon="far fa-file-download" class="q-mr-xs" />
          <q-btn flat round dense icon="far fa-trash-alt" class="q-mr-xs" />
          <q-btn flat round dense icon="close" @click="onCancelClick" />
        </template>
      </q-toolbar>
    </template>
    <template v-slot:body>
      <div class="col-sm-9">
        <q-card flat bordered>
          <q-card-section class="video-embed" v-if="file.is_embed">
            <q-video :src="file.embed_url" />
          </q-card-section>
          <q-card-section v-else-if="file.is_image">
            <vue-cropper
              class="cropper"
              ref="cropper"
              :src="file.url"
              :viewMode="2"
              :autoCrop="false"
              :zoomOnWheel="false"
              :checkCrossOrigin="false"
              :aspectRatio="aspectRatio"
              :dragMode="dragMode"
              @crop="onCrop"
              @ready="onReady"
            />
          </q-card-section>
          <q-card-section v-else class="cropper flex flex-center">
            <q-icon :name="`fas fa-file-${file.icon}`" size="50px" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <p class="text-subtitle2 q-mb-sm">Alt text</p>
            <div class="q-mt-sm">
              Alt text (alternative text) to media is first and foremost a principle of web
              accessibility. Visually impaired users using screen readers will be read an alt
              attribute to better understand an on-page image.
            </div>
            <q-btn flat class="q-mt-sm" color="primary" no-caps label="Add alt text" />
          </q-card-section>
          <template v-if="file.is_image">
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">Crop ratio</div>
              <q-list>
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in ratio_options"
                  :key="index"
                  :active="aspectRatio === item.value"
                  @click="aspectRatio = item.value"
                  active-class="active"
                  class="ratio-menu"
                >
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">Rotate image</div>
              <q-btn-group flat spread>
                <q-btn no-caps flat label="Right" icon="rotate_right" @click="rotate(90)" />
                <q-btn no-caps flat label="Left" icon="rotate_left" @click="rotate(-90)" />
              </q-btn-group>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">Flip image</div>
              <q-btn-group flat spread>
                <q-btn no-caps flat label="Horizontal" icon="flip" @click="flipX" />
                <q-btn
                  no-caps
                  flat
                  label="Vertical"
                  icon="flip"
                  class="icon-rotate-90"
                  @click="flipY"
                />
              </q-btn-group>
            </q-card-section>
          </template>
        </q-card>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      cropImg: '',
      flipXScale: 1,
      flipYScale: 1,
      aspectRatio: NaN,
      ready: false,
      loading: false,
    };
  },
  props: {
    file: {
      required: false,
      type: Object,
      default: () => {
        return {
          id: 87,
          url: 'images/picture.jpg',
          name: 'picture.jpg',
          is_image: true,
        };
      },
    },
    cropRatio: {
      required: false,
      type: Number,
      default: NaN,
    },
    dragMode: {
      description: 'Define the dragging mode of the cropper. Available options: move, none, crop',
      required: false,
      type: String,
      default: 'crop',
    },
    ratio_options: {
      required: false,
      type: Array,
      default: () => {
        return [
          { label: 'Freeform', value: 0 },
          { label: 'Square', value: 1 },
          { label: '16:9', value: 16 / 9 },
          { label: '5:7', value: 5 / 7 },
          { label: '4:3', value: 4 / 3 },
        ];
      },
    },
  },
  methods: {
    show() {
      console.func('components/file-editor:methods.show()', arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func('components/file-editor:methods.close()', arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func('components/file-editor:methods.onDialogHide()', arguments);
      this.$emit('hide');
    },
    onCancelClick() {
      console.func('components/file-editor:methods.onCancelClick()', arguments);
      this.hide();
    },
    onCrop(props) {
      console.func('components/file-editor:methods.onCrop()', arguments);
      this.ready = true;
    },
    onReady(props) {
      console.func('components/file-editor:methods.onReady()', arguments);
    },
    onSave(props) {
      console.func('components/file-editor:methods.onSave()', arguments);
      this.loading = true;
      const media = this.$core.dataURLtoFile(this.cropImg, this.file.name);
      const fromData = new FormData();
      fromData.append('id', this.file.id);
      fromData.append('media', media, this.file.name);
      this.$store
        .dispatch('file/Update', fromData)
        .then((response) => {
          Object.assign(this.file, response);
          this.cropImg = false;
          this.ready = false;
          this.loading = false;
          this.$emit('ok', this.file);
        })
        .catch((error) => {
          this.$core.error(error);
        });
    },
    onCropImage() {
      console.func('components/file-editor:methods.onCropImage()', arguments);
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.replace(this.cropImg, false);
      this.aspectRatio = -1;
    },
    onReset() {
      console.func('components/file-editor:methods.onReset()', arguments);
      this.$core
        .confirm("This action can't be undone. You have unsaved edits that you will lose.", {
          title: 'Reset all changes',
        })
        .then(() => {
          this.ready = false;
          this.cropImg = false;
          this.aspectRatio = -1;
          this.$refs.cropper.replace(this.file.url, false);
        });
    },
    rotate(deg) {
      console.func('components/file-editor:methods.rotate()', arguments);
      this.aspectRatio = -1;
      this.$refs.cropper.clear().rotate(deg).zoomTo(0.5);
      const containerData = this.$refs.cropper.getContainerData();
      const canvasData = this.$refs.cropper.getCanvasData();
      this.$refs.cropper.setCanvasData({
        top: (containerData.height - canvasData.height) / 2,
        left: (containerData.width - canvasData.width) / 2,
      });
    },
    flipY() {
      console.func('components/file-editor:methods.flipY()', arguments);
      this.flipYScale = this.flipYScale ? -this.flipYScale : -1;
      this.$refs.cropper.scaleY(this.flipYScale);
    },
    flipX() {
      console.func('components/file-editor:methods.flipX()', arguments);
      this.flipXScale = this.flipXScale ? -this.flipXScale : -1;
      this.$refs.cropper.scaleX(this.flipXScale);
    },
  },
  watch: {
    aspectRatio(val) {
      console.func('components/file-editor:watch.aspectRatio()', arguments);
      if (val !== -1) {
        this.$refs.cropper.setAspectRatio(val);
        this.$refs.cropper.initCrop();
      }
    },
  },
  mounted() {
    this.aspectRatio = this.cropRatio;
  },
};
</script>
<style lang="sass">
.file-editor
  .ratio-menu
    border-left: 5px solid transparent
    &:hover, &.active
      color: $primary
      background: $grey-1
      border-color: $primary
  .icon-rotate-90
    .q-icon
      transform: rotate(90deg)
  .cropper
    background-color: #f7f7f7
    text-align: center
    width: 100%
    height: calc(100vh - 120px)
    > img
      max-width: 100%
    .cropper-bg
      width: 100% !important
  .video-embed
    // height: calc(100vh - 85px)
    overflow: hidden
  .q-video iframe
    height: calc(100vh - 120px)
</style>
