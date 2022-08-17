<template>
  <div>
    <template>
      <div>
        <q-dialog ref="edit" persistent>
          <q-card style="width: 700px; max-width: 95vw" class="no-scroll">
            <q-card-section class="text-h6">
              Edit #{{data.user.name}}
            </q-card-section>
            <q-card-section class="q-pt-none scroll" style="max-height: 64vh">
              <q-form
                @submit="onSubmitEdit"
                class="row q-col-gutter-sm"
              >
                <div class="col-xs-12 text-h6 text-grey">User info</div>
                <div class="col-xs-6">
                  <q-input v-model="data.user.name" type="text" label="Name" />
                </div>
                <div class="col-xs-6">
                  <q-input v-model="data.user.email" type="text" label="Email address" />
                </div>
                <div class="col-xs-12">
                  <q-select
                    v-model="data.user.roles"
                    use-chips
                    option-value="id"
                    option-label="name"
                    map-options
                    multiple
                    :options="data.roles"
                    label="Roles"
                  />
                </div>
                <div class="col-xs-12">
                  <div class="text-h6 q-mb-sm q-mt-sm text-grey">Permissions</div>
                  <div class="row q-col-gutter-md">
                    <div class="col-xs-12 col-sm-3" v-for="(permissions,index) in data.permissions" :key="index">
                      <div class="text-weight-bold">{{permissions.name}}</div>
                      <q-tree
                        :nodes="permissions.children"
                        node-key="id"
                        label-key="name"
                        tick-strategy="leaf"
                        :ticked.sync="data.user.permissions"
                        default-expand-all
                      />
                    </div>
                  </div>
                </div>
                <q-btn class="hidden" ref="submit" type="submit" />
              </q-form>
            </q-card-section>
            <q-card-section class="text-right">
              <div class="q-gutter-md">
                <q-btn color="negative" label="Close" v-close-popup no-caps/>
                <q-btn label="Update user" @click="$refs.submit.$el.click()" color="primary" no-caps/>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </template>
    <q-table
      class="br-0"
      :data="table.data"
      :columns="table.columns"
      flat
      :bordered="bordered"
      row-key="id"
      :hide-pagination="hidePagination"
      :rows-per-page-options="rowsPerPageOptions"
      :filter="filter"
      :pagination.sync="syncPagination"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="avatar" :props="props">
            <avatar :user="props.row" size="30px" />
          </q-td>
          <q-td key="user" :props="props">
            <q-item-label class="fw-600">{{ props.row.name }}</q-item-label>
            <q-item-label class="gt-sm" caption>ID: {{ props.row.id }} | Joined: {{ props.row.created_at }}</q-item-label>
            <q-item-label class="lt-md" caption>ID: {{ props.row.id }}</q-item-label>
            <q-item-label class="lt-md" caption>Joined: {{ props.row.created_at }}</q-item-label>
          </q-td>
          <q-td key="activity" :props="props">
            <div>Last Login</div>
            <div class="text-weight-bold">{{ props.row.created_at }}</div>
          </q-td>
          <q-td key="actions" class="text-right q-gutter-sm">
            <q-toggle v-if="actions.status" @input="updateUser(props.row)" v-model="props.row.active" size="20px" checked-icon="check" color="green" unchecked-icon="clear"></q-toggle>
            <q-btn v-if="actions.view" size="xs" dense flat color="primary" rounded no-caps icon="remove_red_eye"></q-btn>
            <q-btn v-if="actions.edit" size="xs" @click="onEdit(props.row)" dense flat color="primary" rounded no-caps icon="edit"></q-btn>
            <q-btn v-if="actions.delete" size="xs" @click="deleteUser(props.row)" dense flat color="primary" rounded no-caps icon="delete"></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      data: {
        user: {}
      }
    }
  },
  props: {
    table: {
      required: true,
      type: Object
    },
    pagination: {
      required: true,
      type: Object
    },
    actions: {
      required: false,
      type: Object,
      default () {
        return {
          status: true,
          view: true,
          edit: true,
          delete: true
        }
      }
    },
    hidePagination: {
      required: false,
      type: Boolean,
      default: () => false
    },
    rowsPerPageOptions: {
      required: false,
      type: Array,
      default: () => [15, 30, 50]
    },
    filter: {
      required: false,
      type: String,
      default: () => null
    },
    bordered: {
      required: false,
      type: Boolean,
      default: () => false
    },
    loading: {
      required: false,
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    ...mapActions('user', ['List', 'Show', 'Update']),
    onRequest (props) {
      this.$emit('request', props)
    },
    exportTable () {
      this.$core.export(this.table, 'users.csv')
    },
    onEdit (props) {
      this.Show(props.id).then(user => {
        this.data = user
        this.$refs.edit.show()
      })
    },
    onSubmitEdit () {
      this.Update(this.data.user).then(() => {
        this.$refs.edit.hide()
      })
    }
  },
  computed: {
    syncPagination: {
      get () {
        return this.pagination
      },
      set (val) {
        return val
      }
    }
  }
}
</script>
