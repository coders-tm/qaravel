<template>
  <div>
    <h3 class="text-center">
      Forgot Password.
    </h3>
    <p class="text-center q-mb-md">
      Forgot your password? Not to worry!<br>Simply enter your email address below and our system will send you a password reset email.
    </p>
    <q-form>
      <div class="col q-mb-lg">
        <q-input
          v-model="email"
          label="Email Address"
          autofocus=""
          color="blue-grey-14"
        />
      </div>

      <q-btn
        size="md"
        label="Submit"
        class="full-width q-pa-sm"
        color="gm-pink"
        align="center"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: ''
    }
  }
}
</script>

<style lang="sass">
h3
  font-size: 1.7rem
</style>
