<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="text-h5">Latest properties based on your tags</div>
        <div class="recent-listings">
          <property-listings only-tagged enquery :options="propertiesOptions" />
        </div>
      </div>
      <div class="col-12">
        <div class="text-h5">Your recent listings</div>
        <div class="recent-listings">
          <property-listings
            no-items-label="No recent property listings found!"
            only-owner
            :options="propertyListingsOptions"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PropertyListings from 'components/PropertyListings.vue';
export default {
  components: { PropertyListings },
  data() {
    return {
      propertiesOptions: {
        currentPage: 1,
        lastPage: 12,
        rowsPerPage: 4,
        sortBy: 'CREATED_AT_DESC',
        displayMode: 'grid',
      },
      propertyListingsOptions: {
        currentPage: 1,
        lastPage: 12,
        rowsPerPage: 4,
        sortBy: 'CREATED_AT_DESC',
        displayMode: 'grid',
      },
    };
  },
};
</script>
