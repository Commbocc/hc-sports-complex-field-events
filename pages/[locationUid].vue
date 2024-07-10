<script setup lang="ts">
const { events, groupedEvents, fetchEvents } = useEvents();
const { thisWeek, formatIso } = useCalendar();
await fetchEvents();
</script>

<template>
  <h3 v-if="events.loading">Loading...</h3>

  <h3 v-else-if="!events.records.length">No events at this time</h3>

  <div v-else class="table-responsive pt-3">
    <table class="table table-sm table-bordered table-striped">
      <thead>
        <th scope="col" v-for="day in thisWeek">
          {{ formatIso(day) }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(events, field) of groupedEvents">
          <th scope="row">{{ field }}</th>
          <td v-for="day in thisWeek" :data-cell="formatIso(day)">
            {{ events.find((e) => e.date === day)?.name ?? "All Day Rented" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
thead th {
  display: none;
}

td {
  display: block;
}

td::before {
  content: attr(data-cell) ": ";
  font-weight: 700;
}
</style>
