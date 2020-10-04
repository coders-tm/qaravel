<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :persistent="true"
  >
    <q-card class="q-dialog-plugin">
      <q-form
        @submit="onOKClick"
        @reset="onCancelClick"
      >
        <q-card-section class="q-pt-lg q-pl-lg q-pr-lg q-pb-xs ellipsis">
          <span class="text-h6">{{ title }}</span>
        </q-card-section>
        <q-card-section
          :class="'row scroll q-pl-lg q-pr-lg q-pb-none' +(title ? ' q-pt-none' : ' q-pt-sm')"
          :style="'max-height: calc(100vh - '+(title ? '164px' : '100px')+')'"
        >
          <template v-for="col in cols">
            <q-input
              :key="col.name"
              v-if="isInput(col.type)"
              :class="'col'+(col.classes ? ' '+col.classes : '')"
              :type="col.type == 'text' || !isPwd ? 'text' : col.type"
              :label="col.label"
              v-model="values[col.name]"
              color="blue-grey-14"
            >
              <template
                v-slot:append
                v-if="col.type == 'password'"
              >
                <q-icon
                  :name="isPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                  size="16px"
                />
              </template>
            </q-input>
          </template>
        </q-card-section>
        <q-card-actions
          align="right"
          class="q-pa-lg"
        >
          <q-btn
            square
            color="grey"
            label="Cancel"
            type="reset"
            class="q-pl-md q-pr-md"
          />
          <q-btn
            square
            label="Save"
            type="submit"
            color="green"
            class="q-pl-md q-pr-md"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { extend } from 'quasar'

export default {
  data () {
    return {
      values: {},
      isPwd: true
    }
  },
  props: {
    cols: { type: Array },
    data: { type: Object },
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      console.func('components/BaseAddEditDialog:methods.show()', arguments)
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      console.func('components/BaseAddEditDialog:methods.hide()', arguments)
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      console.func('components/BaseAddEditDialog:methods.onDialogHide()', arguments)
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      console.func('components/BaseAddEditDialog:methods.onOKClick()', arguments)
      this.$emit('ok', this.values)
    },

    onCancelClick () {
      console.func('components/BaseAddEditDialog:methods.onCancelClick()', arguments)
      // we just need to hide dialog
      this.hide()
    },
    isInput (type) {
      if (type === 'text') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    data () {
      this.values = this.data ? extend(true, {}, this.data) : {}
    }
  },
  mounted () {
    console.func('components/BaseAddEditDialog:mounted()', arguments)
    this.values = this.data ? extend(true, {}, this.data) : {}
  }
}
</script>
<style lang="sass">
.q-field__label
  font-size: 0.8rem !important
</style>
