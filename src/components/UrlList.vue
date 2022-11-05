<template>
  <div class="url-list">
    <div class="q-mb-md flex items-center">
      <div class="text-bold">Urls</div>
      <q-space />
      <base-btn
        color="primary"
        icon="fad fa-circle-plus"
        label="Add New"
        flat
        @click="onAdd"
      />
    </div>
    <div v-if="lists.length < 1" class="text-grey">No urls added</div>
    <q-list class="q-gutter-y-sm">
      <q-item class="q-pa-none" v-for="(item, index) in lists" :key="index">
        <q-item-section>
          <base-input v-model="item.url" placeholder="Url" />
        </q-item-section>
        <q-item-section>
          <base-input v-model="item.label" placeholder="Label" />
        </q-item-section>
        <q-item-section side>
          <base-btn
            color="grey"
            size="md"
            flat
            padding="14px"
            icon="fas fa-trash-can"
            @click="onRemove(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Array,
  },
  emits: ["update:model-value"],
  data() {
    return {
      lists: this.modelValue,
    };
  },
  methods: {
    onRemove(index) {
      console.func("components/UrlList:methods.onRemove()", arguments);
      this.lists.splice(index, 1);
      this.$emit("update:model-value", this.lists);
    },
    onAdd(index) {
      console.func("components/UrlList:methods.onAdd()", arguments);
      this.lists.push({});
      this.$emit("update:model-value", this.lists);
    },
  },
};
</script>
