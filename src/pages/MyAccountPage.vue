<template>

    <div>

        <div class="q-gutter-y-lg">

            <q-card>

                <q-card-section>

                    <div class="text-h6">Profile Information</div>

                    <q-form @submit="onSaveProfile">

                        <div
                            class="row q-pt-lg q-col-gutter-y-sm q-col-gutter-x-xl"
                        >

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">First Name</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('first_name', errors)
                                    "
                                    :error="
                                        $core.hasError('first_name', errors)
                                    "
                                    dense
                                    outlined
                                    v-model="user.first_name"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Surname</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('surname', errors)
                                    "
                                    :error="$core.hasError('surname', errors)"
                                    dense
                                    outlined
                                    v-model="user.surname"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Email</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('email', errors)
                                    "
                                    :error="$core.hasError('email', errors)"
                                    dense
                                    outlined
                                    v-model="user.email"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Phone Number</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage(
                                            'phone_number',
                                            errors
                                        )
                                    "
                                    :error="
                                        $core.hasError('phone_number', errors)
                                    "
                                    dense
                                    outlined
                                    v-model="user.phone_number"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Address Line 1</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('line1', errors)
                                    "
                                    :error="$core.hasError('line1', errors)"
                                    dense
                                    outlined
                                    v-model="user.address.line1"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Address Line 2</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('line2', errors)
                                    "
                                    :error="$core.hasError('line2', errors)"
                                    dense
                                    outlined
                                    v-model="user.address.line2"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">City</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('city', errors)
                                    "
                                    :error="$core.hasError('city', errors)"
                                    dense
                                    outlined
                                    v-model="user.address.city"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Postcode/Zip</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage(
                                            'postal_code',
                                            errors
                                        )
                                    "
                                    :error="
                                        $core.hasError('postal_code', errors)
                                    "
                                    dense
                                    outlined
                                    v-model="user.address.postal_code"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Country</div>

                                <q-input
                                    :error-message="
                                        $core.errorMessage('country', errors)
                                    "
                                    :error="$core.hasError('country', errors)"
                                    dense
                                    outlined
                                    v-model="user.address.country"
                                    type="text"
                                />

                            </div>

                            <div class="col-sm-3 col-xs-12">

                                <div class="text-label">Password</div>

                                <q-input
                                    type="password"
                                    readonly
                                    bottom-slots
                                    dense
                                    outlined
                                    modelValue="**********"
                                >

                                    <template v-slot:hint>

                                        <base-btn
                                            size="11px"
                                            color="grey"
                                            :to="{ name: 'Forget Password' }"
                                            link
                                            type="a"
                                            label="Forgotten password?"
                                        />

                                    </template>

                                </q-input>

                            </div>

                            <div class="col-sm-6 col-xs-12 text-right self-end">

                                <base-btn
                                    class="main-btn"
                                    :loading="visible"
                                    style="width: 100px"
                                    label="Save"
                                    type="submit"
                                />

                            </div>

                        </div>

                    </q-form>

                </q-card-section>

            </q-card>

        </div>

    </div>

</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
const guard = "users";

export default {
    data() {
        return {
            visible: false,
            errors: {}
        };
    },
    methods: {
        ...mapActions(useAppStore, ["update", "currentUser"]),
        onSaveProfile() {
            console.func("pages/SignUpPage:methods.onSaveProfile()", arguments);
            this.visible = true;
            this.errors = {};
            this.update({
                ...this.user,
                guard: this.$route.meta.guard
            })
                .then(() => {
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
        }
    },
    computed: {
        ...mapState(useAppStore, ["user"])
    }
};
</script>

