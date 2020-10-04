<template>
  <q-table
    flat
    class="main-table"
    :title="title"
    :data="tableData"
    :columns="tableColumns"
    :loading="tableLoading"
    row-key="id"
    virtual-scroll
    :virtual-scroll-item-size="pagination.rowsPerPage"
    :virtual-scroll-sticky-size-start="pagination.rowsPerPage"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    @virtual-scroll="onScroll"
    binary-state-sort
    :filter="pagination.quickSearch"
    @request="onRequest"
    selection="multiple"
    :selected.sync="selected"
  >
    <template
      v-if="(toolbarActions && toolbarActions.length) || (toolbarBtnsSelected && toolbarBtnsSelected.length)"
      v-slot:top-left
    >
      <q-btn-group class="q-mr-sm" outline v-if="toolbarActions && toolbarActions.length">
        <template v-for="btn in toolbarActions">
          <q-btn
            :key="btn.name"
            squared
            :icon="btn.icon"
            :color="btn.color"
            @click="triggerToolbar(btn, selected)"
            size="10px"
            class="q-pa-sm"
            v-if="!btn.selected || (btn.selected && selected.length)"
          >
            <q-tooltip>
              {{ btn.label }}
            </q-tooltip>
          </q-btn>
        </template>
      </q-btn-group>
      <q-toggle
        v-model="deleted"
        checked-icon="delete"
        color="red"
        label="View Deleted"
      />
      <!-- <q-btn-group outline v-if="toolbarBtnsSelected && toolbarBtnsSelected.length && selected.length">
        <template v-for="btn in toolbarBtnsSelected">
          <q-btn
            :key="btn.name"
            squared
            :icon="btn.icon"
            :color="btn.color"
            @click="triggerToolbar(btn, selected)"
            size="10px"
            class="q-pa-sm"
          >
            <q-tooltip>
              {{ btn.label }}
            </q-tooltip>
          </q-btn>
        </template>
      </q-btn-group> -->
    </template>
    <template
      v-if="quickSearch"
      v-slot:top-right
    >
      <q-input
        v-bind="quickSearchInput"
        v-model="pagination.quickSearch"
        outlined
        square
      >
        <template v-slot:append>
          <q-icon
            v-if="pagination.quickSearch === ''"
            name="fal fa-search"
            size="14px"
          />
          <q-icon
            v-else
            name="fal fa-times"
            class="cursor-pointer"
            @click="pagination.quickSearch = ''"
            size="14px"
          />
        </template>
        <template
          v-if="searchFields"
          v-slot:hint
        >
          {{ searchFields }}
        </template>
      </q-input>
    </template>
    <template v-slot:bottom>
      <span>{{ loadedRows }}</span>
      <q-space />
      <span><strong>Total rows:</strong> {{ totalRows }}</span>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          flat
          icon="fal fa-ellipsis-h"
        >
          <q-menu
            self="top middle"
            dense
          >
            <q-list style="min-width: 100px">
              <q-item
                v-for="action in tableActions"
                :key="action.action"
                @click="triggerAction(action, props)"
                clickable
                v-close-popup
                class="q-pt-sm q-pb-sm text-weight-bold text-uppercase"
                style="font-size: 0.7rem"
              >
                <q-item-section>{{ action.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>
<script>
export default {
  data () {
    return {
      selected: [],
      nextPage: 2,
      title: null,
      finished: false,
      quickSearchInput: {
        'bottom-slots': !!this.searchFields,
        dense: true,
        debounce: 300,
        placeholder: 'Quick Search'
      },
      visibleColumns: ['title', 'first_name'],
      filterOpen: false,
      pagination: this.$store.getters[this.store + '/getPagination']
    }
  },
  props: {
    columns: Array,
    tabs: Array,
    pageRows: Number,
    requestData: Function,
    searchFields: String,
    quickSearch: Boolean,
    advancedFilter: Boolean,
    actions: Array,
    toolbar: Array,
    store: String,
    deletedView: Boolean
  },
  watch: {
    tableData: {
      handler () {
        this.$store.dispatch(this.store + '/setPagination', {
          totalRows: this.tableData.length,
          lastPage: Math.ceil(this.pagination.totalRows / this.pagination.rowsPerPage)
        })
      }
    },
    pagination: {
      handler (v) {
        this.$store.dispatch(this.store + '/setPagination', v)
      },
      deep: true
    },
    // columns: {
    //   handler () {
    //     if (this.actions && this.actions.length && this.columns[this.columns.length - 1].name !== 'actions') {
    //       this.columns.push({
    //         name: 'actions',
    //         field: 'actions',
    //         required: true,
    //         label: '',
    //         sortable: false,
    //         classes: 'table-row-actions',
    //         headerClasses: 'table-header-actions'
    //       })
    //     }
    //   }
    // },
    toolbar: {
      handler (val) {
        this.toolbarBtns = []
        if (this.toolbar && this.toolbar.length) {
          this.toolbar.forEach((btn) => {
            if (!btn.selected) {
              this.toolbarBtns.push(btn)
            } else {
              this.toolbarBtnsSelected.push(btn)
            }
          })
        }
        if (this.advancedFilter === true) {
          this.toolbarBtns.push(
            {
              name: 'applyFilter',
              label: 'Apply Filter',
              icon: 'fal fa-filter',
              color: 'grey-5'
            })
        }
      }
    }
  },
  mounted () {
    console.func('components/BaseTable:mounted()', arguments)
    this.pagination.totalRows = this.tableData.length
    this.pagination.rowsPerPage = this.pageRows ? this.pageRows : 100
    this.pagination.lastPage = Math.ceil(this.pagination.totalRows / this.pagination.rowsPerPage)

    this.onRequest()

    // if (this.actions && this.actions.length && this.columns && this.columns.length && this.columns[this.columns.length - 1].name !== 'actions') {
    //   this.columns.push({
    //     name: 'actions',
    //     field: 'actions',
    //     required: true,
    //     label: '',
    //     sortable: false,
    //     classes: 'table-row-actions',
    //     headerClasses: 'table-header-actions'
    //   })
    // }
  },
  methods: {
    async onScroll ({ to, ref }) {
      console.func('components/BaseTable:methods.onScroll()', arguments)
      const lastIndex = this.tableData.length - 1
      if (this.finished !== true && this.tableLoading !== true && this.pagination.page < this.pagination.lastPage && to === lastIndex) {
        this.$store.dispatch(this.store + '/setPagination', {
          page: this.pagination.page + 1
        })
        await this.$store.dispatch(this.store + '/getData', {
          page: this.pagination.page,
          sortBy: this.pagination.sortBy,
          sortDir: this.pagination.descending ? 'desc' : 'asc',
          quickSearch: this.pagination.quickSearch
        })
        ref.refresh()
        this.finished = false
      }
    },
    async onRequest (props) {
      console.func('components/BaseTable:methods.onRequest()', arguments)
      const { sortBy, descending, quickSearch } = (props ? props.pagination : {})

      this.pagination.page = 1
      if (sortBy) this.pagination.sortBy = sortBy
      if (descending) this.pagination.descending = descending
      if (quickSearch) this.pagination.quickSearch = quickSearch

      await this.$store.dispatch(this.store + '/getData', { page: this.pagination.page })
    },
    triggerToolbar (btn, selected) {
      console.func('components/BaseTable:methods.triggerToolbar()', arguments)
      if (btn.name === 'applyFilter') {
        console.log(this.$page)

        if (this.$page.table.filter) {
          this.$core.events.$emit('table:filter:hide')
        } else {
          this.$core.events.$emit('table:filter:show')
        }
      }
      this.$emit('toolbarClicked', btn.name, selected)
    },
    triggerAction (action, props) {
      console.func('components/BaseTable:methods.triggerAction()', arguments)
      this.$emit('actionClicked', action.action, props.row)
    }
  },
  computed: {
    loadedRows () {
      return this.tableData.length === 0 ? '' : `${this.tableData.length} record${this.tableData.length > 1 ? 's' : ''} loaded`
    },
    permissions: function () {
      return this.$store.getters['PageData/getPage'].permissions
    },
    selectedRows () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected`
    },
    tableActions () {
      return this.$store.getters[this.store + '/tableActions']
    },
    tableColumns () {
      return this.$store.getters[this.store + '/tableColumns']
    },
    tableData () {
      return this.$store.getters[this.store + '/tableData']
    },
    tableLoading () {
      return this.$store.getters[this.store + '/tableLoading']
    },
    toolbarActions () {
      return this.$store.getters[this.store + '/toolbarActions']
    },
    totalRows () {
      return this.tableData.length
    },
    deleted: {
      get () {
        return this.$store.getters[this.store + '/getDeleted']
      },
      set (value) {
        this.$store.dispatch(this.store + '/setDeleted', value)
      }
    }
  }
}
</script>
<style lang="sass">
.main-table
  max-height: 100%
  background: none
  .q-field--square .q-field__control
    background: #FFF
  .q-field--dense .q-field__bottom
    font-size: 10px
    padding: 5px 0 0 0
  thead,
  th
    font-weight: 700
    border-color: rgba(0, 0, 0, 0.4)
    background: #EDEDED
  .q-table__bottom
    font-size: 0.7rem
  thead tr th
    position: sticky
    z-index: 1
  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0
  .q-table__bottom
    border-top: 1px solid rgba(0, 0, 0, 0.4)

  .table-header-datetime,
  .table-row-datetime
    width: 120px
  .table-header-actions,
  .table-row-actions
    width: 40px
    text-align: center
  tbody
    background: #fff
    tr:nth-child(even)
      background-color: #F7F7F7
    tr td
      font-size: 0.72rem
</style>
