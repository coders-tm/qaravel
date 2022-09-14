<template>
  <q-radio
    dense
    class="payment-method-card"
    :modelValue="modelValue"
    :val="id"
    @update:model-value="(val) => $emit('update:model-value', val)"
  >
    <q-card :flat="flat" :bordered="bordered">
      <q-card-section>
        <div class="text-h6">{{ card_number }}</div>
        <div class="">Expires: {{ exp_date }}</div>
        <div class="actions">
          <q-btn
            @click="$emit('pay')"
            :loading="processing"
            v-show="id === modelValue"
            color="primary"
            no-caps
            class="full-width q-mt-lg"
            icon="far fa-credit-card"
            :label="`Pay ${$core.money(amount)}`"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-radio>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    id: String,
    card_number: String,
    exp_date: String,
    amount: [String, Number],
    processing: Boolean,
    flat: Boolean,
    bordered: Boolean,
  },
  emits: ['update:model-value', 'pay'],
};
</script>
