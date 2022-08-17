<template>
  <div>
    <h3 class="text-center">
      Reset Password.
    </h3>
    <p class="text-center q-mb-md">
      Please set your new password below.
    </p>
    <q-form>
      <div class="col q-mb-lg">
        <q-input
          label="Password"
          v-model="password"
          :type="isPwd1 ? 'password' : 'text'"
          color="blue-grey-14"
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

      <div class="col q-mb-lg">
        <q-input
          label="Password Confirm"
          v-model="passwordConfirm"
          :type="isPwd2 ? 'password' : 'text'"
          color="blue-grey-14"
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
      password: '',
      passwordConfirm: '',
      isPwd1: true,
      isPwd2: true
    }
  }
}
</script>

<style lang="sass">
h3
  font-size: 1.7rem
</style>
