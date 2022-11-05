<template>
  <div class="sign-up-page">
    <div class="text-h6 text-center q-mb-xl">Register your user account</div>
    <base-form no-action @submit="onSubmit">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12">
          <div class="text-label">
            Pro-FIT28 ID
            <q-icon name="fas fa-info-circle">
              <base-tooltip-widget>
                Starting with 28 after - e.g. 102715-281256
              </base-tooltip-widget>
            </q-icon>
          </div>
          <base-input
            :error-message="$core.errorMessage('profit_id', errors)"
            :error="$core.hasError('profit_id', errors)"
            placeholder="i.e 281256"
            v-model="form.profit_id"
          />
        </div>
        <div class="col-xs-12">
          <div class="text-label">Email</div>
          <base-input
            :error-message="$core.errorMessage('email', errors)"
            :error="$core.hasError('email', errors)"
            v-model="form.email"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="text-label">First Name</div>
          <base-input
            :error-message="$core.errorMessage('first_name', errors)"
            :error="$core.hasError('first_name', errors)"
            v-model="form.first_name"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="text-label">Surname</div>
          <base-input
            :error-message="$core.errorMessage('last_name', errors)"
            :error="$core.hasError('last_name', errors)"
            v-model="form.last_name"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="text-label">Password</div>
          <base-input
            v-model="form.password"
            :error-message="
              'password' in errors ? errors.password.join(', ') : ''
            "
            :error="'password' in errors"
            :type="isPwd1 ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
              />
            </template>
          </base-input>
        </div>

        <div class="col-xs-12 col-sm-6">
          <div class="text-label">Password Confirm</div>
          <base-input
            v-model="form.password_confirmation"
            :error-message="
              'password_confirmation' in errors
                ? errors.password_confirmation.join(', ')
                : ''
            "
            :error="'password_confirmation' in errors"
            :type="isPwd2 ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </base-input>
        </div>

        <div class="col-xs-12">
          <q-btn
            :loading="visible"
            no-caps
            label="Sign up"
            class="full-width"
            color="primary"
            align="center"
            type="submit"
          />
          <div class="q-mt-md text-center">
            Already have an account?
            <base-btn :to="{ name: 'Login' }" link type="a" label="Login" />
          </div>
        </div>
      </div>
    </base-form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "stores/app";
const guard = "users";

export default {
  data() {
    return {
      form: {
        guard,
      },
      errors: {},
      visible: false,
      isPwd1: true,
      isPwd2: true,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["signUp"]),
    onSubmit() {
      console.func("pages/SignUpPage:methods.onSubmit()", arguments);
      this.onReset();
      this.signUp(this.form)
        .then((response) => {
          this.$router.push({ name: "Dashboard" });
          this.visible = false;
        })
        .catch(({ errors, message }) => {
          this.visible = false;
          if (errors) {
            this.errors = errors;
          } else {
            this.$core.error(message);
          }
        });
    },
    onReset() {
      this.errors = {};
      this.visible = true;
    },
  },
};
</script>
