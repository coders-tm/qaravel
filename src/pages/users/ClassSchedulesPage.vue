<template>
  <q-page padding>
    <base-section no-row>
      <user-class-schedules status="active" :module-id="user.id" />
    </base-section>
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
