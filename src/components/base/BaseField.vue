<template>
  <div v-if="edit">
    <q-input
      :key="field"
      v-if="isInput"
      :type="inputType"
      :label="label"
      v-model="inputValue"
      color="blue-grey-14"
    >
      <template
        v-slot:append
        v-if="type == 'password'"
      >
        <q-icon
          :name="isPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
          size="16px"
        />
      </template>
    </q-input>

    <q-input v-else-if="type=='date'" v-model="inputValue" :key="field" mask="##/##/####" >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy :ref="'ds_'+field" transition-show="scale" transition-hide="scale">
            <q-date v-model="inputValue" @input="$core.closeDate($refs)" mask="DD/MM/YYYY" color="gm-pink" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-else-if="type=='time'" v-model="inputValue" :key="field" mask="time">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy :ref="'ds_'+field" transition-show="scale" transition-hide="scale">
            <q-time v-model="inputValue" @input="$core.closeDate($refs)" format24h color="gm-pink" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-else-if="type=='datetime'" v-model="inputValue" :key="field">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy :ref="'ds_'+field+'_date'" transition-show="scale" transition-hide="scale">
            <q-date v-model="inputValue" @input="$core.closeDate($refs)" mask="DD/MM/YYYY HH:mm" color="gm-pink" />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy :ref="'ds_'+field+'_time'" transition-show="scale" transition-hide="scale">
            <q-time v-model="inputValue" @input="$core.closeDate($refs)" mask="DD/MM/YYYY HH:mm" format24h color="gm-pink" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      v-else-if="type=='color'"
      :key="field"
      v-model="inputValue"
      :rules="['anyColor']"
      :label="label"
    >
      <template v-slot:prepend>
        <q-icon name="fal fa-hashtag" />
      </template>
      <template v-slot:append>
        <q-icon
          name="colorize"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-color
              v-model="inputValue"
              format-model="hex"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      v-else-if="type=='currency'"
      :key="field"
      v-model="inputValue"
      type="number"
      step="0.01"
      :label="label"
    >
      <template v-slot:prepend>
        <q-icon name="fal fa-pound-sign" />
      </template>
    </q-input>

    <q-select
      v-else-if="type=='select'"
      :key="field"
      v-model="inputValue"
      :options="options"
      :label="label"
      v-bind="select"
    />

    <q-input
      v-else-if="type=='textarea'"
      :key="field"
      v-model="inputValue"
      autogrow
      :label="label"

    >
    </q-input>

    <q-checkbox
      v-else-if="type=='checkbox'"
      :key="field"
      v-model="inputValue"
      :label="label"
      color="gm-pink"
      :true-value="1"
      :false-value="0"
      />

    <template v-else-if="type=='radio' && options && options.length">
      <q-radio v-model="inputValue" v-for="option in options" :key="option.value" :val="option.value.toString()" :label="option.label" color="gm-pink" />
    </template>

    <!-- <v-image-input
      v-model="imageData"
      :image-quality="0.85"
      clearable
      image-format="jpeg"
      uploadIcon="fal fa-upload"
    /> -->
  </div>
  <label
    class="q-field row items-start q-field--float q-field--labeled q-field--standard"
    v-else
  >
    <div class="q-field__inner relative-position col self-stretch column justify-center">
      <div
        class="relative-position row"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.24); transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);"
      >
        <div
          v-if="preIcon"
          class="q-field__prepend q-field__marginal row no-wrap items-center"
        >
          <q-icon
            :name="preIcon.name"
            :style="preIcon.style"
          />
        </div>
        <div class="q-field__control-container col relative-position row q-anchor--skip">
          <div class="q-field__native text">{{ displayValue }}</div>
          <div class="q-field__label no-pointer-events absolute ellipsis">{{ label }}</div>
        </div>
        <div
          v-if="postIcon"
          class="q-field__append q-field__marginal row no-wrap items-center"
        >
          <q-btn
            v-if="postIcon.link"
            flat
            :icon="postIcon.name"
            type="a"
            :href="postIcon.link"
            padding="none"
          />
          <q-icon
            v-else
            :name="postIcon.name"
            :style="postIcon.style"
          />
        </div>
      </div>
    </div>
  </label>
</template>

<script>
import VImageInput from 'vuetify-image-input'

export default {
  // name: 'ComponentName',
  components: {
    [VImageInput.name]: VImageInput
  },
  data () {
    return {
      inputValue: this.value,
      isPwd: true,
      imageData: null,
      select: {
        'emit-value': true,
        'map-options': true,
        multiple: !!(this.data && this.data.multiple),
        'use-chips': !!(this.data && this.data.multiple)
      }
    }
  },
  props: {
    label: String,
    type: String,
    field: String,
    value: {
      required: true
    },
    edit: Boolean,
    data: Object,
    options: {
      type: Array,
      required: false,
      default: null
    }
  },
  methods: {
  },
  computed: {
    isInput () {
      if (this.type === 'text' || this.type === 'password' || this.type === 'password_confirmation' || this.type === 'email' || this.type === 'phone' || (this.type === 'currency' && !this.edit)) {
        return true
      } else {
        return false
      }
    },
    inputType () {
      if (this.type === 'password' || this.type === 'password_confirmation') {
        return this.isPwd ? 'password' : 'text'
      } else {
        return this.type
      }
    },
    preIcon () {
      switch (this.type) {
        case 'currency':
          return { name: 'fal fa-pound-sign' }
        default:
          return null
      }
    },
    postIcon () {
      switch (this.type) {
        case 'color':
          return { name: 'fas fa-square-full', style: { color: this.value } }

        case 'email':
          return { name: 'fal fa-envelope', link: 'mailto:' + this.value }

        case 'phone':
          return { name: 'fal fa-phone', link: 'tel:' + this.value }

        default:
          return null
      }
    },
    displayValue () {
      switch (this.type) {
        case 'checkbox':
          return parseInt(this.value) ? 'Yes' : 'No'
        case 'select':
        case 'radio':
          if (this.data && this.data.multiple) {
            return this.value && typeof this.value === 'object' ? this.value.map(val => this.options.filter(v => val === v.value).map(v => v.label)[0]).join(', ') : ''
          } else {
            return this.value ? this.options.filter(v => this.value.toString() === v.value.toString()).map(v => v.label)[0] : ''
          }
        default:
          return this.value
      }
    }
  },
  mounted () {
    // console.log('options', this.options)
  },
  watch: {
    inputValue () {
      this.$emit('input', this.inputValue)
    }
  }
}
</script>
<style lang="sass" scoped>
.text
  white-space: pre-line
</style>
