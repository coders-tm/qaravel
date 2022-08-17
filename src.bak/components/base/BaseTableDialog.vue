<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    ref="dialog"
    @hide="onDialogHide"
  >
    <div class="base-table-view">
      <q-bar class="bg-gm-blue text-white fixed-top toolbar q-pa-lg">
        <div
          v-if="title"
          class="text-weight-bold toolbar-top"
        >
          {{ title }}
        </div>
        <q-space />
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        >
          <q-tooltip content-class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-form
        @submit="onOKClick"
        @reset="onCancelClick"
        style="position:initial"
      >
        <div
          class="q-ma-sm"
          :style="{'margin-top': '70px', 'margin-bottom': edit ? '58px' : '8px'}"
        >
          <q-tabs
            v-model="currentTab"
            class="text-gm-blue q-mb-xs"
            style="background: #FFF"
            indicator-color="gm-pink"
          >
            <q-tab
              v-for="tab in dialogTabs"
              :name="tab.id"
              :label="tab.label"
              :key="tab.id"
            />
          </q-tabs>
          <q-tab-panels
            v-model="currentTab"
            animated
            swipeable
            horizontal
            transition-prev="fade"
            transition-next="fade"
            style="font-size: 0.8rem;"
          >
            <q-tab-panel
              v-for="tab in dialogTabs "
              :name="tab.id"
              class="q-pa-lg row q-col-gutter-sm"
              :key="tab.id"
            >
              <slot :name="'tab-panel-'+tab.id">
                <template v-if="tab.type === 'columns'">
                  <template v-for="column in tabColumns">
                    <base-field
                      v-if="column.tab === tab.id"
                      :label="column.label"
                      :key="column.name"
                      v-model="values[column.field]"
                      :type="column.type"
                      :class="column.classes"
                      :edit="edit"
                      :field="column.field"
                      :data="column.data"
                      :options="column.data && column.data.options && options && options[column.data.options] ? options[column.data.options] : []"
                      @input="onUpdateField(column, $event)"
                    />
                  </template>
                </template>
                <template v-else-if="tab.type === 'permissions' && options && options.permissions && values && values['PermissionsData']">
                  <!-- <div class="col-xs-12">
                    <q-toolbar class="bg-gm-pink text-white shadow-2">
                      <q-btn
                        flat
                        round
                        dense
                        icon="fal fa-lock-open-alt"
                      />
                      <q-toolbar-title>
                        All Permissions
                      </q-toolbar-title>
                      <q-toggle
                        v-model="allValue"
                        checked-icon="fal fa-check"
                        color="white"
                        unchecked-icon="fal fa-times"
                        indeterminate-icon="fal fa-minus"
                        icon-color="black"
                      />
                    </q-toolbar>
                  </div> -->
                  <template v-for="permission in options.permissions">
                    <permission-box
                      :key="permission.slug"
                      :data="permission"
                      :index="permission.slug"
                      :edit="edit"
                      v-model="values['PermissionsData'][permission.slug]"
                      class="col-xs-12 col-md-6 col-lg-4 col-xl-3"
                    />
                  </template>
                </template>
                <template v-else-if="tab.type === 'contacts'">
                  <contact-list :contactList="values.contacts"></contact-list>
                </template>
                <template v-else-if="tab.type === 'locations'">
                  <location-list :locationList="values.locations"></location-list>
                </template>
              </slot>
            </q-tab-panel>
          </q-tab-panels>
          <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        </div>
        <q-toolbar
          v-if="edit"
          class="absolute-bottom"
        >
          <q-space />
          <q-btn
            square
            color="grey"
            label="Cancel"
            @click="hide()"
            class="q-pl-md q-pr-md q-mr-sm"
          />
          <q-btn
            square
            label="Save"
            type="submit"
            color="green"
            class="q-pl-md q-pr-md"
          />
        </q-toolbar>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      currentTab: null,
      splitterModel: 20,
      image1: false,
      image2: false,
      values: {
        permissions: {}
      },
      allValue: null
    }
  },
  props: {
    id: Number,
    title: {
      type: String,
      default: ''
    },
    store: String,
    defaultTab: String,
    edit: Boolean
  },
  methods: {
    open (data) {
      this.data = data
      this.dialog = true
    },

    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      console.func('components/BaseTableDialog:methods.show()', arguments)
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      console.func('components/BaseTableDialog:methods.hide()', arguments)
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      console.func('components/BaseTableDialog:methods.onDialogHide()', arguments)
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      console.func('components/BaseTableDialog:methods.onOKClick()', arguments)
      this.$emit('ok', this.values)
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    },

    onUpdateField (field, value) {
      console.log('field', field)
      console.log('value', value)
    }
  },
  async mounted () {
    console.func('components/BaseTableDialog:mounted()', arguments)
    this.loading = true
    var itemData = {}
    if (this.id) {
      itemData = await this.$store.dispatch(this.store + '/getItem', { id: this.id })
    }
    await this.$store.dispatch(this.store + '/getOptions')
    this.loading = false

    this.values = Object.assign({}, itemData.data)
    this.values.PermissionsData = this.values.PermissionsData ? this.values.PermissionsData : {}

    this.currentTab = this.currentTab || this.defaultTab
  },
  computed: {
    dialogColumns () {
      return this.$store.getters[this.store + '/' + (this.edit ? (this.id ? 'edit' : 'add') : 'view') + 'Columns']
    },
    tabColumns () {
      return this.dialogColumns && this.dialogColumns.length ? this.dialogColumns.filter((col) => {
        return col.tab === this.currentTab
      }) : []
    },
    dialogTabs () {
      return this.$store.getters[this.store + '/' + (this.edit ? (this.id ? 'edit' : 'add') : 'view') + 'Tabs']
    },
    options () {
      return this.$store.getters[this.store + '/getOptions']
    }
  },
  components: {
    PermissionBox: require('./PermissionBox').default,
    ContactList: require('./ContactList').default,
    LocationList: require('./ContactLocationList').default
  }
}
</script>
<style lang="sass">
.q-tabs
  .q-tab__label
    font-size: 0.7rem !important
    font-weight: bold
.q-dialog .base-table-view
  background: #e6e6e6
.q-dialog .toolbar
  z-index: 1000
.toolbar
  .toolbar-top
    font-size: 0.85rem
</style>
