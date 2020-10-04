<template>
  <q-page padding>
    <q-card bordered flat class="bg-white-4">
      <q-card-section class="row">
        <div class="col-sm-5 col-xs-12 self-center">
          <div class="text-h6">All Users</div>
        </div>
        <div class="col-sm-7 col-xs-12 text-right">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-6 col-xs-12 self-center">
              <div class="q-gutter-sm">
                <q-btn color="primary" @click="$refs.users.exportTable()" flat round icon="archive">
                  <tooltip position="top">Export to csv</tooltip>
                </q-btn>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12">
              <q-input outlined dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <users
          ref="users"
          class="full-width"
          :filter="filter"
          :table="users"
          :hidePagination="false"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      filter: '',
      loading: false,
      users: {
        columns: [
          { name: 'avatar', align: 'left', label: 'Avatar' },
          { name: 'user', align: 'left', label: 'User' },
          { name: 'activity', align: 'left', label: 'Activity' },
          { name: 'actions', align: 'right' }
        ],
        data: []
      },
      pagination: {
        sortBy: 'created_at',
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      }
    }
  },
  methods: {
    ...mapActions('user', ['List']),
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      this.loading = true

      this.List({
        page: page,
        limit: rowsPerPage,
        filter: props.filter,
        order: sortBy,
        descending: descending ? 'desc' : 'asc'
      }).then(response => {
        // clear out existing data and add new
        this.users.data = this.$_.clone(Object(this.$store.state.user.data.data))
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = response.total

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      })
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: this.filter
    })
  }
}
</script>
