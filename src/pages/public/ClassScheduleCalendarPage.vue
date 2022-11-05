<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title class="cursor-pointer" @click="onToday">
        Today ({{ $core.formatDate(new Date()) }})
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="fas fa-angle-left"
        @click="onPrev"
        class="q-mr-xs"
      />
      <q-btn flat round dense icon="fas fa-angle-right" @click="onNext" />
    </q-toolbar>
    <q-calendar-agenda
      ref="calendar"
      v-model="selectedDate"
      view="week"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      :day-min-height="200"
      bordered
      animated
      locale="en-UK"
      @change="onChange"
    >
      <template #head-day-event="{ scope: { timestamp } }">
        <div class="fit row justify-center">
          {{ timestamp.day }}/{{ timestamp.month }}/{{ timestamp.year }}
        </div>
      </template>
      <template v-slot:day="{ scope: { timestamp } }">
        <template
          v-for="event in getAgenda(timestamp)"
          :key="timestamp.date + event.time"
        >
          <div :label="event.time" class="q-pa-sm class-event">
            <div>
              <q-icon class="q-mr-xs" name="fas fa-book-sparkles" />
              {{ event.class.name }}
            </div>
            <div>
              <q-icon class="q-mr-xs" name="fas fa-clock" />
              {{ event.time }}
            </div>
            <div v-if="event.instructor">
              <q-icon class="q-mr-xs" name="fas fa-chalkboard-user" />
              {{ event.instructor }}
            </div>
            <div v-if="event.location">
              <q-icon class="q-mr-xs" name="fas fa-location-dot" />
              {{ event.location }}
            </div>
          </div>
        </template>
      </template>
    </q-calendar-agenda>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { groupBy } from "lodash";
import {
  QCalendarAgenda,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass";

import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useClassScheduleStore } from "src/stores/class-schedule";

const stringToHslColor = (str, s, l) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

const getDayIndex = (day) => {
  let index = day + 1;
  if (index > 6) {
    return 0;
  }
  return index;
};

export default defineComponent({
  name: "AgendaColumnOptions",
  components: {
    QCalendarAgenda,
  },
  data() {
    return {
      selectedDate: today(),
      agenda: {},
      loading: true,
    };
  },

  methods: {
    ...mapActions(useClassScheduleStore, ["get"]),
    getAgenda(day) {
      return this.agenda[parseInt(day.weekday, 10)];
    },
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onChange({ start }) {
      console.func(
        "pages/public/ClassScheduleCalendarPage:methods.onChange",
        arguments
      );
      this.loading = true;
      this.get({
        startOfWeek: start,
        hasClass: true,
      })
        .then(({ data }) => {
          const classes = data.map((item) => ({
            ...item,
            day_index: getDayIndex(item.day_index),
            class_name: item.class.name,
            location: item.location?.label,
            instructor: item.instructor?.name,
            date: item.date_at_formated,
            duration: item.duration,
            bgcolor: stringToHslColor(item.class.name, 30, 80),
          }));
          this.agenda = groupBy(classes, (item) => item.day_index);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error);
        });
    },
  },
});
</script>

<style lang="scss">
.class-event {
  // min-height: 102px;
  &:hover {
    background: $primary;
    color: white;
  }
}
.q-calendar-agenda__head--date {
  display: none;
}
</style>
