<template>
  <base-dialog :title="title" ref="dialog" body-class="scroll" persistent @hide="onDialogHide">
    <template v-slot:body>
      <div class="text-label">{{ label }}</div>
      <q-input dense outlined v-model="url" type="url" placeholder="https://" />
    </template>
    <template v-slot:footer>
      <q-card-section class="text-right">
        <div class="q-gutter-sm">
          <q-btn no-caps outline label="Cancel" color="grey" v-close-popup />
          <q-btn :disable="disable" no-caps label="Done" color="primary" @click="onDone" />
        </div>
      </q-card-section>
    </template>
  </base-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    type: {
      required: true,
      type: String,
      validator: function (value) {
        // The value must match one of these strings
        return ['photo', 'video'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      url: null,
    };
  },
  emits: ['ok', 'hide'],
  methods: {
    show() {
      console.func('components/file-from-url:methods.show()', arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func('components/file-from-url:methods.close()', arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func('components/file-from-url:methods.onDialogHide()', arguments);
      this.$emit('hide');
    },
    async onDone() {
      try {
        let embedUrl = null;
        let embedId = null;
        let imageUrl = null;
        const url = new URL(this.url);
        const form = new FormData();

        if (this.type === 'photo') {
          form.append('source', this.url);
        } else {
          if (url.host.includes('vimeo')) {
            embedId = url.pathname.replace('/', '');
            embedUrl = `https://player.vimeo.com/video/${embedId}`;
            await axios
              .get(`https://vimeo.com/api/v2/video/${embedId}.json`, {
                withCredentials: false,
              })
              .then(({ data }) => {
                imageUrl = data[0]['thumbnail_large'];
              })
              .catch((error) => {
                this.$core.error(error);
              });
          } else if (url.host.includes('youtube')) {
            embedId = url.searchParams.get('v');
            embedUrl = `https://www.youtube.com/embed/${embedId}`;
            imageUrl = `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`;
          }
          form.append('source', imageUrl);
          form.append('is_embed', 1);
          form.append('embed_type', url.host);
          form.append('embed_id', embedId);
          form.append('embed_url', embedUrl);
        }

        // Upload image to app server
        await axios.post('files/upload-from-source', form).then(({ data }) => {
          console.log('response', data);
          this.$emit('ok', data);
        });
        this.hide();
      } catch (error) {
        this.$core.error(error);
      }
    },
  },
  computed: {
    disable() {
      return !this.url;
    },
    title() {
      if (this.type === 'photo') {
        return 'Add photo from URL';
      } else {
        return 'Embed video';
      }
    },
    label() {
      if (this.type === 'photo') {
        return 'Paste image URL';
      } else {
        return 'YouTube or Vimeo URL';
      }
    },
  },
};
</script>
