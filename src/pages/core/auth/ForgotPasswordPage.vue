<template>
  <div>
    <div class="text-h6 text-center q-mb">Forgot Password.</div>
    <p class="text-center q-mb-lg">
      Forgot your password? Not to worry!<br />Simply enter your email address below and our system
      will send you a password reset email.
    </p>
    <q-form ref="forgetPasswordForm" @submit="onSubmit">
      <div class="col q-mb-lg">
        <div class="text-label">Email</div>
        <q-input
          outlined
          dense
          v-model="form.email"
          ref="email"
          bottom-slots
          :error-message="'email' in errors ? errors.email.join(', ') : ''"
          :error="'email' in errors"
          autofocus=""
        />
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
        email: '',
        guard: this.$route.meta.guard,
      },
      errors: {},
      visible: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ['forgotPassword']),
    onSubmit() {
      console.func('pages/auth/ForgotPasswordPage:methods.onSubmit()', arguments);
      this.onReset();
      this.forgotPassword(this.form)
        .then((response) => {
          this.visible = false;
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
};
</script>

<style lang="sass">
h3
  font-size: 1.7rem
</style>
