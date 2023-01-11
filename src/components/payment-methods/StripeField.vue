<template>
  <div :class="{ 'stripe-field': true, 'has-error': hasError(element, error) }">
    <div class="q-field__native" :id="`card-${element}`"></div>
    <div class="error-icon">
      <i
        class="q-icon text-negative notranslate material-icons"
        aria-hidden="true"
        role="presentation"
      >
        error
      </i>
    </div>
    <div class="error q-field__bottom--animated">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
const hasError = (code, error) => error && error.code && error.code.includes(code);
export default {
  props: {
    element: String,
    error: Object,
    hasError: {
      type: Function,
      default: hasError,
    },
  },
};
</script>
