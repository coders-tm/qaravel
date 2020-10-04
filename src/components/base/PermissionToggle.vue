<template>
  <q-toggle
    :value="toggleValue"
    @input="input"
    color="gm-pink"
    checked-icon="fal fa-check"
    unchecked-icon="fal fa-times"
    indeterminate-icon="fal fa-minus"
    toggle-indeterminate
    :true-value="1"
    :false-value="0"
  />
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return { toggleValue: this.value }
  },
  props: { value: Number },
  watch: {
    value (val) {
      this.toggleValue = val
    }
  },
  methods: {
    input: function ($event) {
      this.toggleValue = $event
      this.$emit('input', $event)
    }
  }
}
</script>
