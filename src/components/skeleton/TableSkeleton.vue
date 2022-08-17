<template>
  <div>
    <div v-if="!hideTop" class="row q-col-gutter-md">
      <div class="col-xs-8">
        <q-skeleton height="39px" type="QBtn" width="250px" />
      </div>
      <div class="col-xs-4">
        <q-skeleton height="39px" width="150px" class="float-right" type="QBtn" />
      </div>
    </div>
    <q-markup-table square flat class="q-mt-lg">
      <thead>
        <tr>
          <th class="text-left" style="width: 150px">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in rowNumners" :key="n">
          <td class="text-left">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-icon name="fal fa-ellipsis-h" color="grey-4" class="q-mr-sm" size="sm" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  props: {
    rowNumners: {
      type: Number,
      default: 10,
      required: false,
    },
    hideTop: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
