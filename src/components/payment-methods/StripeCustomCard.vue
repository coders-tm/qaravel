<template>
  <q-card class="stripe-custom-credit-card">
    <q-card-section :class="{ 'q-pa-none': dense }">
      <div class="text-h6 q-mb-md" v-if="title">{{ title }}</div>
      <!-- Stripe Elements Placeholder -->
      <div class="row q-col-gutter-lg">
        <div class="col-xs-12 col-sm-4">
          <div class="text-label">Card Number</div>
          <stripe-field element="number" :error="error" />
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="text-label">Expiry Date</div>
          <stripe-field element="expiry" :error="error" />
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="text-label">CVC (Card Verification Code)</div>
          <stripe-field element="cvc" :error="error" />
        </div>
        <div class="col-xs-12 col-sm-4 self-end actions">
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
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import StripeField from './StripeField.vue';
const hasError = (code, error) => error && error.code && error.code.includes(code);
const baseStyle = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '28px',
    fontWeight: 400,
    fontSize: '14px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};

export default {
  components: { StripeField },
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
      cardNumberElement: null,
      cardExpiryElement: null,
      cardCvcElement: null,
      error: {},
      hasError,
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
    const cardNumberElement = (this.cardNumberElement = elements.create('cardNumber', {
      style: baseStyle,
    }));
    const cardExpiryElement = (this.cardExpiryElement = elements.create('cardExpiry', {
      style: baseStyle,
    }));
    const cardCvcElement = (this.cardCvcElement = elements.create('cardCvc', {
      style: baseStyle,
    }));

    cardNumberElement.mount('#card-number');
    cardExpiryElement.mount('#card-expiry');
    cardCvcElement.mount('#card-cvc');

    const cardButton = document.getElementById('card-button');

    cardButton.addEventListener('click', async (e) => {
      this.error = {};
      this.loading = true;
      const { paymentMethod, error } = await stripe.createPaymentMethod('card', cardNumberElement, {
        billing_details: { ...this.billingDetails },
      });

      if (error) {
        // Display "error.message" to the user...
        console.log('paymentMethod', error);
        this.loading = false;
        this.error = error;
        if (error.code && ['expiry', 'cvc', 'number'].includes(error.code)) {
          this.$emit('failed', error.message);
        }
      } else {
        this.loading = false;
        // The card has been verified successfully...
        console.log('paymentMethod', paymentMethod);
        this.$emit('success', paymentMethod);
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
    this.cardNumberElement.unmount();
    this.cardExpiryElement.unmount();
    this.cardCvcElement.unmount();
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

<style lang="scss">
.stripe-custom-credit-card {
  .stripe-field {
    position: relative;
    padding-bottom: 20px;
    &.has-error {
      .error,
      .error-icon {
        visibility: visible;
      }
    }
    .error {
      visibility: hidden;
      position: absolute;
      bottom: 20px;
      color: $negative;
      font-size: 11px;
    }
    .error-icon {
      visibility: hidden;
      position: absolute;
      top: 8px;
      right: 10px;
      .q-icon {
        line-height: 1;
        width: 1em;
        height: 1em;
        font-size: 24px;
      }
    }
    .q-field__native {
      padding: 6px 12px;
      border-radius: 12px;
      color: $primary;
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        border-radius: inherit;
      }
      &::before {
        border: 1px solid $separator-color;
        transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
      }
      &.StripeElement--focus:after {
        transform: scale3d(1, 1, 1);
        border: 2px solid currentColor;
        transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
      }
      &.StripeElement--invalid::after {
        transform: scale3d(1, 1, 1);
        border: 2px solid $negative;
        transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
}
</style>
