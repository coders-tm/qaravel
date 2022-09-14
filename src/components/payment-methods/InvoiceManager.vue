<template>
  <q-card class="invoice-manager">
    <q-card-section class="invoice-manager-section">
      <div class="text-h6">Invoices</div>
      <div class="q-my-md">
        <q-table
          flat
          :rowsPerPageOptions="[0]"
          :rows="invoices"
          :columns="columns"
          no-data-label="There are no invoices!"
          v-model:pagination="pagination"
          @request="onRequest"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <base-btn
                link
                color="grey"
                outline
                @click="onViewInvoice(props.row)"
                label="View invoice"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useSubscriptionStore } from 'stores/subscription';
import PdfViewer from 'components/PdfViewer.vue';

export default {
  data() {
    return {
      columns: [
        {
          name: 'date',
          label: 'Date',
          field: 'date',
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          align: 'left',
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
          align: 'right',
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
    };
  },
  methods: {
    ...mapActions(useSubscriptionStore, ['getInvoices', 'downloadInvoice']),
    onRequest(args) {
      console.func('components/payment-methods/InvoiceManager:methods.onRequest()', arguments);
      this.loading = true;
      const { page, rowsPerPage } = args.pagination;
      this.getInvoices({
        page: page,
        limit: rowsPerPage,
      })
        .then((response) => {
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = response.total;

          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.from = response.from;
          this.pagination.to = response.to;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },
    onViewInvoice(args) {
      console.func('components/payment-methods/InvoiceManager:methods.onViewInvoice()', arguments);
      this.downloadInvoice(args.id)
        .then((data) => {
          const blob = new Blob([data], { type: 'application/pdf' });

          this.$q
            .dialog({
              component: PdfViewer,
              componentProps: {
                title: `invoice_${args.id}.pdf`,
                url: URL.createObjectURL(blob),
              },
            })
            .onOk((playload) => {
              URL.revokeObjectURL(playload);
            });
        })
        .catch((error) => {
          this.$core.error(error, { title: 'Error' });
        });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
    });
  },
  computed: {
    ...mapState(useSubscriptionStore, ['invoices']),
  },
};
</script>
