<template>
  <base-dialog
    content-style="width: 800px; max-width: 95vw"
    body-style="height: 80vh"
    content-class="base-pdf-viewer"
    :title="title"
    body-class="q-pa-none"
    ref="dialog"
    hide-footer
    @hide="onDialogHide"
  >
    <template v-slot:header>
      <q-bar class="bg-grey-10 text-white">
        <q-icon name="print" />
        <div style="font-size: 13px">{{ title }}</div>
        <q-space />
        <q-btn round v-close-popup dense flat icon="close" />
      </q-bar>
    </template>
    <template v-slot:body>
      <div class="fit">
        <q-pdfviewer :src="url" type="html5" />
      </div>
    </template>
  </base-dialog>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
    title: {
      required: true,
      type: String,
      default: 'PDF preview',
    },
  },
  emits: ['ok', 'hide'],
  methods: {
    show() {
      console.func('components/PdfViewer:methods.show()', arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func('components/PdfViewer:methods.close()', arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func('components/PdfViewer:methods.onDialogHide()', arguments);
      this.$emit('hide');
    },
    onDone() {
      this.$emit('ok', this.url);
      this.hide();
    },
  },
};
</script>
