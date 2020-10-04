<template>
  <div>
    <h3 class="text-center">
      Welcome.
    </h3>
    <p class="text-center q-mb-md">
      Sign in by entering your email address and password below
    </p>
    <q-form
      ref="loginForm"
      @submit="onLogin"
    >
      <div class="col">
        <q-input
          v-model="form.email"
          ref="email"
          bottom-slots
          :error-message="'email' in errors ? errors.email.join(', ') : ''"
          :error="'email' in errors"
          label="Email Address"
          autofocus=""
          color="blue-grey-14"
        />
      </div>

      <div class="col">
        <q-input
          label="Password"
          bottom-slots
          :error-message="'password' in errors ? errors.password.join(', ') : ''"
          :error="'password' in errors"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          color="blue-grey-14"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col row q-mb-lg q-mt-sm">
        <div class="col">
          <q-checkbox dense v-model="form.remember" label="Remember me" />
        </div>
        <div class="col text-right">
          <q-btn
            flat
            dense
            size="sm"
            label="Forgot Password?"
            to="/login/forgot-password"
            align="right"
          />
        </div>
      </div>

      <q-btn
        size="md"
        label="Login"
        class="full-width q-pa-sm"
        color="gm-pink"
        align="center"
        type="submit"
      />
      <q-inner-loading :showing="visible">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      isPwd: true,
      errors: {},
      visible: false
    }
  },
  methods: {
    ...mapActions('app', ['Login']),
    onLogin () {
      this.errors = {}
      this.visible = true
      console.func('pages/login/LoginIndex:methods.login()', arguments)
      this.Login(this.form).then(response => {
        this.$router.push({ name: 'Dashboard' })
        this.visible = false
      }).catch(error => {
        this.visible = false
        this.errors = error.errors
      })
    },
    pwdChanged () {
      console.func('pages/login/SelectPassword:methods.pwdChanged()', arguments)
      this.password = this.$refs.pwd.$refs.input.value
    }
  }
}
</script>

<style lang="sass">
h3
  font-size: 1.7rem
</style>
