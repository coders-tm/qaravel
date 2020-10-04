<template>
  <q-drawer
    side="right"
    v-model="$page.table.filter"
    :width="300"
    content-class="bg-grey-3"
  >
    <q-toolbar :style="themeData.bgSecondary">
      <q-toolbar-title>
        Filter
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="fal fa-times"
        @click="$store.commit('PageData/updatePage', { table: { filter: false } })"
      />
    </q-toolbar>
    <q-scroll-area
      class="fit"
      :style="'height: calc(100% - 122px)!important'"
    >
      <p class="text-body2 q-pa-sm">
        Each filter group acts as an "OR" so if a fan matches all the criteria in any of the filter groups it will display. Each element within a filter group acts as an "AND" which means a fan must match all the criteria in the group for the group to be classed as a match.
      </p>
      <q-list>
        <q-expansion-item
          group="top-level-menu"
          icon="fal fa-filter"
          label="Filter 1"
          expand-icon="fal fa-angle-down"
        >
          <q-list class="q-pl-sm q-pr-sm">
            <q-item>
              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">First Name</span>
                </q-item-label>
                <q-item-label
                  caption
                  lines="1"
                >
                  <q-select
                    v-model="model"
                    :options="options"
                    dense
                    label="Standard"
                  />
                </q-item-label>
                <q-item-label
                  lines="1"
                  class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
                >
                  <span class="cursor-pointer">Open in GitHub</span>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="fal fa-trash"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-item class="q-mb-xs">
              <q-item-section top>
                <q-input
                  dense
                  stack-label
                  v-model="text"
                  label="First Name"
                />
                <q-select
                  v-model="model"
                  :options="options"
                  dense
                />
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="fal fa-trash"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              to="/portal/config/global"
              v-ripple
            >
              <q-item-section>
                <q-item-label>First Name</q-item-label>
              </q-item-section>
              <q-item-section side>
                =
              </q-item-section>
              <q-item-section side>
                <q-item-label>First Name>FirstdddName>First Name>First Name>First Name>First Name>First Name>First Name</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item
          group="top-level-menu"
          icon="fal fa-cog"
          label="Configuration"
          header-class="text-club-secondary"
          expand-icon="fal fa-angle-down"
        >
          <q-list class="q-pl-md">
            <q-item
              clickable
              to="/portal/config/global"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fal fa-globe" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Global</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              to="/portal/config/frm"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fal fa-scarf" />
              </q-item-section>
              <q-item-section>
                <q-item-label>FRM</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              to="/portal/config/ticketing"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fal fa-ticket-alt" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ticketing</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
    <div class="absolute-bottom">
      <q-btn-group
        spread
        class="q-ma-xs"
      >
        <q-btn
          @click="$core.openURL('https://sportals.online')"
          :style="themeData.bgPrimary"
          label="Add Group"
        />
        <q-btn
          @click="$core.openURL('https://sportals.online')"
          :style="themeData.bgSecondary"
          label="Save Filter"
        />
      </q-btn-group>
      <q-btn-group
        spread
        class="q-ma-xs"
      >
        <q-btn
          @click="$core.openURL('https://sportals.online')"
          :style="themeData.bgPrimary"
          label="Apply Filter"
        />
        <q-btn
          @click="$core.openURL('https://sportals.online')"
          :style="themeData.bgSecondary"
          label="Reset Filter"
        />
      </q-btn-group>
    </div>
  </q-drawer>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      filterOpen: false
    }
  },
  props: {
    value: Boolean
  },
  computed: {
    themeData: function () {
      return this.$store.getters['ThemeData/getTheme']
    }
  },
  created () {
    this.$core.events.$on('table:filter:show', this.show)
    this.$core.events.$on('table:filter:hide', this.hide)
  },
  destroyed () {
    this.$core.events.$off('table:filter:show', this.show)
    this.$core.events.$off('table:filter:hide', this.hide)
  },
  methods: {
    show () {
      console.func('components/BaseTableFilter:methods.show()', arguments)
      this.filterOpen = true
      this.$store.commit('PageData/updatePage', { table: { filter: true } })
    },
    hide () {
      console.func('components/BaseTableFilter:methods.hide()', arguments)
      this.filterOpen = false
      this.$store.commit('PageData/updatePage', { table: { filter: false } })
    },
    getState () {
      console.func('components/BaseTableFilter:methods.getState()', arguments)
      return this.filterOpen ? 'open' : 'closed'
    }
  }
}
</script>
<style lang="sass">
//.q-item
//  border: 1px solid rgba(0, 0, 0, 0.4)
</style>
