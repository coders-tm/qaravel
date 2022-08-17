<template>
  <div>
    <div class="text-h6 text-center">Reset Password.</div>
    <p class="text-center q-mb-lg">Please set your new password below.</p>
    <q-form ref="restPasswordForm" @submit="onSubmit">
      <div class="col">
        <q-input
          outlined
          dense
          placeholder="Password"
          v-model="form.password"
          :error-message="'password' in errors ? errors.password.join(', ') : ''"
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
        </q-input>
      </div>

      <div class="col q-mb-md">
        <q-input
          outlined
          dense
          placeholder="Password Confirm"
          v-model="form.password_confirmation"
          :error-message="
            'password_confirmation' in errors ? errors.password_confirmation.join(', ') : ''
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
        </q-input>
      </div>

      <q-btn
        :loading="visible"
        no-caps
        label="Submit"
        class="full-width"
        color="primary"
        align="center"
        type="submit"
      />
      <q-btn
        no-caps
        label="Go Back"
        class="q-mt-sm full-width"
        color="negative"
        align="center"
        flat
        :to="{ name: 'Login' }"
      />
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAppStore } from 'stores/app';

export default {
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
        guard: this.$route.meta.guard,
      },
      errors: {},
      visible: false,
      isPwd1: true,
      isPwd2: true,
    };
  },
  methods: {
    ...mapActions(useAppStore, ['resetPassword']),
    onSubmit() {
      console.func('pages/auth/ResetPasswordPage:methods.onSubmit()', arguments);
      this.onReset();
      this.resetPassword(this.form)
        .then((response) => {
          this.visible = false;
          this.$router.push({ name: 'Login' });
          this.$core.success(response.message);
        })
        .catch((error) => {
          this.visible = false;
          if (error.errors) {
            this.errors = error.errors;
          } else {
            this.$core.error(error.message);
          }
        });
    },
    onReset() {
      this.errors = {};
      this.visible = true;
    },
  },
  created() {
    this.form.token = this.$route.query.token;
    this.form.email = this.$route.query.email;
  },
};
</script>
