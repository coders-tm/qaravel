<template>
  <div v-if="values">
    <q-toolbar class="permission-box bg-gm-blue text-white">
      <q-btn
        flat
        round
        dense
        :icon="data.icon"
      />
      <q-toolbar-title class="permission-title">
        {{ data.name }}
      </q-toolbar-title>
      <q-toggle
        v-if="edit===true"
        v-model="allValue"
        checked-icon="fal fa-check"
        color="white"
        unchecked-icon="fal fa-times"
        indeterminate-icon="fal fa-minus"
        icon-color="black"
      />
    </q-toolbar>
    <q-list
      bordered
      padding
    >
      <template v-for="action in data.permissions">
        <q-item
          tag="label"
          v-ripple
          :key="action.id"
          v-if="values && (values[action.id.toString()] === 1 || values[action.id.toString()] === 0 || values[action.id.toString()] === null)"
        >
          <q-item-section>
            <q-item-label>{{ action.action }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <permission-toggle
              v-if="edit===true"
              :value="values[action.id.toString()]"
              @input="input(action.id.toString(), $event)"
              checked-icon="fal fa-check"
              color="gm-pink"
              unchecked-icon="fal fa-times"
              toggle-indeterminate
              :true-value="1"
              :false-value="0"
            />
            <q-icon
              v-else
              :name="'fal fa-' + (values[action.id.toString()] === 1 ? 'check' : (values[action.id.toString()] === 0 ? 'times' : 'minus') )"
              :class="(values[action.id.toString()] === 1 ? 'text-gm-pink' : (values[action.id.toString()] === 0 ? 'text-gm-blue' : 'text-grey-4') )"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import PermissionToggle from './PermissionToggle'
export default {
  data () {
    return {
      allValue: null,
      values: null
    }
  },
  components: {
    PermissionToggle: PermissionToggle
  },
  props: {
    data: Object,
    index: String,
    value: Object,
    edit: Boolean
  },
  methods: {
    input: function (action, val) {
      this.values[action] = val
      this.$emit('input', this.values)
      this.setAllValue()
    },
    setAllValue: function () {
      const actionCount = this.data.permissions.length
      let tickCount = 0
      let crossCount = 0
      this.data.permissions.forEach((action, index) => {
        if (this.values[action.id.toString()] === 1) {
          tickCount++
        } else if (this.values[action.id.toString()] === 0) {
          crossCount++
        }
      })
      if (tickCount === actionCount) {
        this.allValue = true
      } else if (crossCount === actionCount) {
        this.allValue = false
      } else {
        this.allValue = null
      }
    }
  },
  watch: {
    allValue: {
      handler (val) {
        if (val === true) {
          this.data.permissions.forEach((action, index) => {
            this.values[action.id.toString()] = 1
          })
        } else if (val === false) {
          this.data.permissions.forEach((action, index) => {
            this.values[action.id.toString()] = 0
          })
        }
        this.$emit('input', this.values)
      }
    },
    value: {
      handler (val) {
        this.values = {}
        this.data.permissions.forEach((action, index) => {
          this.values[action.id.toString()] = this.value && this.value[action.id.toString()] === 1 ? 1 : (this.value && this.value[action.id.toString()] === 0 ? 0 : null)
        })
      },
      deep: true
    }
  },
  mounted () {
    console.func('components/PermissionBox:mounted()', arguments)
    this.values = {}
    this.data.permissions.forEach((action, index) => {
      this.values[action.id.toString()] = this.value && this.value[action.id.toString()] === 1 ? 1 : (this.value && this.value[action.id.toString()] === 0 ? 0 : null)
    })
    this.setAllValue()
  }
}
</script>
<style lang="sass">
.permission-box
  button
    font-size: 0.55rem
.q-toolbar
  .permission-title
    font-size: 0.85rem
</style>
