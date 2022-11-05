<template>
  <div>
    <div v-if="!hideTop" class="row q-col-gutter-md">
      <div class="col-sm-8 col-xs-12">
        <q-skeleton
          height="39px"
          type="QBtn"
          :width="$q.screen.gt.sm ? '250px' : '100%'"
        />
      </div>
      <div class="gt-xs col-sm-4 col-xs-12">
        <q-skeleton
          height="39px"
          width="150px"
          class="float-right"
          type="QBtn"
        />
      </div>
    </div>
    <q-markup-table square flat class="q-mt-lg">
      <thead v-if="$q.screen.gt.sm">
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
          <template v-if="$q.screen.lt.md">
            <td>
              <q-skeleton animation="blink" type="text" width="80%" />
              <q-skeleton animation="blink" type="text" width="100%" />
              <q-skeleton animation="blink" type="text" width="60%" />
            </td>
            <td class="text-right">
              <q-icon
                name="fal fa-ellipsis-h"
                color="grey-4"
                class="q-mr-sm"
                size="sm"
              />
            </td>
          </template>
          <template v-else>
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
              <q-icon
                name="fal fa-ellipsis-h"
                color="grey-4"
                class="q-mr-sm"
                size="sm"
              />
            </td>
          </template>
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
