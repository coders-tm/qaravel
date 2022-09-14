<template>
  <base-dialog
    content-style="width: 450px; max-width: 95vw"
    title="Add payment method"
    body-class="scroll"
    ref="dialog"
    persistent
    @hide="onDialogHide"
    hide-footer
  >
    <template v-slot:body>
      <stripe-card
        flat
        dense
        ref="stripe"
        @success="onSuccess"
        @failed="onFailed"
        :billingDetails="billingDetails"
      >
        <div class="q-mt-md">
          <q-checkbox dense v-model="is_deafult" label="Deafult" />
        </div>
        <div class="q-mt-md text-right">
          <base-btn color="primary" label="Add" @click="$refs.stripe.submit()" />
        </div>
      </stripe-card>
    </template>
  </base-dialog>
</template>

<script>
import { mapState } from 'pinia';
import { useAppStore } from 'stores/app';
import StripeCard from './StripeCard.vue';

export default {
  name: 'AddPaymentMethod',
  components: {
    StripeCard,
  },
  data() {
    return {
      is_deafult: false,
    };
  },
  emits: ['ok', 'hide'],
  methods: {
    show() {
      console.func('components/payment-methods/AddPaymentMethod:methods.show()', arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func('components/payment-methods/AddPaymentMethod:methods.close()', arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func('components/payment-methods/AddPaymentMethod:methods.onDialogHide()', arguments);
      this.$emit('hide');
    },
    onSuccess(args) {
      console.func('components/payment-methods/AddPaymentMethod:methods.onSuccess()', arguments);
      const { id, card } = args;
      this.$emit(
        'ok',
        Object.assign(this, {
          payment_method: id,
          card: card,
          is_deafult: this.is_deafult,
        })
      );
    },
    onFailed(error) {
      console.func('components/payment-methods/AddPaymentMethod:methods.onFailed()', arguments);
      this.$core.error(error, { title: 'Error' });
    },
  },
  computed: {
    ...mapState(useAppStore, ['billingDetails']),
  },
};
</script>
