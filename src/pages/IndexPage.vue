<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12">
        <base-section no-row title="Active Bookings">
          <user-class-schedules hide-top status="active" :module-id="user.id" />
        </base-section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "stores/app";
import UserClassSchedules from "components/UserClassSchedules.vue";
export default {
  components: { UserClassSchedules },
  computed: {
    ...mapState(useAppStore, ["user"]),
  },
};
</script>
