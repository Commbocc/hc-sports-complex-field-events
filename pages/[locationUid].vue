<script setup lang="ts">
import { DateTime } from "luxon";

const { events, groupedEvents, fetchEvents } = useEvents();
const { thisWeek, formatIso } = useCalendar();
await fetchEvents();

const today = DateTime.local().toISODate() ?? "";
const selectedDay = ref(thisWeek.includes(today) ? today : thisWeek[0]);
</script>

<template>
  <h3 v-if="events.loading">Loading...</h3>

  <h3 v-else-if="!events.records.length">No events at this time</h3>

  <div v-else>
    <ul class="nav nav-pills flex-nowrap overflow-auto gap-1 pb-3">
      <li v-for="day in thisWeek" :key="day" class="nav-item">
        <button
          type="button"
          class="nav-link text-nowrap"
          :class="{ active: selectedDay === day }"
          @click="selectedDay = day"
        >
          {{ formatIso(day, "ccc d") }}
        </button>
      </li>
    </ul>

    <div
      v-for="(fieldEvents, field) in groupedEvents"
      :key="field"
      class="mb-3"
    >
      <h5 class="fw-bold mb-2">{{ field }}</h5>
      <table class="table table-sm table-striped table-bordered mb-0">
        <tr
          v-for="slot in (
            fieldEvents.find((e) => e.date === selectedDay)?.name ??
            'Field Schedule Pending'
          ).split(';')"
          :key="slot"
        >
          <td class="text-nowrap text-secondary" style="width: 10rem">
            {{ slot.match(/.*[AP]M/i)?.[0] }}
          </td>
          <td>{{ slot.replace(/^.*[AP]M\s+/i, "") }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
