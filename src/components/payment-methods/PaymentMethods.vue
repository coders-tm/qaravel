<template>
  <q-card class="payment-methods">
    <q-card-section class="payment-methods-section">
      <div class="text-h6">Payment methods</div>
      <div class="q-my-md">
        <q-table
          flat
          hide-bottom
          hide-pagination
          :rowsPerPageOptions="[0]"
          :rows="paymentMethods"
          :columns="columns"
          no-data-label="There are no payment methods registered!"
        >
          <template v-slot:body-cell-card_number="props">
            <q-td :props="props">
              {{ props.value }}
              <q-badge v-if="props.row.default" label="Default" />
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn round flat dense icon="fal fa-ellipsis-h" @click.stop>
                <q-menu dense>
                  <q-list class="q-pa-sm" dense style="min-width: 150px">
                    <base-item
                      v-show="!props.row.default"
                      @click="onDefaultPaymentMethod(props.row)"
                      label="Mark as Default"
                    />
                    <base-item @click="onRemovePaymentMethod(props.row)" label="Remove" />
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="text-right">
        <base-btn
          v-if="isSubscribed"
          @click="onAddPaymentMethod"
          class="main-btn"
          color="primary"
          label="Add payment method"
        />
        <base-btn
          v-else
          @click="onAddPaymentMethodAndSubscribe"
          class="main-btn"
          color="primary"
          label="Add payment method"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAppStore } from 'stores/app';
import { useSubscriptionStore } from 'stores/subscription';
import AddPaymentMethod from './AddPaymentMethod.vue';
import ManageSubscription from '../ManageSubscription.vue';

export default {
  data() {
    return {
      columns: [
        {
          name: 'card_number',
          label: 'Card Number',
          field: 'card_number',
          align: 'left',
        },
        {
          name: 'brand',
          label: 'Card Type',
          field: 'brand',
          align: 'left',
          format: (val) => this.$core.capitalize(val),
        },
        {
          name: 'exp_date',
          label: 'Expiry Date',
          field: 'exp_date',
          align: 'left',
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
          align: 'right',
        },
      ],
    };
  },
  methods: {
    ...mapActions(useAppStore, ['currentUser']),
    ...mapActions(useSubscriptionStore, [
      'getPaymentMethods',
      'defaultPaymentMethod',
      'addPaymentMethod',
      'removePaymentMethod',
    ]),
    onAddPaymentMethod(args) {
      console.func(
        'components/payment-methods/PaymentMethods:methods.onAddPaymentMethod()',
        arguments
      );
      this.$q
        .dialog({
          component: AddPaymentMethod,
        })
        .onOk(({ payment_method, is_deafult, card, hide }) => {
          const { last4 } = card;
          this.addPaymentMethod({
            payment_method: payment_method,
            last_four_digit: last4,
            is_deafult: is_deafult,
          })
            .then(({ message }) => {
              hide();
              this.getPaymentMethods();
              this.$core.success(message, { title: 'Success' });
            })
            .catch((error) => {
              this.$core.error(error, { title: 'Error' });
            });
        });
    },
    onRemovePaymentMethod(args) {
      console.func(
        'components/payment-methods/PaymentMethods:methods.onRemovePaymentMethod()',
        arguments
      );
      this.$core.confirm(`Are you sure you want to remove?`).then(() => {
        this.removePaymentMethod(args.id)
          .then(({ message }) => {
            this.getPaymentMethods();
            this.$core.success(message, { title: 'Success' });
          })
          .catch((error) => {
            this.$core.error(error, { title: 'Error' });
          });
      });
    },
    onDefaultPaymentMethod(args) {
      console.func(
        'components/payment-methods/PaymentMethods:methods.onDefaultPaymentMethod()',
        arguments
      );
      this.defaultPaymentMethod(args.id)
        .then(({ message }) => {
          this.getPaymentMethods();
          this.$core.success(message, { title: 'Success' });
        })
        .catch((error) => {
          this.$core.error(error, { title: 'Error' });
        });
    },
    onAddPaymentMethodAndSubscribe() {
      console.func(
        'components/payment-methods/PaymentMethods:methods.onAddPaymentMethodAndSubscribe()',
        arguments
      );
      this.$q
        .dialog({
          component: ManageSubscription,
          componentProps: {
            plan: this.currentPlan,
            create: true,
          },
        })
        .onOk(() => {
          this.getPaymentMethods();
        });
    },
  },
  mounted() {
    this.getPaymentMethods();
  },
  computed: {
    ...mapState(useSubscriptionStore, ['paymentMethods', 'subscription']),
    ...mapState(useAppStore, ['currentPlan', 'isSubscribed']),
  },
};
</script>
