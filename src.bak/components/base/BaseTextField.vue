<template>
  <label class="q-field row items-start q-field--float q-field--labeled q-field--standard">
    <div class="q-field__inner relative-position col self-stretch column justify-center">
      <div
        class="relative-position row"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);"
      >
        <div class="q-field__control-container col relative-position row q-anchor--skip">
          <div class="q-field__native">{{ value }}</div>
          <div class="q-field__label no-pointer-events absolute ellipsis">{{ label }}</div>
        </div>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  props: {
    label: String,
    value: String
  }
}
</script>
