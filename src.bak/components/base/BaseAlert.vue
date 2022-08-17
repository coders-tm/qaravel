<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-item-section
        v-if="icon"
        class="text-center"
      >
        <div class="sa">
          <div
            class="sa-error"
            v-if="isIcon('error')"
          >
            <div class="sa-error-x">
              <div class="sa-error-left" />
              <div class="sa-error-right" />
            </div>
            <div class="sa-error-placeholder" />
            <div class="sa-error-fix" />
          </div>

          <div
            class="sa-warning"
            v-else-if="isIcon('warning')"
          >
            <div class="sa-warning-body" />
            <div class="sa-warning-dot" />
          </div>

          <div
            class="sa-info"
            v-else-if="isIcon('info')"
          >
            <div class="sa-info-body" />
            <div class="sa-info-dot" />
          </div>

          <div
            class="sa-loading"
            v-else-if="isIcon('loading')"
          >
            <div class="sa-loading-body" />
          </div>

          <div
            class="sa-success"
            v-else-if="isIcon('success')"
          >
            <div class="sa-success-tip" />
            <div class="sa-success-long" />
            <div class="sa-success-placeholder" />
            <div class="sa-success-fix" />
          </div>
        </div>
      </q-item-section>
      <q-card-section
        v-if="title"
        class="text-center"
      >
        <div
          class="text-h6"
          v-if="title"
        >
          {{ title }}
        </div>
        <div
          class="text-subtitle2"
          v-if="subTitle"
        >
          {{ subTitle }}
        </div>
      </q-card-section>
      <q-card-section :class="typeof msg==='string' || (msg.length===1 && typeof msg[0]==='string') ? 'text-center' : ''">
        <span v-if="typeof msg==='string'">{{ msg }}</span>
        <span v-else-if="msg.length===1 && typeof msg[0]==='string'">{{ msg[0] }}</span>
        <template v-else>
          <q-list
            bordered
            separator
          >
            <q-item
              v-for="(m, idx) in msg"
              :key="idx"
            >
              <q-item-section avatar>
                <q-icon
                  v-if="m.icon"
                  :color="m.color ? m.color : ''"
                  :name="'fal fa-'+m.icon"
                />
              </q-item-section>
              <q-item-section>{{ m.text }}</q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions
        align="around"
        class="q-pa-lg"
      >
        <q-btn
          v-if="cancel"
          flat
          color="grey"
          :label="cancel.label"
          @click="onCancelClick"
        />
        <q-btn
          flat
          color="positive"
          :label="ok.label"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const availableIcons = ['success', 'warning', 'error', 'info', 'loading', 'none']
export default {
  data () {
    return {
      msgKey: 0
    }
  },
  props: {
    icon: {
      type: String,
      default: 'none',
      validator: (value) => {
        return availableIcons.indexOf(value) !== -1
      }
    },
    msg: {},
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    ok: { type: Object, default: () => { return { label: 'Ok' } } },
    cancel: { type: Object }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      console.func('components/BaseAlert:methods.show()', arguments)
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      console.func('components/BaseAlert:methods.hide()', arguments)
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      console.func('components/BaseAlert:methods.onDialogHide()', arguments)
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      console.func('components/BaseAlert:methods.onOKClick()', arguments)
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      console.func('components/BaseAlert:methods.onCancelClick()', arguments)
      this.$emit('cancel')
      // we just need to hide dialog
      this.hide()
    },

    isIcon (icon) {
      console.func('components/BaseAlert:methods.isIcon()', arguments)
      return icon === this.icon
    }
  }
}
</script>
<style scoped lang="scss">
/**
     * Credits
     *
     * @link https://sweetalert.js.org/
     * @link https://vuejsfeed.com/blog/codepen-collection-sweetalert-icons-with-animations
    */
body {
  // Background used as an overlay for certain animations.
  // Should be set to the same colour as the background of your containing element.
  // If unsure, leave as transparent.
  --sweetalert-icons-animation-background: transparent;
}
.sa {
  width: 140px;
  height: 140px;
  padding: 26px;
  margin: auto;
  /* Loading Icon */
  &-loading {
    border-radius: 50%;
    border: 4px solid rgba(90, 107, 227, 0.22);
    box-sizing: content-box;
    height: 80px;
    left: -4px;
    position: relative;
    top: -4px;
    width: 80px;
    z-index: 2;
    border-top: 4px solid #758be2;
    animation: animateLoadingSpin 0.75s infinite;
  }
  /* Error Icon */
  &-error {
    border-radius: 50%;
    border: 4px solid #f27474;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    width: 80px;
    animation: animateErrorIcon 0.5s;
    &:after,
    &:before {
      content: "";
      height: 120px;
      position: absolute;
      transform: rotate(45deg);
      width: 60px;
    }
    &:before {
      border-radius: 40px 0 0 40px;
      width: 26px;
      height: 80px;
      top: -17px;
      left: 5px;
      transform-origin: 60px 60px;
      transform: rotate(-45deg);
    }
    &:after {
      border-radius: 0 120px 120px 0;
      left: 30px;
      top: -11px;
      transform-origin: 0 60px;
      transform: rotate(-45deg);
      animation: rotatePlaceholder 4.25s ease-in;
    }
    &-x {
      display: block;
      position: relative;
      z-index: 2;
    }
    &-placeholder {
      border-radius: 50%;
      border: 4px solid rgba(200, 0, 0, 0.2);
      box-sizing: content-box;
      height: 80px;
      left: -4px;
      position: absolute;
      top: -4px;
      width: 80px;
      z-index: 2;
    }
    &-fix {
      height: 90px;
      left: 28px;
      position: absolute;
      top: 8px;
      transform: rotate(-45deg);
      width: 5px;
      z-index: 1;
    }
    &-left,
    &-right {
      border-radius: 2px;
      display: block;
      height: 5px;
      position: absolute;
      z-index: 2;
      background-color: #f27474;
      top: 37px;
      width: 47px;
    }
    &-left {
      left: 17px;
      transform: rotate(45deg);
      animation: animateXLeft 0.75s;
    }
    &-right {
      right: 16px;
      transform: rotate(-45deg);
      animation: animateXRight 0.75s;
    }
  }
  /* Warning Icon */
  &-warning {
    border-radius: 50%;
    border: 4px solid #f8bb86;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    width: 80px;
    animation: scaleWarning 0.75s infinite alternate;
    &:after,
    &:before {
      content: "";
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
    &:before {
      display: inline-block;
      opacity: 0;
      animation: pulseWarning 2s linear infinite;
    }
    &:after {
      display: block;
      z-index: 1;
    }
    &-body {
      background-color: #f8bb86;
      border-radius: 2px;
      height: 47px;
      left: 50%;
      margin-left: -2px;
      position: absolute;
      top: 10px;
      width: 5px;
      z-index: 2;
      animation: pulseWarningIns 0.75s infinite alternate;
    }
    &-dot {
      background-color: #f8bb86;
      border-radius: 50%;
      bottom: 10px;
      height: 7px;
      left: 50%;
      margin-left: -3px;
      position: absolute;
      width: 7px;
      z-index: 2;
      animation: pulseWarningIns 0.75s infinite alternate;
    }
  }
  /* Info Icon */
  &-info {
    border-radius: 50%;
    border: 4px solid #59bded;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    width: 80px;
    animation: scaleInfo 0.75s infinite alternate;
    &:after,
    &:before {
      content: "";
      border-radius: 50%;
      height: 100%;
      position: absolute;
      width: 100%;
    }
    &:before {
      display: inline-block;
      opacity: 0;
      animation: pulseInfo 2s linear infinite;
    }
    &:after {
      display: block;
      z-index: 1;
    }
    &-body {
      background-color: #59bded;
      border-radius: 2px;
      height: 47px;
      left: 50%;
      margin-left: -2px;
      position: absolute;
      top: 10px;
      width: 5px;
      z-index: 2;
      animation: pulseInfoIns 0.75s infinite alternate;
    }
    &-dot {
      background-color: #59bded;
      border-radius: 50%;
      bottom: 10px;
      height: 7px;
      left: 50%;
      margin-left: -3px;
      position: absolute;
      width: 7px;
      z-index: 2;
      animation: pulseInfoIns 0.75s infinite alternate;
    }
  }
  /* Success Icon */
  &-success {
    border-radius: 50%;
    border: 4px solid #a5dc86;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    width: 80px;
    background-color: var(--sweetalert-icons-animation-background);
    &:after,
    &:before {
      background-color: var(--sweetalert-icons-animation-background);
      content: "";
      height: 120px;
      position: absolute;
      transform: rotate(45deg);
      width: 60px;
    }
    &:before {
      border-radius: 40px 0 0 40px;
      width: 26px;
      height: 80px;
      top: -17px;
      left: 5px;
      transform-origin: 60px 60px;
      transform: rotate(-45deg);
    }
    &:after {
      border-radius: 0 120px 120px 0;
      left: 30px;
      top: -11px;
      transform-origin: 0 60px;
      transform: rotate(-45deg);
      animation: rotatePlaceholder 4.25s ease-in;
    }
    &-placeholder {
      border-radius: 50%;
      border: 4px solid rgba(165, 220, 134, 0.25);
      box-sizing: content-box;
      height: 80px;
      left: -4px;
      position: absolute;
      top: -4px;
      width: 80px;
      z-index: 2;
    }
    &-fix {
      background-color: var(--sweetalert-icons-animation-background);
      height: 90px;
      left: 28px;
      position: absolute;
      top: 8px;
      transform: rotate(-45deg);
      width: 5px;
      z-index: 1;
    }
    &-tip,
    &-long {
      background-color: #a5dc86;
      border-radius: 2px;
      height: 5px;
      position: absolute;
      z-index: 2;
    }
    &-tip {
      left: 14px;
      top: 46px;
      transform: rotate(45deg);
      width: 25px;
      animation: animateSuccessTip 0.75s;
    }
    &-long {
      right: 8px;
      top: 38px;
      transform: rotate(-45deg);
      width: 47px;
      animation: animateSuccessLong 0.75s;
    }
  }
}
/* Success keyframes */
@keyframes animateSuccessTip {
  0%,
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes animateSuccessLong {
  0%,
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
@keyframes rotatePlaceholder {
  0%,
  5% {
    transform: rotate(-45deg);
  }
  100%,
  12% {
    transform: rotate(-405deg);
  }
}
/* Warning keyframes */
@keyframes scaleWarning {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulseWarning {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  30% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    background-color: #f8bb86;
    transform: scale(2);
    opacity: 0;
  }
}
@keyframes pulseWarningIns {
  0% {
    background-color: #f8d486;
  }
  100% {
    background-color: #f8bb86;
  }
}
/* Info keyframes */
@keyframes scaleInfo {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulseInfo {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  30% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    background-color: #59bded;
    transform: scale(2);
    opacity: 0;
  }
}
@keyframes pulseInfoIns {
  0% {
    background-color: #59bded;
  }
  100% {
    background-color: #59bded;
  }
}
/* Error icon keyframes */
@keyframes animateErrorIcon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
@keyframes animateXLeft {
  0%,
  65% {
    left: 82px;
    top: 95px;
    width: 0;
  }
  84% {
    left: 14px;
    top: 33px;
    width: 47px;
  }
  100% {
    left: 17px;
    top: 37px;
    width: 47px;
  }
}
@keyframes animateXRight {
  0%,
  65% {
    right: 82px;
    top: 95px;
    width: 0;
  }
  84% {
    right: 14px;
    top: 33px;
    width: 47px;
  }
  100% {
    right: 16px;
    top: 37px;
    width: 47px;
  }
}
/* Loading keyframes */
@keyframes animateLoadingSpin {
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
</style>
