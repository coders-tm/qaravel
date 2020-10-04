<template>
  <div>
    <div class="text-h6">Contacts</div>
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
  name: 'ContactList',
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
        { name: 'first_name', label: 'First Name', field: 'first_name' },
        { name: 'surname', label: 'Surname', field: 'surname' },
        { name: 'role', label: 'Role', field: 'role' },
        { name: 'email_address', label: 'Email', field: 'email_address', sortable: true },
        { name: 'contact_number', label: 'Contact Number', field: 'contact_number', sortable: true },
        { name: 'location', label: 'Location', field: 'location', sortable: true },
        { name: 'default', label: 'Default Contact?', field: 'default', sortable: true },
        { name: 'accounts', type: 'select', label: 'Accounts Contact?', field: 'accounts', sortable: true, data: { options: 'yesnoselect', multiple: false } },
        { name: 'deleteButton', label: '' }
      ],
      data: this.contactList
    }
  },
  props: {
    contactList: Array
  },
  methods: {
    async actionClicked (action, row) {
      switch (action) {
        case 'delete':
          this.deleteContact(row.id)
          this.loading = false
          break
      }
    },
    async toolbarClicked (btn, selected) {
      console.func('pages/admin/prospects/CustomerList:methods.toolbarClicked()', arguments)
      const customers = await this.$api.customers()

      switch (btn) {
        case 'deleteContacts':
          this.$core.confirm('Are you sure you want to delete the ' + selected.length + ' selected customer' + (selected.length > 1 ? 's' : '') + '?').then(() => {
            this.loading = true
            customers.customer.deleteSelected(selected)
              .then(data => {
                // Remove from table
                this.customerData = this.customerData.filter((row) => {
                  return !selected.map((selectedRow) => { return selectedRow.id }).includes(row.id)
                })
                this.loading = false
              })
              .catch(error => {
                this.$core.error(error.message)
                this.loading = false
              })
          })
          break
      }
    },
    deleteContact (contactID) {
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
            for (const [key, contact] of Object.entries(this.contactList)) {
              if (contact.id === contactID) {
                console.log(key)
                this.contactList.splice(this.contactList.indexOf(contact), 1)
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
    this.options.yesnoselect = [{ value: 1, label: 'Yes' }, { value: 0, label: 'No' }]
  }
}

</script>

<style scoped>

</style>
