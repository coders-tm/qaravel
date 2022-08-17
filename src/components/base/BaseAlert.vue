<template>
  <q-dialog
    persistent
    transition-show="jump-up"
    transition-hide="jump-down"
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-item-section v-if="icon" class="text-center">
        <div class="swal2">
          <div v-if="isIcon('error')" class="swal2-icon swal2-error swal2-icon-show">
            <span class="swal2-x-mark">
              <span class="swal2-x-mark-line-left"></span>
              <span class="swal2-x-mark-line-right"></span>
            </span>
          </div>

          <div v-else-if="isIcon('warning')" class="swal2-icon swal2-warning swal2-icon-show">
            <div class="swal2-icon-content">!</div>
          </div>

          <div v-else-if="isIcon('info')" class="swal2-icon swal2-info swal2-icon-show">
            <div class="swal2-icon-content">i</div>
          </div>
          <template v-else-if="isIcon('loading')">
            <q-spinner-oval class="swal2-icon swal2-loading" color="primary" size="5em" />
          </template>

          <div v-else-if="isIcon('success')" class="swal2-icon swal2-success swal2-icon-show">
            <div
              class="swal2-success-circular-line-left"
              style="background-color: rgb(255, 255, 255)"
            ></div>
            <span class="swal2-success-line-tip"></span>
            <span class="swal2-success-line-long"></span>
            <div class="swal2-success-ring"></div>
            <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255)"></div>
            <div
              class="swal2-success-circular-line-right"
              style="background-color: rgb(255, 255, 255)"
            ></div>
          </div>

          <div v-else-if="isIcon('question')" class="swal2-icon swal2-question swal2-icon-show">
            <div class="swal2-icon-content">?</div>
          </div>
        </div>
      </q-item-section>
      <q-card-section v-if="title" class="text-center">
        <div class="text-h6" v-if="title">
          {{ title }}
        </div>
        <div class="text-grey-9 text-weight-medium" v-if="subTitle">
          {{ subTitle }}
        </div>
        <template v-if="typeof msg === 'string'">
          <div class="text-grey-9 text-weight-medium">{{ msg }}</div></template
        >
        <template v-else-if="msg.length === 1 && typeof msg[0] === 'string'">
          <div class="text-grey-9 text-weight-medium">{{ msg[0] }}</div>
        </template>
      </q-card-section>
      <q-card-section>
        <template v-if="msg.length && typeof msg[0] !== `string`">
          <q-list bordered separator>
            <q-item v-for="(m, idx) in msg" :key="idx">
              <q-item-section avatar>
                <q-icon v-if="m.icon" :color="m.color ? m.color : ''" :name="'fal fa-' + m.icon" />
              </q-item-section>
              <q-item-section>{{ m.text }}</q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="center" class="q-pa-lg">
        <q-btn
          v-if="cancel"
          outline
          no-caps
          padding="6px 18px"
          :color="cancel.color"
          :label="cancel.label"
          @click="onCancelClick"
        />
        <q-btn no-caps padding="6px 18px" :color="ok.color" :label="ok.label" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const availableIcons = ['success', 'warning', 'error', 'info', 'loading', 'question', 'none'];
export default {
  props: {
    icon: {
      type: String,
      default: 'none',
      validator: (value) => {
        return availableIcons.indexOf(value) !== -1;
      },
    },
    msg: {},
    title: { type: [String, Boolean], default: '' },
    subTitle: { type: [String, Boolean], default: '' },
    ok: {
      type: Object,
      default: () => {
        return { label: 'Ok' };
      },
    },
    cancel: { type: Object },
  },
  emits: [
    // REQUIRED
    'ok',
    'hide',
    'cancel',
  ],
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      console.func('components/BaseAlert:methods.show()', arguments);
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      console.func('components/BaseAlert:methods.hide()', arguments);
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      console.func('components/BaseAlert:methods.onDialogHide()', arguments);
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },

    onOKClick() {
      console.func('components/BaseAlert:methods.onOKClick()', arguments);
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok');
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      console.func('components/BaseAlert:methods.onCancelClick()', arguments);
      this.$emit('cancel');
      // we just need to hide dialog
      this.hide();
    },

    isIcon(icon) {
      console.func('components/BaseAlert:methods.isIcon()', arguments);
      return icon === this.icon;
    },
  },
};
</script>
<style scoped lang="scss">
/**
* Credits
* @link https://sweetalert2.github.io/
*/
.swal2 {
  width: 140px;
  height: 140px;
  padding: 26px;
  margin: auto;
}

.swal2-icon {
  position: relative;
  box-sizing: content-box;
  justify-content: center;
  width: 5em;
  height: 5em;
  margin: 2.5em auto 0.6em;
  border: 0.25em solid transparent;
  border-radius: 50%;
  border-color: #000;
  font-family: inherit;
  line-height: 5em;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;

  .swal2-icon-content {
    display: flex;
    align-items: center;
    font-size: 3.75em;
  }

  &.swal2-error {
    border-color: #f27474;
    color: #f27474;

    .swal2-x-mark {
      position: relative;
      flex-grow: 1;
    }

    [class^='swal2-x-mark-line'] {
      display: block;
      position: absolute;
      top: 2.3125em;
      width: 2.9375em;
      height: 0.3125em;
      border-radius: 0.125em;
      background-color: #f27474;

      &[class$='left'] {
        left: 1.0625em;
        transform: rotate(45deg);
      }

      &[class$='right'] {
        right: 1em;
        transform: rotate(-45deg);
      }
    }

    &.swal2-icon-show {
      -webkit-animation: swal2-animate-error-icon 0.5s;
      animation: swal2-animate-error-icon 0.5s;

      .swal2-x-mark {
        -webkit-animation: swal2-animate-error-x-mark 0.5s;
        animation: swal2-animate-error-x-mark 0.5s;
      }
    }
  }

  &.swal2-warning {
    border-color: #facea8;
    color: #f8bb86;

    &.swal2-icon-show {
      -webkit-animation: swal2-animate-error-icon 0.5s;
      animation: swal2-animate-error-icon 0.5s;

      .swal2-icon-content {
        -webkit-animation: swal2-animate-i-mark 0.5s;
        animation: swal2-animate-i-mark 0.5s;
      }
    }
  }

  &.swal2-info {
    border-color: #9de0f6;
    color: #3fc3ee;

    &.swal2-icon-show {
      -webkit-animation: swal2-animate-error-icon 0.5s;
      animation: swal2-animate-error-icon 0.5s;

      .swal2-icon-content {
        -webkit-animation: swal2-animate-i-mark 0.8s;
        animation: swal2-animate-i-mark 0.8s;
      }
    }
  }

  &.swal2-question {
    border-color: #c9dae1;
    color: #87adbd;

    &.swal2-icon-show {
      -webkit-animation: swal2-animate-error-icon 0.5s;
      animation: swal2-animate-error-icon 0.5s;

      .swal2-icon-content {
        -webkit-animation: swal2-animate-question-mark 0.8s;
        animation: swal2-animate-question-mark 0.8s;
      }
    }
  }

  &.swal2-success {
    border-color: #a5dc86;
    color: #a5dc86;

    [class^='swal2-success-circular-line'] {
      position: absolute;
      width: 3.75em;
      height: 7.5em;
      transform: rotate(45deg);
      border-radius: 50%;

      &[class$='left'] {
        top: -0.4375em;
        left: -2.0635em;
        transform: rotate(-45deg);
        transform-origin: 3.75em 3.75em;
        border-radius: 7.5em 0 0 7.5em;
      }

      &[class$='right'] {
        top: -0.6875em;
        left: 1.875em;
        transform: rotate(-45deg);
        transform-origin: 0 3.75em;
        border-radius: 0 7.5em 7.5em 0;
      }
    }

    .swal2-success-ring {
      position: absolute;
      z-index: 2;
      top: -0.25em;
      left: -0.25em;
      box-sizing: content-box;
      width: 100%;
      height: 100%;
      border: 0.25em solid rgba(165, 220, 134, 0.3);
      border-radius: 50%;
    }

    .swal2-success-fix {
      position: absolute;
      z-index: 1;
      top: 0.5em;
      left: 1.625em;
      width: 0.4375em;
      height: 5.625em;
      transform: rotate(-45deg);
    }

    [class^='swal2-success-line'] {
      display: block;
      position: absolute;
      z-index: 2;
      height: 0.3125em;
      border-radius: 0.125em;
      background-color: #a5dc86;

      &[class$='tip'] {
        top: 2.875em;
        left: 0.8125em;
        width: 1.5625em;
        transform: rotate(45deg);
      }

      &[class$='long'] {
        top: 2.375em;
        right: 0.5em;
        width: 2.9375em;
        transform: rotate(-45deg);
      }
    }

    &.swal2-icon-show {
      .swal2-success-line-tip {
        -webkit-animation: swal2-animate-success-line-tip 0.75s;
        animation: swal2-animate-success-line-tip 0.75s;
      }

      .swal2-success-line-long {
        -webkit-animation: swal2-animate-success-line-long 0.75s;
        animation: swal2-animate-success-line-long 0.75s;
      }

      .swal2-success-circular-line-right {
        -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;
        animation: swal2-rotate-success-circular-line 4.25s ease-in;
      }
    }
  }

  &.swal2-loading {
    border-color: transparent;
  }
}

[class^='swal2'] {
  -webkit-tap-highlight-color: transparent;
}

@-webkit-keyframes swal2-toast-show {
  0% {
    transform: translateY(-0.625em) rotateZ(2deg);
  }

  33% {
    transform: translateY(0) rotateZ(-2deg);
  }

  66% {
    transform: translateY(0.3125em) rotateZ(2deg);
  }

  100% {
    transform: translateY(0) rotateZ(0);
  }
}

@keyframes swal2-toast-show {
  0% {
    transform: translateY(-0.625em) rotateZ(2deg);
  }

  33% {
    transform: translateY(0) rotateZ(-2deg);
  }

  66% {
    transform: translateY(0.3125em) rotateZ(2deg);
  }

  100% {
    transform: translateY(0) rotateZ(0);
  }
}

@-webkit-keyframes swal2-toast-hide {
  100% {
    transform: rotateZ(1deg);
    opacity: 0;
  }
}

@keyframes swal2-toast-hide {
  100% {
    transform: rotateZ(1deg);
    opacity: 0;
  }
}

@-webkit-keyframes swal2-toast-animate-success-line-tip {
  0% {
    top: 0.5625em;
    left: 0.0625em;
    width: 0;
  }

  54% {
    top: 0.125em;
    left: 0.125em;
    width: 0;
  }

  70% {
    top: 0.625em;
    left: -0.25em;
    width: 1.625em;
  }

  84% {
    top: 1.0625em;
    left: 0.75em;
    width: 0.5em;
  }

  100% {
    top: 1.125em;
    left: 0.1875em;
    width: 0.75em;
  }
}

@keyframes swal2-toast-animate-success-line-tip {
  0% {
    top: 0.5625em;
    left: 0.0625em;
    width: 0;
  }

  54% {
    top: 0.125em;
    left: 0.125em;
    width: 0;
  }

  70% {
    top: 0.625em;
    left: -0.25em;
    width: 1.625em;
  }

  84% {
    top: 1.0625em;
    left: 0.75em;
    width: 0.5em;
  }

  100% {
    top: 1.125em;
    left: 0.1875em;
    width: 0.75em;
  }
}

@-webkit-keyframes swal2-toast-animate-success-line-long {
  0% {
    top: 1.625em;
    right: 1.375em;
    width: 0;
  }

  65% {
    top: 1.25em;
    right: 0.9375em;
    width: 0;
  }

  84% {
    top: 0.9375em;
    right: 0;
    width: 1.125em;
  }

  100% {
    top: 0.9375em;
    right: 0.1875em;
    width: 1.375em;
  }
}

@keyframes swal2-toast-animate-success-line-long {
  0% {
    top: 1.625em;
    right: 1.375em;
    width: 0;
  }

  65% {
    top: 1.25em;
    right: 0.9375em;
    width: 0;
  }

  84% {
    top: 0.9375em;
    right: 0;
    width: 1.125em;
  }

  100% {
    top: 0.9375em;
    right: 0.1875em;
    width: 1.375em;
  }
}

@-webkit-keyframes swal2-show {
  0% {
    transform: scale(0.7);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes swal2-show {
  0% {
    transform: scale(0.7);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes swal2-hide {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}

@keyframes swal2-hide {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}

@-webkit-keyframes swal2-animate-success-line-tip {
  0% {
    top: 1.1875em;
    left: 0.0625em;
    width: 0;
  }

  54% {
    top: 1.0625em;
    left: 0.125em;
    width: 0;
  }

  70% {
    top: 2.1875em;
    left: -0.375em;
    width: 3.125em;
  }

  84% {
    top: 3em;
    left: 1.3125em;
    width: 1.0625em;
  }

  100% {
    top: 2.8125em;
    left: 0.8125em;
    width: 1.5625em;
  }
}

@keyframes swal2-animate-success-line-tip {
  0% {
    top: 1.1875em;
    left: 0.0625em;
    width: 0;
  }

  54% {
    top: 1.0625em;
    left: 0.125em;
    width: 0;
  }

  70% {
    top: 2.1875em;
    left: -0.375em;
    width: 3.125em;
  }

  84% {
    top: 3em;
    left: 1.3125em;
    width: 1.0625em;
  }

  100% {
    top: 2.8125em;
    left: 0.8125em;
    width: 1.5625em;
  }
}

@-webkit-keyframes swal2-animate-success-line-long {
  0% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  65% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  84% {
    top: 2.1875em;
    right: 0;
    width: 3.4375em;
  }

  100% {
    top: 2.375em;
    right: 0.5em;
    width: 2.9375em;
  }
}

@keyframes swal2-animate-success-line-long {
  0% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  65% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  84% {
    top: 2.1875em;
    right: 0;
    width: 3.4375em;
  }

  100% {
    top: 2.375em;
    right: 0.5em;
    width: 2.9375em;
  }
}

@-webkit-keyframes swal2-rotate-success-circular-line {
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

@keyframes swal2-rotate-success-circular-line {
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

@-webkit-keyframes swal2-animate-error-x-mark {
  0% {
    margin-top: 1.625em;
    transform: scale(0.4);
    opacity: 0;
  }

  50% {
    margin-top: 1.625em;
    transform: scale(0.4);
    opacity: 0;
  }

  80% {
    margin-top: -0.375em;
    transform: scale(1.15);
  }

  100% {
    margin-top: 0;
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes swal2-animate-error-x-mark {
  0% {
    margin-top: 1.625em;
    transform: scale(0.4);
    opacity: 0;
  }

  50% {
    margin-top: 1.625em;
    transform: scale(0.4);
    opacity: 0;
  }

  80% {
    margin-top: -0.375em;
    transform: scale(1.15);
  }

  100% {
    margin-top: 0;
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes swal2-animate-error-icon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

@keyframes swal2-animate-error-icon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes swal2-rotate-loading {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes swal2-rotate-loading {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes swal2-animate-question-mark {
  0% {
    transform: rotateY(-360deg);
  }

  100% {
    transform: rotateY(0);
  }
}

@keyframes swal2-animate-question-mark {
  0% {
    transform: rotateY(-360deg);
  }

  100% {
    transform: rotateY(0);
  }
}

@-webkit-keyframes swal2-animate-i-mark {
  0% {
    transform: rotateZ(45deg);
    opacity: 0;
  }

  25% {
    transform: rotateZ(-25deg);
    opacity: 0.4;
  }

  50% {
    transform: rotateZ(15deg);
    opacity: 0.8;
  }

  75% {
    transform: rotateZ(-5deg);
    opacity: 1;
  }

  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

@keyframes swal2-animate-i-mark {
  0% {
    transform: rotateZ(45deg);
    opacity: 0;
  }

  25% {
    transform: rotateZ(-25deg);
    opacity: 0.4;
  }

  50% {
    transform: rotateZ(15deg);
    opacity: 0.8;
  }

  75% {
    transform: rotateZ(-5deg);
    opacity: 1;
  }

  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}
</style>
