<template>
  <q-page padding>
    <base-section class="modules">
      <div class="col-xs-6 col-sm-3">
        <base-btn
          class="full-width"
          icon="fad fa-plus-circle"
          label="Add"
          to="members/add"
          stack
          outline
          padding="20px 10px"
          size="md"
        />
      </div>
      <div class="col-xs-6 col-sm-3">
        <base-btn
          class="full-width"
          icon="fad fa-calendar-circle-user"
          label="Registrations"
          to="registrations"
          stack
          outline
          padding="20px 10px"
          size="md"
        />
      </div>
      <div v-for="item in modules" :key="item.id" class="col-xs-6 col-sm-3">
        <base-btn
          class="full-width"
          :icon="item.icon.replace('fas', 'fad')"
          :label="item.name"
          :to="item.url"
          stack
          outline
          padding="20px 10px"
          size="md"
        />
      </div>
    </base-section>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "src/stores/app";
export default {
  computed: {
    ...mapState(useAppStore, ["modules"]),
  },
};
</script>

<style lang="scss">
.modules {
  .q-icon {
    font-size: 35px;
    margin-bottom: 5px;
  }
}
</style>
