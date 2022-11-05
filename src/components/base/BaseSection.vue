<template>
  <q-card
    :dark="dark"
    :square="square"
    :flat="flat"
    :bordered="bordered"
    class="base-section"
  >
    <q-card-section :class="headClass" v-if="hasTop">
      <div class="flex">
        <div v-if="title" class="text-h6">{{ title }}</div>
        <q-space />
        <slot name="action"></slot>
      </div>
      <q-item-label v-if="description">{{ description }}</q-item-label>
    </q-card-section>
    <q-card-section v-bind:class="getBodyClass">
      <template v-if="!noRow">
        <div class="row q-col-gutter-lg">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </q-card-section>
    <template v-if="hasBottom">
      <q-separator />
      <q-card-section>
        <slot name="bottom"></slot>
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
export default {
  props: {
    dark: Boolean,
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
    hasBottom: Boolean,
    bodyClass: String,
    headClass: String,
    title: String,
    description: String,
    noRow: Boolean,
  },
  computed: {
    hasTop() {
      return this.title ? true : this.description ? true : false;
    },
    getBodyClass() {
      return `${this.bodyClass} ${this.hasTop ? "q-pt-none" : ""}`;
    },
  },
};
</script>
