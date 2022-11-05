<template>
  <q-item
    @click="onDetails"
    clickable
    class="q-pa-none rounded-borders border-all overflow-hidden"
  >
    <q-item-section avatar>
      <base-thumbnail-widget class="border-right" square flat :media="media" />
    </q-item-section>
    <q-item-section>
      <q-item-label caption lines="1">{{ media.name }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="creating" side>
      <q-btn @click="onRemove" flat round size="xs" icon="fal fa-times" />
    </q-item-section>
  </q-item>
</template>

<script>
import FileEditor from "../FileEditor.vue";

export default {
  props: {
    media: Object,
    creating: Boolean,
  },
  emits: ["remove"],
  methods: {
    onRemove() {
      console.log(
        "components/base/BaseMediaCard:methods.onRemove()",
        arguments
      );
      this.$emit("remove");
    },
    onDetails() {
      console.func(
        "components/base/BaseMediaCard:methods.onDetails()",
        arguments
      );
      this.$q.dialog({
        component: FileEditor,
        componentProps: {
          file: this.media,
        },
      });
    },
  },
};
</script>
