<template>
  <q-page class="row flex-center items-center vertical-middle" padding>
    <div class="signup-container q-pa-xl">
      <div class="text-h6">Sign Up</div>
      <q-form @submit="onSubmit">
        <div class="row q-pt-lg q-col-gutter-md">
          <div class="col-sm-8 co-xs-12">
            <div class="row q-col-gutter-sm">
              <div class="col-sm-12 col-xs-12">
                <div class="text-label">What are you plan in?</div>
                <q-option-group
                  dense
                  v-model="form.plan"
                  type="radio"
                  inline
                  :options="plans"
                  class="q-mb-md"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">First Name</div>
                <q-input
                  :error-message="$core.errorMessage('first_name', errors)"
                  :error="$core.hasError('first_name', errors)"
                  dense
                  outlined
                  v-model="form.first_name"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Surname</div>
                <q-input
                  :error-message="$core.errorMessage('surname', errors)"
                  :error="$core.hasError('surname', errors)"
                  dense
                  outlined
                  v-model="form.surname"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Email</div>
                <q-input
                  :error-message="$core.errorMessage('email', errors)"
                  :error="$core.hasError('email', errors)"
                  dense
                  outlined
                  v-model="form.email"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Phone Number</div>
                <q-input
                  :error-message="$core.errorMessage('phone_number', errors)"
                  :error="$core.hasError('phone_number', errors)"
                  dense
                  outlined
                  v-model="form.phone_number"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Address Line 1</div>
                <q-input
                  :error-message="$core.errorMessage('line1', errors)"
                  :error="$core.hasError('line1', errors)"
                  dense
                  outlined
                  v-model="form.line1"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Address Line 2</div>
                <q-input
                  :error-message="$core.errorMessage('line2', errors)"
                  :error="$core.hasError('line2', errors)"
                  dense
                  outlined
                  v-model="form.line2"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">City</div>
                <q-input
                  :error-message="$core.errorMessage('city', errors)"
                  :error="$core.hasError('city', errors)"
                  dense
                  outlined
                  v-model="form.city"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Postcode/Zip</div>
                <q-input
                  :error-message="$core.errorMessage('postal_code', errors)"
                  :error="$core.hasError('postal_code', errors)"
                  dense
                  outlined
                  v-model="form.postal_code"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Country</div>
                <q-input
                  :error-message="$core.errorMessage('country', errors)"
                  :error="$core.hasError('country', errors)"
                  dense
                  outlined
                  v-model="form.country"
                  type="text"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Password</div>
                <q-input
                  dense
                  outlined
                  v-model="form.password"
                  :error-message="$core.errorMessage('password', errors)"
                  :error="$core.hasError('password', errors)"
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
              <div class="col-sm-6 col-xs-12">
                <div class="text-label">Confirm Password</div>
                <q-input
                  dense
                  outlined
                  v-model="form.password_confirmation"
                  :error-message="$core.errorMessage('password_confirmation', errors)"
                  :error="$core.hasError('password_confirmation', errors)"
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
            </div>
          </div>
          <div class="col-sm-4 co-xs-12">
            <div class="plan q-pa-lg">
              <div class="text-h6">Your plan</div>
              <div class="info">
                {{ plan.label }} Plan<br />{{ $core.money(plan.price) }} per month
              </div>
              <div class="features">
                <ul>
                  <li v-for="(feature, index) in plan.features" :key="index">{{ feature }}</li>
                </ul>
              </div>
            </div>
            <div class="q-my-lg terms">
              <q-checkbox dense size="sm" v-model="form.terms">
                I have read and agree to the
                <base-btn :to="{ name: 'Privacy policy' }" size="11px" type="a" link>
                  privacy policy
                </base-btn>
                and
                <base-btn :to="{ name: 'Terms and conditions' }" size="11px" type="a" link>
                  terms and conditions
                </base-btn>
              </q-checkbox>
            </div>
            <div class="submit-btn text-center">
              <base-btn
                :disabled="!form.terms"
                :loading="visible"
                style="width: 100px"
                label="Sign up"
                type="submit"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAppStore } from 'stores/app';
const guard = 'users';

export default {
  data() {
    return {
      form: {
        plan: 'investing',
        terms: false,
        guard,
      },
      errors: {},
      visible: false,
      isPwd1: true,
      isPwd2: true,
    };
  },
  methods: {
    ...mapActions(useAppStore, ['signUp']),
    onSubmit() {
      console.func('pages/SignUpPage:methods.onSubmit()', arguments);
      this.onReset();
      this.signUp(this.form)
        .then((response) => {
          this.$router.push({ name: 'Dashboard' });
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
  computed: {
    plan() {
      return this.plans.find((item) => item.value === this.form.plan);
    },
    plans() {
      return this.defaultPlans.map((item) => ({
        ...item,
        label: item.name,
        value: item.key,
      }));
    },
    ...mapState(useAppStore, ['defaultPlans']),
  },
};
</script>
