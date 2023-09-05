<script setup lang="ts">
const { events, groupedEvents, fetchEvents } = useEvents()
const { thisWeek, formatIso } = useCalendar()
await fetchEvents()
</script>

<template>
  <h1 v-if="events.loading">Loading...</h1>

  <div v-else class="table-responsive">
    <table class="table table-sm table-bordered table-striped">
      <thead>
        <th scope="col"></th>
        <th scope="col" v-for="day in thisWeek">
          {{ formatIso(day) }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(events, field) of groupedEvents">
          <th scope="row">{{ field }}</th>
          <td v-for="day in thisWeek" :data-cell="formatIso(day)">
            {{ events.find((e) => e.date === day)?.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (max-width: 725px) {
  thead th {
    display: none;
  }

  td {
    display: block;
  }

  td::before {
    content: attr(data-cell) ': ';
    font-weight: 700;
  }
}
</style>
