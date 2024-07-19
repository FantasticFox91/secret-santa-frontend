<script setup>
import './events-list.scss';
const userStore = useUserStore();
const { pastEvents } = storeToRefs(userStore);
</script>

<template>
  <div class="events-list-burger">
    <h2 class="events-list-burger__heading">Past events</h2>
    <ul class="events-list-burger__list">
      <li v-for="event in pastEvents" :key="event.id">
        <a class="events-list-burger__item" :href="`/event/past/${event.id}`">
          <h3 class="events-list-burger__subheading">{{ event.name }}</h3>
          <p class="events-list-burger__date">{{ useDateFormat(event.date) }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
