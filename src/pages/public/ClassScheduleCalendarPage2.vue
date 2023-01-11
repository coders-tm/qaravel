<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />
    <q-calendar-day
      ref="calendar"
      v-model="selectedDate"
      view="week"
      animated
      bordered
      transition-next="slide-left"
      transition-prev="slide-right"
      no-active-date
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      :interval-start="6"
      :interval-count="18"
      @change="onChange"
    >
      <template
        v-slot:day-body="{
          scope: { timestamp, timeStartPos, timeDurationHeight },
        }"
      >
        <template v-for="event in getEvents(timestamp.date)" :key="event.id">
          <div
            v-if="event.time !== undefined"
            class="class-event"
            :class="badgeClasses(event, 'body')"
            :style="
              badgeStyles(event, 'body', timeStartPos, timeDurationHeight)
            "
          >
            <span class="title q-calendar__ellipsis">
              {{ event.title }}
              <base-tooltip class="class-info">
                <div>
                  <q-icon class="q-mr-xs" name="fas fa-book-sparkles" />
                  {{ event.class.name }}
                </div>
                <div>
                  <q-icon class="q-mr-xs" name="fas fa-clock" />
                  {{ event.time_length }}
                </div>
                <div v-if="event.instructor">
                  <q-icon class="q-mr-xs" name="fas fa-chalkboard-user" />
                  {{ event.instructor.name }}
                </div>
                <div v-if="event.location">
                  <q-icon class="q-mr-xs" name="fas fa-location-dot" />
                  {{ event.location.label }}
                </div>
              </base-tooltip>
            </span>
          </div>
        </template>
      </template>
    </q-calendar-day>
  </div>
</template>

<script>
import {
  QCalendarDay,
  addToDate,
  parseTimestamp,
  isBetweenDates,
  today,
  parsed,
  parseDate,
  parseTime,
} from "@quasar/quasar-ui-qcalendar/src/QCalendarDay.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";

import { defineComponent } from "vue";
import NavigationBar from "components/NavigationBar.vue";
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

export default defineComponent({
  name: "WeekSlotDayBody",
  components: {
    NavigationBar,
    QCalendarDay,
  },
  data() {
    return {
      selectedDate: today(),
      events: [],
    };
  },
  computed: {
    // convert the events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      // this.events.forEach(event => (map[ event.date ] = map[ event.date ] || []).push(event))
      this.events.forEach((event) => {
        if (!map[event.date]) {
          map[event.date] = [];
        }
        map[event.date].push(event);
        if (event.days) {
          let timestamp = parseTimestamp(event.date);
          let days = event.days;
          do {
            timestamp = addToDate(timestamp, { day: 1 });
            if (!map[timestamp.date]) {
              map[timestamp.date] = [];
            }
            map[timestamp.date].push(event);
          } while (--days > 0);
        }
      });
      return map;
    },
  },
  methods: {
    ...mapActions(useClassScheduleStore, ["get"]),
    badgeClasses(event, type) {
      const isHeader = type === "header";
      return {
        "text-white": true,
        "full-width": !isHeader && (!event.side || event.side === "full"),
        "left-side": !isHeader && event.side === "left",
        "right-side": !isHeader && event.side === "right",
        "rounded-border": true,
      };
    },
    badgeStyles(
      event,
      type,
      timeStartPos = undefined,
      timeDurationHeight = undefined
    ) {
      const s = {};
      if (timeStartPos && timeDurationHeight) {
        s.top = timeStartPos(event.time) + "px";
        s.height = timeDurationHeight(event.duration) + "px";
      }
      s["align-items"] = "flex-start";
      s["background"] = event.bgcolor;
      return s;
    },
    getEvents(dt) {
      // get all events for the specified date
      const events = this.eventsMap[dt] || [];

      if (events.length === 1) {
        events[0].side = "full";
      } else if (events.length === 2) {
        // this example does no more than 2 events per day
        // check if the two events overlap and if so, select
        // left or right side alignment to prevent overlap
        const startTime = addToDate(parsed(events[0].date), {
          minute: parseTime(events[0].time),
        });
        const endTime = addToDate(startTime, { minute: events[0].duration });
        const startTime2 = addToDate(parsed(events[1].date), {
          minute: parseTime(events[1].time),
        });
        const endTime2 = addToDate(startTime2, { minute: events[1].duration });
        if (
          isBetweenDates(startTime2, startTime, endTime, true) ||
          isBetweenDates(endTime2, startTime, endTime, true)
        ) {
          events[0].side = "left";
          events[1].side = "right";
        } else {
          events[0].side = "full";
          events[1].side = "full";
        }
      }

      return events;
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
        "src/pages/public/ClassScheduleCalendarPage:methods.onChange",
        arguments
      );
      this.get({
        startOfWeek: start,
        hasClass: true,
      })
        .then(({ data }) => {
          this.events = data.map((item) => ({
            ...item,
            title: item.class.name,
            time_length: item.time,
            time: item.start_at,
            date: item.date_at,
            duration: item.duration,
            bgcolor: stringToHslColor(item.class.name, 40, 60),
          }));
        })
        .catch((error) => {
          this.$core.error(error, { title: "Error" });
        });
    },
  },
});
</script>

<style lang="sass" scoped>
.class-event
  position: absolute
  font-size: 12px
  justify-content: center
  margin: 0 1px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
  &:hover
    z-index: 99999
    transform: scale(1.05)

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.rounded-border
  border-radius: 2px
</style>
