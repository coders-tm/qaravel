<template>
  <div>
    <div class="text-h6">Contact Locations</div>
    <base-table
      :loading="loading"
      :columns="columns"
      :data="data"
      :total-rows="totalRows"
      :page-rows="100"
      :quick-search="false"
      :actions="actions"
      :toolbar="toolbar"
      :advanced-filter="false"
      @actionClicked="actionClicked"
      @toolbarClicked="toolbarClicked"
    />
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  name: 'ContactLocationList',
  data () {
    return {
      token: this.$store.getters['SessionData/getToken'],
      actions: [
        { label: 'Delete', action: 'delete' }
      ],
      totalRows: 0,
      colsEdit: [],
      toolbar: [
      ],
      loading: false,
      options: {},
      columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
        { name: 'label', label: 'Label', field: 'label', sortable: true },
        { name: 'address_line_1', label: 'Address 1', field: 'address_line_1' },
        { name: 'address_line_2', label: 'Address 2', field: 'address_line_2' },
        { name: 'address_line_3', label: 'Address 3', field: 'address_line_3' },
        { name: 'address_city', label: 'City', field: 'address_city', sortable: true },
        { name: 'address_county', label: 'County', field: 'address_county', sortable: true },
        { name: 'address_postcode', label: 'Postcode', field: 'address_postcode', sortable: true },
        { name: 'address_country', label: 'Address Country', field: 'address_country', sortable: true },
        { name: 'default', type: 'select', label: 'Default Contact?', field: 'default', sortable: true, data: { options: 'yesnoselect', multiple: false } },
        { name: 'accounts', type: 'select', label: 'Accounts Contact?', field: 'accounts', sortable: true, data: { options: 'yesnoselect', multiple: false } },
        { name: 'deleteButton', label: '' }
      ],
      data: this.locationList
    }
  },
  props: {
    locationList: Array
  },
  methods: {
    async actionClicked (action, row) {
      switch (action) {
        case 'delete':
          this.deleteLocation(row.id)
          this.loading = false
          break
      }
    },
    async toolbarClicked (btn, selected) {
      console.func('pages/admin/prospects/CustomerList:methods.toolbarClicked()', arguments)
      // const customers = await this.$api.customers()

      // switch (btn) {
      //   case 'deleteLocations':
      //     this.$core.confirm('Are you sure you want to delete the ' + selected.length + ' selected customer' + (selected.length > 1 ? 's' : '') + '?').then(() => {
      //       this.loading = true
      //       customers.customer.deleteSelected(selected)
      //         .then(data => {
      //           // Remove from table
      //           this.customerData = this.customerData.filter((row) => {
      //             return !selected.map((selectedRow) => { return selectedRow.id }).includes(row.id)
      //           })
      //           this.loading = false
      //         })
      //         .catch(error => {
      //           this.$core.error(error.message)
      //           this.loading = false
      //         })
      //     })
      //     break
      // }
    },
    deleteLocation (contactID) {
      console.log(contactID)
      this.$core.confirm('Are you sure you want to delete this contact?').then(() => {
        this.loading = true
        this.$core.remote.delete('/customer-contacts/' + contactID, {}, {
          loading: true,
          headers: { 'content-type': 'application/json' }
        })
          .then(data => {
            Notify.create({ type: 'positive', message: 'Contact deleted' })
            this.$emit('input', contactID)
            for (const [key, contact] of Object.entries(this.locationList)) {
              if (contact.id === contactID) {
                console.log(key)
                this.locationList.splice(this.locationList.indexOf(contact), 1)
                this.loading = false
              }
            }
          })
          .catch(err => {
            console.error(err)
            Notify.create({ type: 'negative', message: 'Contact Failed to delete' })
          })
      })
    }
  },
  mounted () {
    console.log('xxxx', this.locationList)
    this.options.yesnoselect = [{ value: 1, label: 'Yes' }, { value: 0, label: 'No' }]
  }
}

</script>

<style scoped>

</style>
