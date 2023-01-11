<template>
  <q-responsive class="box rounded-borders cursor-pointer" :ratio="1">
    <div v-if="is_image || is_embed" class="thumbnail">
      <q-img loading="lazy" :src="url" contain>
        <template v-slot:loading>
          <q-spinner-orbit color="white" />
        </template>
      </q-img>
      <div v-if="is_embed" class="absolute-bottom-right q-pa-sm">
        <q-btn flat dense round color="grey" icon="fad fa-play-circle" />
      </div>
    </div>
    <div v-else class="text-black flex flex-center file">
      <div class="info overflow-hidden text-center">
        <q-icon :size="mini ? '20px' : '35px'" :name="`fas fa-file-${icon}`" />
      </div>
    </div>
    <slot></slot>
  </q-responsive>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    name: String,
    url: String,
    icon: String,
    is_image: Boolean,
    is_embed: Boolean,
    mini: Boolean,
  },
};
</script>
