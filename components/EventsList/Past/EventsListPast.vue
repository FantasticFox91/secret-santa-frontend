<script setup>
import '../events-list.scss';

defineProps({
  items: Array,
})

</script>

<template>
  <ul class="events-list">
    <li v-for="event in items" :key="event.id" class="events-list__item">
      <EventsCardPast :data="event" />
    </li>
  </ul>
</template>
