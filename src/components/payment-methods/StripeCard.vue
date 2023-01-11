<template>
  <q-card class="stripe-credit-card">
    <q-card-section :class="{ 'q-pa-none': dense }">
      <div class="text-h6 q-mb-md" v-if="title">{{ title }}</div>
      <!-- Stripe Elements Placeholder -->
      <div id="card-element"></div>
      <slot></slot>
      <div class="actions">
        <q-btn
          v-show="hasButton"
          color="primary"
          no-caps
          class="full-width"
          icon="far fa-credit-card"
          :label="label"
          :loading="loading"
          :disabled="disabled"
          id="card-button"
          ref="card-button"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
  props: {
    title: String,
    amount: Number,
    btnLabel: String,
    processing: Boolean,
    pay: Boolean,
    add: Boolean,
    disabled: Boolean,
    dense: Boolean,
    hasButton: Boolean,
    billingDetails: Object,
  },
  data() {
    return {
      loading: Boolean(this.processing),
      stripe: null,
      cardElement: null,
    };
  },
  emits: ['failed', 'success', 'confirmed'],
  methods: {
    submit() {
      this.$refs['card-button'].$el.click();
    },
    confirmPaymentMethod({ client_secret, payment_method }) {
      this.loading = true;

      const paymentPromise = this.stripe.confirmCardPayment(client_secret, {
        setup_future_usage: 'off_session',
        payment_method: payment_method.id,
      });

      paymentPromise.then(({ error, paymentIntent }) => {
        this.loading = false;
        if (error) {
          // Display "error.message" to the user...
          this.$emit('failed', error.message);
          console.log('paymentIntent', error);
        } else {
          // The card has been confirmed successfully...
          this.$emit('confirmed', paymentIntent);
          console.log('paymentIntent', paymentIntent);
        }
      });
    },
  },
  async mounted() {
    const stripe = (this.stripe = await loadStripe(this.stripe_key));

    const elements = stripe.elements();
    const cardElement = (this.cardElement = elements.create('card', {
      hidePostalCode: true,
    }));

    cardElement.mount('#card-element');
    const cardButton = document.getElementById('card-button');

    cardButton.addEventListener('click', async (e) => {
      this.loading = true;
      const { paymentMethod, error } = await stripe.createPaymentMethod('card', cardElement, {
        billing_details: { ...this.billingDetails },
      });

      if (error) {
        // Display "error.message" to the user...
        this.loading = false;
        this.$emit('failed', error.message);
        console.log('paymentMethod', error);
      } else {
        this.loading = false;
        // The card has been verified successfully...
        this.$emit('success', paymentMethod);
        console.log('paymentMethod', paymentMethod);
      }
    });
  },
  computed: {
    stripe_key() {
      return process.env.STRIPE_KEY;
    },
    label() {
      return this.btnLabel || `Pay ${this.$core.money(this.amount)}`;
    },
    paymentMethods() {
      const methods = [
        { title: 'Card', type: 'card', remember: true, redirects: false, element: 'card' },
        { title: 'Alipay', type: 'alipay' },
        {
          title: 'BECS Direct Debit',
          type: 'au_becs_debit',
          remember: true,
          redirects: false,
          element: 'auBankAccount',
        },
        { title: 'Bancontact', type: 'bancontact', remember: true },
        { title: 'EPS', type: 'eps', element: 'epsBank' },
        { title: 'Giropay', type: 'giropay' },
        { title: 'iDEAL', type: 'ideal', remember: true, element: 'idealBank' },
        {
          title: 'SEPA Debit',
          type: 'sepa_debit',
          remember: true,
          redirects: false,
          element: 'iban',
          options: { supportedCountries: ['SEPA'] },
        },
      ].map((paymentMethod) => ({
        remember: false,
        redirects: true,
        options: {},
        ...paymentMethod,
      }));

      // return methods.filter(method => this.paymentIntent.payment_method_types.includes(method.type))
      return methods;
    },
  },
  watch: {
    processing: {
      deep: true,
      handler(val) {
        this.loading = Boolean(val);
      },
    },
  },
  unmounted() {
    this.cardElement.unmount();
    let stripeIframes = [
      document.querySelectorAll('[name^=__privateStripeMetricsController]'),
      document.querySelectorAll('[name^=__privateStripeController]'),
    ];
    stripeIframes.forEach((iframes) =>
      iframes.forEach((iframe) => {
        iframe.parentNode.removeChild(iframe);
      })
    );
  },
};
</script>
